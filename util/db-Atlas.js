const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoose = require('mongoose');
//const mongoConnect = callback => {
  mongoose.connect(
    'mongodb+srv://admin:admin@cluster0-j7yht.mongodb.net/test?retryWrites=true&w=majority' , { useNewUrlParser: true }
  )
    .then(client => {
      console.log('Connected!');
     // callback(client);
    })
    .catch(err => {
      console.log(err);
    });
//};

//module.exports = mongoConnect;
