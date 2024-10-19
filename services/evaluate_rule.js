
function evaluateRule(ast, data) {
    /**
     * Recursively evaluates the AST (rule) against the provided data.
     * 
     * @param {Object} node - AST node representing part of the rule.
     * @param {Object} data - Object containing user attributes (e.g., { age: 35, department: 'Sales', salary: 60000 }).
     * @returns {Boolean} - Returns true if the data satisfies the rule, false otherwise.
     */
    function evaluate(node, data) {
      if (node.type === 'operator') {
        // Recursively evaluate left and right nodes
        const leftResult = evaluate(node.left, data);
        const rightResult = evaluate(node.right, data);
  
        if (node.value === 'AND') {
          return leftResult && rightResult;  // Both must be true for AND
        } else if (node.value === 'OR') {
          return leftResult || rightResult;  // At least one must be true for OR
        }
      } else if (node.type === 'operand') {
        // Operand (condition node), e.g., { "age": "> 30" }
        const [key, condition] = Object.entries(node.value)[0];  // Extract key and condition
        const [operator, threshold] = condition.split(' ');      // Split into operator and value
        const userValue = data[key];                             // Get user's value for the key
  
        if (userValue === undefined) {
          return false;  // Return false if the attribute doesn't exist in the data
        }
  
        // Evaluate condition based on the operator
        switch (operator) {
          case '>':
            return userValue > parseFloat(threshold);
          case '<':
            return userValue < parseFloat(threshold);
          case '>=':
            return userValue >= parseFloat(threshold);
          case '<=':
            return userValue <= parseFloat(threshold);
          case '=':
            return userValue == threshold.replace(/['"]+/g, '');  // Remove quotes for string comparison
          case '!=':
            return userValue != threshold.replace(/['"]+/g, '');
          default:
            throw new Error(`Unknown operator: ${operator}`);
        }
      }
  
      return false;  // Default return false (shouldn't happen with well-formed AST)
    }
  
    // Start evaluating from the root of the AST
    return evaluate(ast, data);
  }
  
module.exports=evaluateRule;