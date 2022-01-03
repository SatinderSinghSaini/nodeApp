const getDb = require('../util/database').getDb;
const mongoDb = require('mongodb');
const ObjectId = mongoDb.ObjectId;

class User {
  constructor(name, email, cart, _id){
    this.name = name;
    this.email = email;
    this.cart = cart;//User and cart has one to one relationship, added cart property in user
    this._id = _id;
  }
  save(){
    const db = getDb();
    return db.collection('users').insertOne(this);
  }
  
  addToCart(product) {
    console.log('cart',this.cart);
    const cartProdIndex = this.cart.items.findIndex(cp => cp.productId.toString() === product._id.toString());
    let newQuantity = 1;
    let updatedCartItems = [...this.cart.items];
    if(cartProdIndex >=0){
      newQuantity = updatedCartItems[cartProdIndex].quantity + 1;
      updatedCartItems[cartProdIndex].quantity = newQuantity;
    }
    else{
      updatedCartItems.push({productId: product._id, quantity: newQuantity});
    }
    return this.updateUserCart(updatedCartItems);
  }

  getCart() {
    const productIds = this.cart.items.map(i => i.productId);
    const db = getDb();
    return db.collection('products').find({_id: {$in: productIds}}).toArray()
    .then(products => {
      return products.map(p =>{
        return {...p, quantity: this.cart.items.find(i => i.productId.toString() === p._id.toString()).quantity}
      })
    })
  }
  deleteCartProduct(prodId) {
    const updatedCartItems = this.cart.items.filter(i=> i.productId.toString() !== prodId.toString());
    console.log('updatedCartItems',updatedCartItems);
    return this.updateUserCart(updatedCartItems);
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then(products =>{
        const order ={
          items: products,
          user: {
            _id: new ObjectId(this._id),
            name: this.name
          }
        };
      //Insert cart in orders collection, clear cart from both user object and collection
      return db.collection('orders').insertOne(order)
    })
    .then(result =>{
      this.cart = { items: []};
      return db.collection('users').updateOne({ _id: new ObjectId(this._id)}, {$set: {cart : { items: [] } }})
    })
    .catch(err => console.log(err));
  }

  getOrders() {
    const db = getDb();
    return db.collection('orders').find({'user._id': new ObjectId(this._id)}).toArray();
  }
  static findById(id){
    const db = getDb();
    return db.collection('users').findOne({_id: new ObjectId(id)})
    .then(user =>{
      return user;
    })
    .catch(err => console.log(err));
  }

  updateUserCart(updatedCartItems){
    const updatedCart = {
      items: updatedCartItems
    }
    const db = getDb();   
    return db.collection('users').updateOne({_id: new ObjectId(this._id)},{$set: {cart: updatedCart}});
  }
}

module.exports = User;
