const path = require('path'),
      express = require('express'),
      dotenv =  require('dotenv'), 
      connectDB = require('./config/db'),
      morgan =  require('morgan'),
      exphbs = require('express-handlebars'), 
      passport = require('passport'),
      session = require('express-session'),
      mongoose = require('mongoose'),
      MongoStore  = require('connect-mongo')(session),
      methodOverride = require('method-override')
     


//initialize express
const app = express(); 


//req.body parser - needed for method-override
app.use( express.json() )
app.use( express.urlencoded({extended: false }) )

//method-override middleware 
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  }))

//load config files -- dotenv 
dotenv.config({path: './config/config.env'})

//load passport config file -- dont forget to require passport in this app.js module to pass it in with the require statement
require('./config/passport')(passport)



//connect to DB --> came from config/db.js
connectDB();

//logging - only run during development mode -- use 'dev' level logging from morgan docs
if(process.env.NODE_ENV==='devboi'){
    app.use(morgan('dev'))
}

//handlebars helpers
const {formatDate, truncate, stripTags, editIcon, select} = require('./helpers/hbs')


//configure and set express-handlebars + handlebars-helpers +  .hbs file extension; needs default layout
app.engine('.hbs', exphbs({
                helpers: {formatDate, truncate, stripTags, editIcon, select},
                defaultLayout: 'main',
                extname: '.hbs'})
        );
app.set('view engine', '.hbs');


//express sessions Middleware --> 
app.use(session({
    secret: 'keyboard cat',
    resave: false, 
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection })
}));


//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//express global variable thru middleware for ./views/stories/publicStories.hbs to have access to req.user 
app.use(function (req, res, next){
    res.locals.user = req.user || null 
    next();
    })
    

//routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/storyRoutes'))

//set static folder 
app.use(express.static(path.join(__dirname, 'public')))

//check for port from config file or somewhere else if not found
const PORT = process.env.PORT || 6000 

//listen on PORT VAR and check which mode its running on for morgan
app.listen(PORT, console.log(`listening on PORT ${PORT} and running in: ${process.env.NODE_ENV} MODE`) );
