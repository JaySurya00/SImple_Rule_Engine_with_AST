const Node= require('../models/node.js');


function parse_rule(tokens) {
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
    let node = parse_rule(tokens);
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

module.exports= parse_rule;
