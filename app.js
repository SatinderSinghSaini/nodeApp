const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

// const mongoConnect = require('./util/database').mongoConnect;
//const User = require('./models/user');

const mongoose = require('mongoose');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const req = require('express/lib/request');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
  // User.findById("61cbdef7cf6f451a37fc4992").then(user => {
  //   console.log('User:', user);
  //   req.user = new User(user.name, user.email, user.cart, user._id);//db returs normal user data, so created user object, 
  //                                                                   //with which we can interact with user model methods
  //   next();
  // })
  // .catch(err => {
  //   console.log(err)
  // });
  console.log('user route');
  next();
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//app.use(errorController.get404);

// mongoConnect( () => {
//   app.listen(3000);
// })

mongoose.connect('mongodb+srv://satinder:usrPwd%40123_321@cluster0.zrrzq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() =>{
  app.listen(3000);
  console.log('mongoDb connected through mongoose');
})
.catch(err => console.log(err));


