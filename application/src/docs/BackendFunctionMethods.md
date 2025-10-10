# Backend Function Integration Methods

This document explains different methods to fetch functions from the backend and store them in state for use in your React frontend.

## Overview

Your current implementation already shows one pattern for fetching backend functions. Here are several comprehensive approaches you can use:

## Method 1: Using Custom Hooks (Recommended)

### Multiple Functions Hook

```javascript
import { useBackendFunctions } from "./hooks/useBackendFunctions";

const MyComponent = ({ apiKey }) => {
  const {
    functions,
    isLoading,
    error,
    executeFunction,
    hasFunction,
    isInitialized,
  } = useBackendFunctions(apiKey, "http://your-api.com/functions");

  const handleClick = () => {
    if (hasFunction("myFunction")) {
      const result = executeFunction("myFunction", "param1", "param2");
      console.log(result);
    }
  };

  return (
    <div>
      {isLoading && <p>Loading functions...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={handleClick}>Execute Function</button>
    </div>
  );
};
```

### Single Function Hook

```javascript
import { useBackendFunction } from "./hooks/useBackendFunctions";

const MyComponent = ({ apiKey }) => {
  const {
    function: myFunction,
    isLoading,
    error,
    executeFunction,
    isLoaded,
  } = useBackendFunction(
    apiKey,
    "http://your-api.com/functions",
    "handleInput"
  );

  return (
    <div>
      {isLoading && <p>Loading function...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={() => executeFunction("parameter")} disabled={!isLoaded}>
        Execute Function
      </button>
    </div>
  );
};
```

## Method 2: Manual Implementation (Your Current Approach)

```javascript
import { useState, useEffect } from "react";
import { invokeApi } from "./bl_libs/invokeApi";

const MyComponent = ({ apiKey }) => {
  const [functionsObject, setFunctionsObject] = useState(null);

  const fetchFunctions = async () => {
    try {
      const response = await invokeApi({
        path: "http://your-api.com/functions",
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (response && response.functions) {
        // Convert function string to executable function
        const addFn = new Function(response.functions.handleInput);
        setFunctionsObject(addFn);
      }
    } catch (error) {
      console.error("Error fetching functions:", error);
    }
  };

  useEffect(() => {
    fetchFunctions();
  }, [apiKey]);

  useEffect(() => {
    if (functionsObject) {
      // Execute the function
      const result = functionsObject();
      console.log("Function executed:", result);
    }
  }, [functionsObject]);

  return <div>Your component content</div>;
};
```

## Method 3: State-Based Function Storage

```javascript
import { useState, useEffect } from "react";
import { invokeApi } from "./bl_libs/invokeApi";

const MyComponent = ({ apiKey }) => {
  const [customFunctions, setCustomFunctions] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchCustomFunctions = async () => {
    setIsLoading(true);
    try {
      const response = await invokeApi({
        path: "http://your-api.com/custom-functions",
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (response && response.functions) {
        const functions = {};

        Object.keys(response.functions).forEach((key) => {
          try {
            const funcString = response.functions[key];
            // Method 1: Using new Function() constructor
            functions[key] = new Function("return " + funcString)();

            // Method 2: Using eval() (less secure)
            // functions[key] = eval('(' + funcString + ')');
          } catch (err) {
            console.error(`Error creating function ${key}:`, err);
          }
        });

        setCustomFunctions(functions);
      }
    } catch (error) {
      console.error("Error fetching functions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const executeCustomFunction = (functionName, ...args) => {
    if (customFunctions[functionName]) {
      return customFunctions[functionName](...args);
    } else {
      console.error(`Function ${functionName} not available`);
      return null;
    }
  };

  useEffect(() => {
    fetchCustomFunctions();
  }, [apiKey]);

  return (
    <div>
      {isLoading && <p>Loading functions...</p>}
      {Object.keys(customFunctions).map((funcName) => (
        <button key={funcName} onClick={() => executeCustomFunction(funcName)}>
          Execute {funcName}
        </button>
      ))}
    </div>
  );
};
```

## Method 4: Dynamic Function Creation

```javascript
const createDynamicFunction = (functionString, parameters = {}) => {
  try {
    // Create a function that accepts parameters
    const dynamicFunction = new Function(
      "params",
      `return (${functionString})(params)`
    );
    return dynamicFunction;
  } catch (err) {
    console.error("Error creating dynamic function:", err);
    return null;
  }
};

// Usage
const dynamicFunc = createDynamicFunction(
  '(params) => { console.log("Dynamic function called with:", params); return params.value * 2; }',
  { value: 5 }
);

if (dynamicFunc) {
  const result = dynamicFunc({ value: 10 });
  console.log("Result:", result); // Output: 20
}
```

## Method 5: Function with useEffect Execution

```javascript
import { useState, useEffect } from "react";
import { invokeApi } from "./bl_libs/invokeApi";

const MyComponent = ({ apiKey }) => {
  const [storedFunction, setStoredFunction] = useState(null);

  const fetchAndStoreFunction = async () => {
    try {
      const response = await invokeApi({
        path: "http://your-api.com/function/handleInput",
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (response && response.function) {
        // Store the function in state
        const func = new Function("return " + response.function)();
        setStoredFunction(func);
      }
    } catch (err) {
      console.error("Error fetching function:", err);
    }
  };

  // Execute stored function when it changes
  useEffect(() => {
    if (storedFunction) {
      // Execute the function with any required parameters
      const result = storedFunction();
      console.log("Stored function executed:", result);
    }
  }, [storedFunction]);

  useEffect(() => {
    fetchAndStoreFunction();
  }, [apiKey]);

  return <div>Your component content</div>;
};
```

## Backend API Response Format

Your backend should return functions in this format:

```json
{
  "functions": {
    "handleInput": "function(content) { return { modifiedContent: content.toUpperCase() }; }",
    "formatText": "function(text) { return text.replace(/\\s+/g, ' ').trim(); }",
    "autoSave": "function(data) { console.log('Auto-saving:', data); return { success: true }; }"
  }
}
```

Or for a single function:

```json
{
  "function": "function(content) { return { modifiedContent: content.toUpperCase() }; }"
}
```

## Security Considerations

1. **Function Validation**: Always validate function strings before execution
2. **Sandboxing**: Consider using a sandboxed environment for function execution
3. **Authentication**: Ensure proper API authentication
4. **Error Handling**: Implement comprehensive error handling

## Best Practices

1. **Use Custom Hooks**: For reusable logic across components
2. **Error Handling**: Always handle errors gracefully
3. **Loading States**: Show loading indicators while fetching functions
4. **Type Safety**: Consider using TypeScript for better type safety
5. **Testing**: Write tests for your function integration logic

## Integration with Your Current Code

To integrate with your existing `ReactEditorKit.jsx`:

```javascript
// In your ReactEditorKit component
const { functions, executeFunction, hasFunction } = useBackendFunctions(
  apiKey,
  "http://192.168.1.72:8080/api/editor-functions"
);

// Use in your existing CheckAccess function
const CheckAccess = async (apiKey) => {
  // Your existing logic...

  // Execute backend function if available
  if (hasFunction("handleInput")) {
    const result = executeFunction("handleInput", {
      content: editorRef.current?.innerHTML,
      timestamp: Date.now(),
    });

    if (result && result.modifiedContent) {
      // Apply modifications
      editorRef.current.innerHTML = result.modifiedContent;
    }
  }
};
```

This approach gives you flexibility to choose the method that best fits your specific use case while maintaining clean, maintainable code.
