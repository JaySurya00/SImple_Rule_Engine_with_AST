import React, { useState } from 'react';
import axios from 'axios';

const CreateRule = () => {
  const [rule, setRule] = useState('');
  const [ast, setAST] = useState('');
  const [error, setError]= useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rule.trim()) {
        try{
            const { data: ast } = await axios.post(`http://localhost:${import.meta.env.BACKEND_PORT}/api/create_rules`, { rules: rule.trim() });
            setAST(JSON.stringify(ast, null, 2));  // Formatting JSON for readability
        }
        catch(error){
            setError(error);
        }
    } else {
      alert("Rule can't be empty.");
    }
  };

  return (
    <div className="create-rule">
      <h3>Create a New Rule</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a rule (e.g., age > 30 AND salary > 20000)"
          value={rule}
          onChange={(e) => setRule(e.target.value)}
        />
        <button type="submit">Create Rule</button>
      </form>
      {ast && (
        <div className="ast-output">
          <h4>Generated AST:</h4>
          <pre>{ast}</pre>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateRule;
