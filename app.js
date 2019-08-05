const express= require('express');
const app= express();
const userRouter= require('./routes/userRoutes');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const port= 3000;
require('./util/db');

app.use(morgan('combined'))
app.use(bodyParser.json());
// cors enable
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use( '/user', userRouter);
app.listen(port, ()=>{
    console.log("server started");
    
});
