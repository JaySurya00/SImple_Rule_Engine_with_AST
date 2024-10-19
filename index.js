
const express= require('express');
const cors= require('cors');
const ruleRoutes= require('./routes/ruleRoutes.js');

const app= express();
app.use(cors());
app.use(express.json());


app.use('/',ruleRoutes);


app.listen(process.env.PORT||4000, ()=>{
    console.log('Listening on PORT 4000');
})

