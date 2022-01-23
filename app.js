const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);

const MONGODB_URI = 'mongodb+srv://satinder:usrPwd%40123_321@cluster0.zrrzq.mongodb.net/myFirstDatabase';

const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'My Secret', resave:false, saveUninitialized: false, store: store}));
app.use((req,res,next) => {
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id).then(user => {
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

mongoose.connect(MONGODB_URI)
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
.catch(err => console.log(err ));


