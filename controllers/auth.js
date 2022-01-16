exports.getLogin = (req,res,next) =>{
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isLoggedIn: req.get('Cookie') ? req.get('Cookie').trim().split('=')[1] === 'true' : false
      });
}

exports.postLogin = (req,res,next) => {
  res.setHeader('Set-Cookie', 'LoggedIn=true');
  res.redirect('/');
}