const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const mongoose = require('mongoose');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const req = require('express/lib/request');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
  User.findById("61d7d4fc87de0ebfd9343b56").then(user => {
    req.user = user;     //Mongoose user object
    next();
  })
  .catch(err => {
    console.log(err)
  });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

mongoose.connect('mongodb+srv://satinder:usrPwd%40123_321@cluster0.zrrzq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() =>{
  User.findOne()
  .then(user => {
    if(!user){
      const user = new User({
        name: 'Satinder',
        email: 'satinder.test@gmail.com',
        cart: {
          items: []
        }
      });
      user.save();      
    }
    app.listen(3000);
  });  
})
.catch(err => console.log(err));


