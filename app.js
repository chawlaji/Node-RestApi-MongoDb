const express= require('express');
const app= express();
const userRouter= require('./routes/userRoutes');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const port= 3000;
require('./util/db');

app.use(morgan('combined'))
app.use(bodyParser.json());


app.use( '/', userRouter);
app.listen(port, ()=>{
    console.log("server started");
    
});
