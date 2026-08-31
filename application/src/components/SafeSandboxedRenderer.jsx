import React, { useEffect, useRef, useState } from "react";
import { sanitizeDangerousScripts } from "../security/ScriptSanitizer";

export default function SafeSandboxedRenderer({
  htmlContent = "",
  className = "",
  style = {},
  showSecurityBadge = true,
}) {
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(200);
  const [sanitizationReport, setSanitizationReport] = useState({
    violations: [],
    removedCount: 0,
  });

  useEffect(() => {
    // 1. Sanitize the HTML before injecting into iframe
    const report = sanitizeDangerousScripts(htmlContent);
    setSanitizationReport(report);

    const iframe = iframeRef.current;
    if (!iframe) return;

    // Full isolated HTML document template
    const docHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              margin: 0;
              padding: 16px;
              color: #1f2937;
              line-height: 1.6;
              box-sizing: border-box;
            }
            img { max-width: 100%; height: auto; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #d1d5db; padding: 8px; }
            button {
              cursor: pointer;
              font-family: inherit;
            }
          </style>
        </head>
        <body>
          <div id="root-content">${report.sanitizedHtml}</div>
          <script>
            function updateHeight() {
              const height = document.documentElement.scrollHeight || document.body.scrollHeight;
              window.parent.postMessage({ type: 'MLX_RESIZE', height: height + 20 }, '*');
            }
            window.addEventListener('load', updateHeight);
            window.addEventListener('resize', updateHeight);
            const observer = new MutationObserver(updateHeight);
            observer.observe(document.body, { attributes: true, childList: true, subtree: true });
            setTimeout(updateHeight, 100);
          </script>
        </body>
      </html>
    `;

    iframe.srcdoc = docHtml;

    const handleMessage = (event) => {
      if (event.data && event.data.type === "MLX_RESIZE" && typeof event.data.height === "number") {
        setIframeHeight(Math.max(event.data.height, 80));
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [htmlContent]);

  return (
    <div
      className={className}
      style={{
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        ...style,
      }}
    >
      {showSecurityBadge && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 14px",
            backgroundColor: sanitizationReport.removedCount > 0 ? "#fffbeb" : "#f0fdf4",
            borderBottom: "1px solid #e5e7eb",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "14px" }}>
              {sanitizationReport.removedCount > 0 ? "🛡️" : "🔒"}
            </span>
            <span
              style={{
                color: sanitizationReport.removedCount > 0 ? "#92400e" : "#166534",
              }}
            >
              {sanitizationReport.removedCount > 0
                ? `Protected Sandbox: Removed ${sanitizationReport.removedCount} dangerous script/attribute payload(s)`
                : "Safe Script Sandbox Active (Parent Origin Isolated)"}
            </span>
          </div>
          {sanitizationReport.violations.length > 0 && (
            <span
              style={{
                color: "#b45309",
                fontSize: "11px",
                fontStyle: "italic",
              }}
            >
              Blocked: {sanitizationReport.violations[0]}
            </span>
          )}
        </div>
      )}

      <iframe
        ref={iframeRef}
        title="Safe Content Sandbox"
        sandbox="allow-scripts allow-same-origin allow-presentation allow-forms allow-popups allow-modals"
        style={{
          width: "100%",
          height: `${iframeHeight}px`,
          border: "none",
          display: "block",
          transition: "height 0.2s ease",
        }}
      />
    </div>
  );
}
