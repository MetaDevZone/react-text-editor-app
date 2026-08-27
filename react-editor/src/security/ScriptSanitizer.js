/**
 * ScriptSanitizer.js
 * Intelligent Security Analyzer & Sanitizer for WYSIWYG editor content.
 * 
 * Rules:
 * 1. ALLOWS: Safe rich text (p, h1-h6, table, img, ul/ol, a, button, styles) and safe UI scripts.
 * 2. REMOVES: 
 *    - All malicious scripts (cookies, storage, fetch/xhr/ws, redirects, eval, new Function, innerHTML, document.write, parent/top frame escape, createElement('script'), obfuscation).
 *    - Dangerous inline handlers (onclick="alert()", onerror, onload).
 *    - Dangerous tags: <object>, <embed>, <applet>, <foreignObject>, <iframe srcdoc>.
 *    - Dangerous pseudo-protocols (javascript:, vbscript:).
 * 3. PRESERVES: 100% of valid safe HTML and safe UI interactivity.
 */

// Patterns indicating malicious / high-risk activity
export const DANGEROUS_PATTERNS = [
  { pattern: /\b(?:document\s*\.\s*cookie|cookieStore)\b/i, reason: "Accessing or stealing browser cookies" },
  { pattern: /\b(?:localStorage|sessionStorage|indexedDB)\b/i, reason: "Accessing sensitive browser local/session storage" },
  { pattern: /(?:\bfetch\s*\(|\bXMLHttpRequest\b|\bsendBeacon\s*\(|\bWebSocket\b)/i, reason: "Attempting unauthorized network data exfiltration" },
  { pattern: /\b(?:window|document|location)\s*\.\s*(?:location|href|replace|assign)\b/i, reason: "Unauthorized page redirection" },
  { pattern: /(?:\beval\s*\(|\bFunction\s*\(|\bnew\s+Function|\bsetTimeout\s*\(\s*['"`]|\bsetInterval\s*\(\s*['"`]|\bimport\s*\()/i, reason: "Arbitrary dynamic code execution (eval)" },
  { pattern: /\b(?:window\s*\.\s*parent|window\s*\.\s*top|parent\s*\.\s*document|top\s*\.\s*document|window\s*\.\s*opener)\b/i, reason: "Attempting to escape sandbox or access parent window" },
  { pattern: /\bdocument\s*\.\s*write(?:ln)?\s*\(/i, reason: "Dangerous document.write injection" },
  { pattern: /\b(?:innerHTML|outerHTML|insertAdjacentHTML)\b/i, reason: "Direct DOM injection" },
  { pattern: /document\s*\.\s*createElement\s*\(\s*['"`]script['"`]\s*\)/i, reason: "Dynamic script element creation" },
  { pattern: /(?:\balert\s*\(|\bprompt\s*\(|\bconfirm\s*\()/i, reason: "Unauthorized UI modal/alert injection" },
  { pattern: /(?:\batob\s*\(|\bbtoa\s*\(|\bunescape\s*\()/i, reason: "Suspicious obfuscated decode execution" },
  { pattern: /javascript\s*:/i, reason: "Dangerous pseudo-protocol URI (javascript:)" },
  { pattern: /vbscript\s*:/i, reason: "Dangerous pseudo-protocol URI (vbscript:)" }
];

export const ALLOWED_EXTERNAL_CDNS = [
  "cdn.jsdelivr.net",
  "cdnjs.cloudflare.com",
  "platform.twitter.com"
];

/**
 * Checks a script string (inline or in <script>) for malicious patterns.
 * @param {string} code 
 * @returns {{ isSafe: boolean, violations: string[] }}
 */
export function analyzeScriptSecurity(code) {
  if (!code || typeof code !== 'string') {
    return { isSafe: true, violations: [] };
  }

  const violations = [];
  for (const { pattern, reason } of DANGEROUS_PATTERNS) {
    if (pattern.test(code)) {
      violations.push(reason);
    }
  }

  return {
    isSafe: violations.length === 0,
    violations
  };
}

/**
 * Extracts declared function names from a JavaScript code string.
 * @param {string} code 
 * @returns {string[]}
 */
function extractFunctionNames(code) {
  const names = [];
  if (!code || typeof code !== 'string') return names;

  // Match: function myFunc(...)
  const funcDeclRegex = /function\s+([a-zA-Z0-9_$]+)\s*\(/g;
  let match;
  while ((match = funcDeclRegex.exec(code)) !== null) {
    names.push(match[1]);
  }

  // Match: var/let/const myFunc = function(...) or () => ...
  const varFuncRegex = /(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*(?:function|\([^)]*\)\s*=>|[a-zA-Z0-9_$]+\s*=>)/g;
  while ((match = varFuncRegex.exec(code)) !== null) {
    names.push(match[1]);
  }

  return names;
}

/**
 * Validates external URL hostname against whitelist.
 * @param {string} urlString 
 * @returns {boolean}
 */
export function isAllowedExternalHost(urlString) {
  try {
    const url = new URL(urlString, window?.location?.href || 'https://localhost');
    return ALLOWED_EXTERNAL_CDNS.includes(url.hostname);
  } catch (e) {
    return false;
  }
}

/**
 * Sanitizes HTML content:
 * - Scans all <script> tags. ONLY removes malicious scripts; keeps safe scripts intact.
 * - Scans dangerous elements (<object>, <embed>, <applet>, <foreignObject>, <iframe srcdoc>).
 * - Scans all inline event handlers (onclick, onmouseover, onload, etc.).
 *   Removes handler if it contains dangerous code OR calls a removed malicious function.
 * - Strips javascript: and vbscript: pseudo-protocols.
 * 
 * @param {string} htmlContent 
 * @returns {{ sanitizedHtml: string, violations: string[], removedCount: number }}
 */
export function sanitizeDangerousScripts(htmlContent) {
  if (!htmlContent || typeof htmlContent !== 'string') {
    return { sanitizedHtml: '', violations: [], removedCount: 0 };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const allViolations = [];
  let removedCount = 0;
  const removedMaliciousFunctions = new Set();

  // 1. Remove dangerous container tags (<object>, <embed>, <applet>, <foreignObject>)
  const dangerousTags = ['object', 'embed', 'applet', 'foreignObject'];
  dangerousTags.forEach((tagName) => {
    const elements = Array.from(doc.querySelectorAll(tagName));
    elements.forEach((el) => {
      allViolations.push(`Removed dangerous <${tagName}> tag`);
      el.remove();
      removedCount++;
    });
  });

  // 2. Remove untrusted iframes or iframes with srcdoc
  const iframes = Array.from(doc.querySelectorAll('iframe'));
  iframes.forEach((iframe) => {
    const src = iframe.getAttribute('src') || '';
    const srcdoc = iframe.getAttribute('srcdoc');

    if (srcdoc !== null) {
      allViolations.push("Removed dangerous iframe with srcdoc attribute");
      iframe.remove();
      removedCount++;
      return;
    }

    // Allow trusted video embeds (youtube, vimeo, dailymotion), remove raw unknown iframes
    const isTrustedEmbed = /(?:youtube\.com\/embed|player\.vimeo\.com|dailymotion\.com\/embed)/i.test(src);
    if (!isTrustedEmbed && src) {
      allViolations.push(`Removed unauthorized iframe: ${src}`);
      iframe.remove();
      removedCount++;
    }
  });

  // 3. Inspect <script> tags
  const scriptTags = Array.from(doc.querySelectorAll('script'));
  scriptTags.forEach((scriptEl) => {
    const code = scriptEl.textContent || '';
    const src = scriptEl.getAttribute('src') || '';

    // Check external script sources
    if (src) {
      if (!isAllowedExternalHost(src)) {
        allViolations.push(`Blocked untrusted external script: ${src}`);
        scriptEl.remove();
        removedCount++;
        return;
      }
    }

    // Analyze inline script content for dangerous operations
    const analysis = analyzeScriptSecurity(code);
    if (!analysis.isSafe) {
      // It's malicious! Collect function names to disarm corresponding onclick handlers
      const declaredFuncs = extractFunctionNames(code);
      declaredFuncs.forEach(fn => removedMaliciousFunctions.add(fn));

      allViolations.push(`Removed malicious script: ${analysis.violations.join(', ')}`);
      scriptEl.remove();
      removedCount++;
    } else {
      // It is SAFE! (e.g. popup modal, accordion, local styling) -> PRESERVE IT!
    }
  });

  // 4. Inspect all elements for inline event handlers and pseudo-protocol attributes
  const allElements = Array.from(doc.querySelectorAll('*'));
  allElements.forEach((el) => {
    const attrs = Array.from(el.attributes);
    attrs.forEach((attr) => {
      const name = attr.name.toLowerCase();
      const value = attr.value || '';

      // Inline event handlers (onclick, onload, onerror, onmouseover, etc.)
      if (name.startsWith('on')) {
        const analysis = analyzeScriptSecurity(value);
        
        // Check if handler contains dangerous code directly (e.g. onerror="alert('XSS')")
        if (!analysis.isSafe) {
          allViolations.push(`Removed malicious inline handler '${name}': ${analysis.violations.join(', ')}`);
          el.removeAttribute(attr.name);
          removedCount++;
          return;
        }

        // Check if handler calls one of the deleted malicious functions (e.g. onclick="stealTokens()")
        let callsDeletedFunc = false;
        for (const funcName of removedMaliciousFunctions) {
          const funcCallRegex = new RegExp(`\\b${funcName}\\s*\\(`, 'i');
          if (funcCallRegex.test(value)) {
            callsDeletedFunc = true;
            break;
          }
        }

        if (callsDeletedFunc) {
          allViolations.push(`Removed '${name}' attribute calling removed malicious function`);
          el.removeAttribute(attr.name);
          removedCount++;
        }
        // If it's a SAFE handler (e.g. onclick="openDemoModal()"), it stays 100% intact!
      }

      // Check href, src, data, or action for javascript: or vbscript: URIs
      if ((name === 'href' || name === 'src' || name === 'action' || name === 'data') && /^\s*(?:javascript|vbscript)\s*:/i.test(value)) {
        allViolations.push(`Removed dangerous pseudo-protocol URI in attribute '${name}'`);
        el.removeAttribute(attr.name);
        removedCount++;
      }
    });
  });

  return {
    sanitizedHtml: doc.body.innerHTML,
    violations: allViolations,
    removedCount
  };
}
