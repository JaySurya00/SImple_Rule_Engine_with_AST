class Node {
  constructor(type, value = null, left = null, right = null) {
    this.type = type;
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

function parseExpression(tokens) {
  return parseOr(tokens);
}

function parseOr(tokens) {
  let node = parseAnd(tokens);

  while (tokens.length && tokens[0] === 'OR') {
    let operator = tokens.shift();
    let right = parseAnd(tokens);
    node = new Node('operator', operator, node, right);
  }

  return node;
}

function parseAnd(tokens) {
  let node = parseCondition(tokens);

  while (tokens.length && tokens[0] === 'AND') {
    let operator = tokens.shift();
    let right = parseCondition(tokens);
    node = new Node('operator', operator, node, right);
  }

  return node;
}

function parseCondition(tokens) {
  if (tokens[0] === '(') {
    tokens.shift(); // Remove '('
    let node = parseExpression(tokens);
    tokens.shift(); // Remove ')'
    return node;
  } else {
    // Parse condition like age > 30, department = 'Sales'
    let left = tokens.shift();
    let operator = tokens.shift();
    let right = tokens.shift();
    return new Node('operand', { [left]: `${operator} ${right}` });
  }
}

// Example usage:
const rule = "((age > 30 AND department ='Marketing')) AND (salary > 20000 OR experience > 5)".trim();

const tokens = rule.match(/\w+|[><=()]|'[^']*'|\b(?:AND|OR)\b/g);

console.log("Tokens:", tokens);  // This logs the tokens before parsing the AST
const ast = parseExpression(tokens);
console.log(JSON.stringify(ast, null, 2)); // Outputs the Abstract Syntax Tree (AST)
