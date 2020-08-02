const express = require('express')
const passport = require('passport')
const router = express.Router();  

//description --  Auth with google, log in with google button

// route -- GET '/auth/google'
router.get('/google', passport.authenticate('google', {scope: ['profile']}) )

//description -- Google auth callback --> will be spiked when the user accepts
// route -- GET '/auth/google/callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), (req, res)=>{
    res.redirect('/dashboard')
} )



//description -- passport middleware gives us a logout method that takes care of signing out the user
// route -- GET '/auth/logout'
router.get('/logout', (req, res)=>{
    req.logout()
    res.redirect('/')
})

    //export router
    module.exports = router; 