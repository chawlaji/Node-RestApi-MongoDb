const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost/noderest', {useNewUrlParser: true,useCreateIndex: true },(err)=>{
     if(err){
         console.log(err)
     }else{
         console.log("Database Connected")
     }
 });
