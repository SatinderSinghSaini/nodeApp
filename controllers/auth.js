exports.getLogin = (req,res,next) =>{
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isLoggedIn: req.get('Cookie') ? req.get('Cookie').trim().split('=')[1] === 'true' : false
      });
}

exports.postLogin = (req,res,next) => {
  req.session.isLoggedIn = true;
  res.redirect('/');
}