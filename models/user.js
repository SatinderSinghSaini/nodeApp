const getDb = require('../util/database').getDb;
const mongoDb = require('mongodb');
const ObjectId = mongoDb.ObjectId;

class User {
  constructor(name, email){
    this.name = name;
    this.email = email;
  }
  static save(){
    const db = getDb();
    return db.collection('users').insertOne(this);
  }
  static findById(id){
    const db = getDb();
    return db.collection('users').findOne({_id: new ObjectId(id)})
    .then(user =>{
      console.log('user', user);
      return user;
    })
    .catch(err => console.log(err));
  }
}

module.exports = User;
