
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;
// class Product {
//   constructor(title, price, imageUrl, description, id, userId){
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }
//   save(){
//     const db = getDb();
//     let dbOperation;
//     if(this._id){
//       dbOperation = db.collection('products').updateOne({ _id: this._id }, {$set: this})
//     }else{
//       dbOperation = db.collection('products').insertOne(this)
//     }    
//     return dbOperation
//     .then(result =>{
//       console.log(result);
//     })
//     .catch(err => console.log(err));
//   }
//   static fetchAll() {
//     const db = getDb();
//     return db.collection('products').find().toArray()
//     .then(products =>{
//       console.log(products);
//       return products;
//     })
//     .catch(err => console.log(err));
//   }

//   static fetchById(prodId) {
//     const db  = getDb();
//     //mongodb stores id in object format
//     return db.collection('products').find({ _id: new mongodb.ObjectId(prodId) }).next()
//     .then(product =>{
//       return product;
//     })
//     .catch(err => console.log(err));
//   }

//   static deleteProduct(prodId) {
//     const db = getDb();
//     return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
//     .then(result => {
//       return result;
//     })
//     .catch(err => console.log(err));
//   }
// }

module.exports = mongoose.model('Product', productSchema);
