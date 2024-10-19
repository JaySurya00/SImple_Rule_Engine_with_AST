
const generateTokens= (rule)=>{
    const tokens= rule.match(/\w+|[><=()]|'[^']*'|\b(?:AND|OR)\b/g) || [];
    return tokens;
}

module.exports= generateTokens;