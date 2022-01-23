const User = require('../models/user');

exports.getLogin = (req,res,next) =>{
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isLoggedIn: false
      });
}

exports.postLogin = (req,res,next) => {  
  User.findById('61d7d4fc87de0ebfd9343b56')
  .then(user => {
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save(() =>{
      res.redirect('/');
    });    
  })
  .catch(err => console.log(err));  
}

exports.postLogout = (req,res,next) =>{
  req.session.destroy(() =>{
    res.redirect('/');
  });
}