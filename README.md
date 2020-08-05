# Storycore📜

🚀💪🏽This project is deployed at: [http://storycore.herokuapp.com/](http://storycore.herokuapp.com/)

A fully Node.js social media CRUD application for making your own stories or journals privately and sharing publicly them with the world.

## Project purpose and scope

-   Create a fully Node.js/Express/MongoDB CRUD app from scratch
    
-   Use MongoDB Atlas as the Database and express-router to render templates using express-handlebars
    
-   Create DB schemas, query from DB, and create docs with mongoose
    
-   Implement Passport.JS for Authentication with Google OAuth2.0
    
-   Use Passport.JS with Google OAuth2.0 to access Google+ profile data
    
-   Get familiar with express-sessions to implement sessionCookie practices
    
-   Create custom express middleware to protect routes
## **Packages and technologies used**

-   **express**: node framework to handle routes and make server
    
-   **mongoose**: communicate with mongoDB Atlas Server and create DB schema
    
-   **connect-mongo:** allows mongodb to store sessions: so user doesn't get log out
    
-   **express-session:** for easy management of sessions and cookies
    
-   **express-handlebars:** HTML template engine of choice
    
-   **dotenv**: for config and environment variables
    
-   **method-override:** allows us to make put and delete requests from the template( by default you can only make get and post)
    
-   **moment.js:** used to format date and time
    
-   **Morgan:** easy logging → used to see server activity
    
-   **passport.js:** makes authentication super easy however you decide to do it
    
-   **passport-google-oauth2.0**: passport.js google oauth package
    
-   **Heroku:** deployment cli and site hosting

## App demo 

SCREENSHOT HERE.

## **Run App Locally - Env vars**

  To run this app locally, obtain a personal version of a Mongo URI key from mongoDB atlas, a Google Client ID for the google+ API from google cloud platform, and a Google Client Secret from the GCP developer console. 
    
 create a new file named config.env in the config directory → ./config/config.env . Then add your key details to config.env like so:
    

-   MONGO_URI = KEYgoesHere
-   GOOGLE_CLIENT_ID = KEYgoesHere 
-   GOGLE_CLEINT_SECRET = KEYgoesHere
    

  Use scripts section ꜜ to get packages and run app

## **Available Scripts**

In the project directory, you can run:

### `npm install / npm i`

Installs needed dependencies to run the app.

### `npm run dev`

Runs the app in the development mode (runs morgan logger).


### `npm start`

Starts the app in production mode.

## **License**

**[MIT](https://choosealicense.com/licenses/mit/)**


