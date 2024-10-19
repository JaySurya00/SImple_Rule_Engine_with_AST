import React, { useState } from 'react';
import CreateRule from "./components/CreateRule"
import CombineRules from "./components/CombineRule"
import EvaluateRule from "./components/EvaluateRule"
import './App.css';

function App() {
  const [rules, setRules] = useState([]);
  const [combinedRule, setCombinedRule] = useState(null);

  const handleCreateRule = (rule) => {
    setRules([...rules, rule]);
  };

  const handleCombineRules = (combined) => {
    setCombinedRule(combined);
  };

  return (
    <div className="app">
      <h1>Rule Engine</h1>
      <CreateRule onCreateRule={handleCreateRule} />
      <CombineRules rules={rules} onCombineRules={handleCombineRules} />
      <EvaluateRule combinedRule={combinedRule} />
    </div>
  );
}

export default App;
