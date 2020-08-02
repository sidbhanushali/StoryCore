const express = require('express')
const router = express.Router();
const StoryModel = require('../models/Story');  
const {ensureAuth, ensureGuest} = require('../middleware/authMidware')
//description -- Landing page is gunna be LOGIN
// establish a different layout for the login page
// route -- GET '/'
router.get('/', ensureGuest, (req, res)=>{
res.render('login', {
        layout: 'loginLayout'
    })
})

//description -- user dashboard
// route -- GET '/dashboard'
router.get('/dashboard', ensureAuth, async (req, res)=>{
 try {
       //use mongoose to query the DB and check for stories and render pages
       const stories = await StoryModel.find({user: req.user.id}).lean()
       //req.user is coming from sessions and stories is from mongoose
       // we have access to these to use as variables in the dashboard view 
       res.render('dashboard', {name: req.user.firstName, stories} );
   } catch (error) {
       console.log(error);
       res.render('../views/errors/500');
   }
    })


    //export router
    module.exports = router; 

    