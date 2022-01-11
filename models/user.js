const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{ productId: { type: Schema.Types.ObjectId, ref: 'Product' }, quantity: { type: Number, required: true } }]
    }
});

userSchema.methods.addToCart  = function(product){
    console.log('this', this);
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

userSchema.methods.deleteCartProduct = function(prodId){
  const updatedCartItems = this.cart.items.filter(p => p.productId.toString() !== prodId.toString());
  return this.updateUserCart(updatedCartItems);
}

userSchema.methods.updateUserCart = function(updatedCartItems){
    const updatedCart = {
      items: updatedCartItems
    }
    this.cart = updatedCart;
    return this.save();
  }



module.exports = mongoose.model('User', userSchema);


