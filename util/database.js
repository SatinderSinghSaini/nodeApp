const mongodb = require('mongodb');
mongodbClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) =>{
  mongodbClient.connect('mongodb+srv://satinder:usrPwd%40123_321@cluster0.zrrzq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(result=>{
      console.log('connnected');
      _db = result.db();
      cb();
    }) 
    .catch(err=> console.log(err));
}

const getDb = () =>{
  if(_db){
    return _db;
  }
  return 'No DB Found!';
}
exports.getDb = getDb;
exports.mongoConnect = mongoConnect;