const generate_tokens= require('./generate_tokens.js');
const parse_rule= require('./parse_rule.js');

function create_rule(rule){
    const tokens= generate_tokens(rule);
    const ast= parse_rule(tokens);
    return ast;
}


module.exports= create_rule;