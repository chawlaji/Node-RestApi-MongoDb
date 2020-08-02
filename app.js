const express= require('express');
const app= express();
const userRouter= require('./routes/userRoutes');
const fileRouter= require('./routes/fileRoutes');
const authenticateRoutes= require('./routes/authenticateRoutes');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const port= 7000;
require('./util/db-Atlas');

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
app.use('/file',fileRouter);
app.use( '/authenticate', authenticateRoutes);
app.listen(port, ()=>{
    console.log("server started");
    
});
