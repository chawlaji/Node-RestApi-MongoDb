const express= require('express');
const app= express();
const userRouter= require('./routes/userRoutes');
const morgan = require('morgan');
const port= 3000;
app.use(morgan('combined'))

app.use( '/', userRouter);
app.listen(port, ()=>{
    console.log("server started");
    
});
