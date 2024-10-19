import React, { useState } from 'react';
import axios from 'axios';

const CombineRules = () => {
  const [rules, setRules] = useState(['']);
  const [combinedRule, setCombinedRule] = useState('');
  const [error, setError] = useState('');

  const handleRuleChange = (index, value) => {
    const newRules = [...rules];
    newRules[index] = value;
    setRules(newRules);
  };

  const addRule = () => {
    setRules([...rules, '']);
  };

  const removeRule = (index) => {
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
  };

  const handleCombine = async () => {
    const filteredRules = rules.filter(rule => rule.trim() !== '');

    if (filteredRules.length > 0) {
      try {
        // Send the rules to the combine rules API
        console.log(import.meta.env.BACKEND_PORT);
        const { data: ast } = await axios.post(`http://localhost:${import.meta.env.BACKEND_PORT}/api/combine_rules`, { rules: filteredRules });
        setCombinedRule(ast);  // Setting the combined rule AST
        setError('');  // Clear any previous errors
      } catch (error) {
        console.error('Error combining rules:', error);
        setError('Failed to combine rules. Please try again.');
      }
    } else {
      alert('Please input at least one rule.');
    }
  };

  return (
    <div className="combine-rules">
      <h3>Combine Rules</h3>

      {rules.map((rule, index) => (
        <div key={index} className="rule-input">
          <input
            type="text"
            placeholder={`Rule ${index + 1}`}
            value={rule}
            onChange={(e) => handleRuleChange(index, e.target.value)}
          />
          <button type="button" onClick={() => removeRule(index)}>
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={addRule}>
        Add Rule
      </button>

      <button type="button" onClick={handleCombine}>
        Combine Rules
      </button>

      {combinedRule && (
        <div>
          <h4>Combined Rule (AST):</h4>
          <pre>{JSON.stringify(combinedRule, null, 2)}</pre>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CombineRules;
