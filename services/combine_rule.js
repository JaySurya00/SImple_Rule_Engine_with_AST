const Node = require('../models/node.js');
const parseExpression = require('./parse_rule.js');
const generateTokens = require('./generate_tokens.js');

function combine_rules(rules) {
    const operatorCount = { AND: 0, OR: 0 };
    const conditionGroups = { AND: [], OR: [] };

    // Tokenize each rule and classify conditions
    rules.forEach(rule => {
        const tokens = generateTokens(rule);
        const ast = parseExpression(tokens);
        classifyConditions(ast, operatorCount, conditionGroups);
    });

    // Create the combined AST based on the most frequent operator
    const mainOperator = operatorCount.AND >= operatorCount.OR ? 'AND' : 'OR';
    const combinedAST = buildCombinedAST(mainOperator, conditionGroups[mainOperator]);

    return combinedAST;
}

function classifyConditions(node, operatorCount, conditionGroups) {
    if (node === null) return;

    if (node.type === 'operator') {
        if (node.value === 'AND') {
            operatorCount.AND++;
            classifyConditions(node.left, operatorCount, conditionGroups);
            classifyConditions(node.right, operatorCount, conditionGroups);
        } else if (node.value === 'OR') {
            operatorCount.OR++;
            classifyConditions(node.left, operatorCount, conditionGroups);
            classifyConditions(node.right, operatorCount, conditionGroups);
        }
    } else if (node.type === 'operand') {
        // Push the condition to the appropriate group based on the most frequent operator
        const mainOperator = operatorCount.AND >= operatorCount.OR ? 'AND' : 'OR'; // Determine main operator here
        conditionGroups[mainOperator].push(node);
    }
}

function buildCombinedAST(mainOperator, conditions) {
    if (conditions.length === 0) return null;

    let root = conditions[0];
    for (let i = 1; i < conditions.length; i++) {
        root = new Node('operator', mainOperator, root, conditions[i]);
    }

    return root;
}


module.exports=combine_rules;
