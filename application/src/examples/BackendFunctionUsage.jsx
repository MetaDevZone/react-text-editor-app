import React, { useState } from 'react';
import BackendFunctionExample from '../components/BackendFunctionExample';
import EnhancedReactEditorKit from '../components/EnhancedReactEditorKit';

/**
 * Example showing how to use backend functions in your React application
 */
const BackendFunctionUsage = () => {
  const [apiKey, setApiKey] = useState('your-api-key-here');
  const [activeTab, setActiveTab] = useState('editor');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Backend Function Integration Examples</h1>
      
      {/* API Key Input */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="apiKey">API Key: </label>
        <input
          id="apiKey"
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          style={{ 
            padding: '5px', 
            marginLeft: '10px', 
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      {/* Tab Navigation */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('editor')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: activeTab === 'editor' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'editor' ? 'white' : 'black',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Enhanced Editor
        </button>
        <button
          onClick={() => setActiveTab('examples')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'examples' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'examples' ? 'white' : 'black',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Function Examples
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'editor' && (
        <div>
          <h2>Enhanced Text Editor with Backend Functions</h2>
          <EnhancedReactEditorKit
            apiKey={apiKey}
            value="<p>Start typing here...</p>"
            onChange={(content) => console.log('Content changed:', content)}
            toolbar={[
              'bold', 'italic', 'underline',
              'fontSize', 'fontFamily',
              'textColor', 'backgroundColor'
            ]}
            navbar={['file', 'edit', 'view', 'insert', 'format']
            placeholder="Enter your text here..."
          />
        </div>
      )}

      {activeTab === 'examples' && (
        <div>
          <h2>Backend Function Patterns</h2>
          <BackendFunctionExample apiKey={apiKey} />
        </div>
      )}

      {/* Usage Instructions */}
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        border: '1px solid #dee2e6',
        borderRadius: '4px'
      }}>
        <h3>How to Use Backend Functions:</h3>
        <ol>
          <li>
            <strong>Set up your backend API</strong> to return functions as strings:
            <pre style={{ backgroundColor: '#e9ecef', padding: '10px', margin: '10px 0' }}>
{`// Backend response example
{
  "functions": {
    "handleInput": "function(content) { return { modifiedContent: content.toUpperCase() }; }",
    "formatText": "function(text) { return text.replace(/\\s+/g, ' ').trim(); }"
  }
}`}
            </pre>
          </li>
          <li>
            <strong>Use the custom hooks</strong> in your components:
            <pre style={{ backgroundColor: '#e9ecef', padding: '10px', margin: '10px 0' }}>
{`import { useBackendFunctions } from './hooks/useBackendFunctions';

const MyComponent = ({ apiKey }) => {
  const { functions, executeFunction, hasFunction } = useBackendFunctions(
    apiKey, 
    'http://your-api.com/functions'
  );
  
  const handleClick = () => {
    if (hasFunction('myFunction')) {
      const result = executeFunction('myFunction', 'parameter1', 'parameter2');
      console.log(result);
    }
  };
  
  return <button onClick={handleClick}>Execute Function</button>;
};`}
            </pre>
          </li>
          <li>
            <strong>Store functions in state</strong> for complex scenarios:
            <pre style={{ backgroundColor: '#e9ecef', padding: '10px', margin: '10px 0' }}>
{`const [myFunction, setMyFunction] = useState(null);

useEffect(() => {
  const fetchFunction = async () => {
    const response = await invokeApi({
      path: 'http://your-api.com/function/myFunction',
      method: 'GET'
    });
    
    if (response.function) {
      const func = new Function('return ' + response.function)();
      setMyFunction(func);
    }
  };
  
  fetchFunction();
}, []);

useEffect(() => {
  if (myFunction) {
    const result = myFunction('some parameter');
    console.log(result);
  }
}, [myFunction]);`}
            </pre>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default BackendFunctionUsage;
