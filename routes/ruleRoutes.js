const express= require('express');
const router= express.Router();
const create_rule= require('../services/create_rule');
const combine_rules= require('../services/combine_rule');
const evaluate_rules= require('../services/evaluate_rule');

router.post('/api/create_rules', (req, res)=>{
    const {rules}= req.body;
    const ast= create_rule(rules)
    res.send({ast: ast});
})

router.post('/api/combine_rules', (req, res)=>{
    const {rules}= req.body;
    const ast= combine_rules(rules);
    res.send(ast);
})

router.post('/api/evaluate_rules', (req, res)=>{
    const {ast, data}=req.body;
    const evaluation= evaluate_rules(ast, data);
    res.send(evaluation);
})

module.exports= router;