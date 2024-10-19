
const express= require('express');
const ruleRoutes= require('./routes/ruleRoutes.js');

const app= express();
app.use(express.json())

app.use('/',ruleRoutes);


app.listen(4000, ()=>{
    console.log('Listening on PORT 4000');
})

