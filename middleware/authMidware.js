module.exports = {
   ensureAuth: function(req,res,next){ req.isAuthenticated() ? next() : res.redirect('/') }, 
 
   //ensureGuest only on login/home route to send an authenticated user to the dashboard 
   ensureGuest: function(req,res,next) {req.isAuthenticated() ? res.redirect('/dashboard') : next() }


} 