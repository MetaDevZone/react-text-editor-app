import { useState, useEffect, useCallback } from "react";
import { invokeApi } from "../bl_libs/invokeApi";

/**
 * Custom hook for managing backend functions
 * @param {string} apiKey - API key for authentication
 * @param {string} endpoint - Backend endpoint to fetch functions from
 * @returns {object} - Functions and state management
 */
export const useBackendFunctions = (apiKey, endpoint) => {
  const [functions, setFunctions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch functions from backend
  const fetchFunctions = useCallback(async () => {
    if (!apiKey || !endpoint) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await invokeApi({
        path: endpoint,
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (response && response.functions) {
        // Convert function strings to executable functions
        const executableFunctions = {};

        Object.keys(response.functions).forEach((key) => {
          try {
            // Create function from string
            const funcString = response.functions[key];
            const executableFunction = new Function("return " + funcString)();
            executableFunctions[key] = executableFunction;
          } catch (err) {
            console.error(`Error creating function ${key}:`, err);
            setError(`Failed to create function: ${key}`);
          }
        });

        setFunctions(executableFunctions);
        setIsInitialized(true);
      }
    } catch (err) {
      console.error("Error fetching functions:", err);
      setError(err.message || "Failed to fetch functions");
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, endpoint]);

  // Execute a specific function
  const executeFunction = useCallback(
    (functionName, ...args) => {
      if (!functions[functionName]) {
        console.error(`Function ${functionName} not found`);
        return null;
      }

      try {
        return functions[functionName](...args);
      } catch (err) {
        console.error(`Error executing function ${functionName}:`, err);
        setError(`Failed to execute function: ${functionName}`);
        return null;
      }
    },
    [functions]
  );

  // Refresh functions
  const refreshFunctions = useCallback(() => {
    fetchFunctions();
  }, [fetchFunctions]);

  // Auto-fetch on mount and when dependencies change
  useEffect(() => {
    fetchFunctions();
  }, [fetchFunctions]);

  return {
    functions,
    isLoading,
    error,
    isInitialized,
    executeFunction,
    refreshFunctions,
    hasFunction: (name) => !!functions[name],
  };
};

/**
 * Hook for managing a single backend function
 * @param {string} apiKey - API key for authentication
 * @param {string} endpoint - Backend endpoint
 * @param {string} functionName - Name of the function to fetch
 * @returns {object} - Function and state management
 */
export const useBackendFunction = (apiKey, endpoint, functionName) => {
  const [functionObj, setFunctionObj] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFunction = useCallback(async () => {
    if (!apiKey || !endpoint || !functionName) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await invokeApi({
        path: `${endpoint}/${functionName}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (response && response.function) {
        try {
          const executableFunction = new Function(
            "return " + response.function
          )();
          setFunctionObj(executableFunction);
        } catch (err) {
          console.error(`Error creating function ${functionName}:`, err);
          setError(`Failed to create function: ${functionName}`);
        }
      }
    } catch (err) {
      console.error(`Error fetching function ${functionName}:`, err);
      setError(err.message || `Failed to fetch function: ${functionName}`);
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, endpoint, functionName]);

  const executeFunction = useCallback(
    (...args) => {
      if (!functionObj) {
        console.error(`Function ${functionName} not loaded`);
        return null;
      }

      try {
        return functionObj(...args);
      } catch (err) {
        console.error(`Error executing function ${functionName}:`, err);
        setError(`Failed to execute function: ${functionName}`);
        return null;
      }
    },
    [functionObj, functionName]
  );

  useEffect(() => {
    fetchFunction();
  }, [fetchFunction]);

  return {
    function: functionObj,
    isLoading,
    error,
    executeFunction,
    refreshFunction: fetchFunction,
    isLoaded: !!functionObj,
  };
};
