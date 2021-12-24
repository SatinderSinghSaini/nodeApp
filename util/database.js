const mongodb = require('mongodb');
mongodbClient = mongodb.MongoClient;

const mongoConnect = (callBack) =>{
  mongodbClient.connect('mongodb+srv://satinder:usrPwd%40123_321@cluster0.zrrzq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(result=>{
      console.log('connected');
      callBack(result);
    }) 
    .catch(err=> console.log(err));
}
module.exports = mongoConnect;