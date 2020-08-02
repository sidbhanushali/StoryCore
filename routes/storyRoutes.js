const express = require('express')
const router = express.Router()
const StoryModel = require('../models/Story'); 
const {ensureAuth} = require('../middleware/authMidware');




// top level route of /stories declared in route 


//desc -- this route has the form to create new story 
// route -- GET '/stories/add'
router.get('/add', ensureAuth, (req, res)=>{
  res.render('stories/add')
})



// desc  --  Show all stories
// route  --  GET /stories
router.get('/', ensureAuth, async (req, res) => {
  try {
    const stories = await StoryModel.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean()

    res.render('stories/publicStories', {
      stories,
    })
  } catch (err) {
    console.error(err)
    res.render('errors/500')
  }
})

// @desc    Show a story individually
// @route   GET /stories/:id
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    let story = await StoryModel.findById(req.params.id).populate('user').lean();
    if (!story) {  return res.render('errors/404')  };
    res.render('stories/singleStory', { story });

  } catch (err) {
    console.error(err);
    res.render('errors/404');
  }
})




//desc -- show edit story page by story id 
//@route -- GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res)=>{
  try {
    //query the single story we want to edit and turn it into js object 
    const story = await StoryModel.findOne({_id: req.params.id}).lean() 
    // if theres no story found then send a 404 template 
      if(!story){ return res.render('errors/404') };
      //make sure the owner of the story is the one getting access
      story.user == req.user.id ? res.render('stories/editPage', {story}) : res.redirect('/stories')
      
  } catch (err) {
    console.error(err);
    res.render('errors/500')
  }
})


//desc -- a users public stories page 
//route -- GET /stories/user/:userId
router.get('/user/:userId', ensureAuth, async (req, res) => {
  try {
    const stories = await StoryModel.find({ user: req.params.userId, status: 'public'}).populate('user').lean()
    const story = await StoryModel.findOne({ user: req.params.userId, status: 'public'}).populate('user').lean()
    res.render('stories/userStories', {story, stories})
    
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Process add form
// @route   POST /stories
router.post('/', ensureAuth, async (req, res) => {
  try {
        req.body.user = req.user.id;
        await StoryModel.create(req.body);
        res.redirect('/dashboard');
  } catch (err) {
        console.error(err)
        res.render('errors/500')
  }
})


//desc -- Update story PUT req thx to method-override
//route -- PUT /stories/:id
router.put('/:id', ensureAuth, async (req, res)=>{
   try {
        //make new var and query to see if story if there and turn Mongoose doc to JS object
      let story = await StoryModel.findById(req.params.id).lean()
      //if we didnt find the story, send the 404 error template.
      if(!story){ return res.render('/errors/404')}
      //check to see if person tryna update the story actually owns it 
      if (story.user == req.user.id){
        //this mongoose method takes what we are gunna find, the second param takes the data we are replacing it with, which is the req.body of the editStorys page 
        story = await StoryModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runVaildators: true} );
        res.redirect('/dashboard')
  
      }else{
        // if its not the same owner of the story and they are trying to access this route we will send them back to the public stories page
        res.redirect('/stories');
      }
} catch (err) {
       console.error(err);
       return res.render('errors/500')
     }

})



//desc -- delete story DELETE req thx to method-override
//route -- DELETE  /stories/:id

router.delete('/:id', ensureAuth, async (req, res) => {
  try {
     let story = await StoryModel.findById(req.params.id).lean()

        if (!story) {return res.render('errors/404') }
    
      if (story.user != req.user.id) {   
            res.redirect('/')
        } else {
            await StoryModel.deleteOne({ _id: req.params.id });
            res.redirect('/dashboard');
        }

} catch (err) {
    console.error(err)
    return res.render('errors/500')
  }
})




module.exports = router