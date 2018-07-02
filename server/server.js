/* -----------------------------------------------
FILE: server.js

DESCRIPTION:
Contains the code needed to create an Express-based
server to be used in the app's deployment to Heroku


(c) 2018 Joselito Pe 
-------------------------------------------------- */

const express = require('express');
const path = require ('path');

const port = process.env.PORT || 8080;

// Create an fully qualified path to the app's public folder.
const path_public = path.join(__dirname, "..", "public");

// Create an fully qualified path to the app's index.html file.
const path_index_html_file = path.join(path_public, "index.html");

// obtain the express application object.
const app = express();

// Create the and initialize the builtin 'static' middleware.
// Middleware is called whenever a request is received by the
// server. In this case, static will tell express to serve up
// the assets in its public directory.
const middleware = express.static(path_public);

// Initialize express with the static middleware
app.use(middleware);

// For get requests having URLs other than route, send back the
// html file. By doing this, you are reloading the app after which
// the specified URL will be dealt with by the app at the client-side.
app.get("*", 
    (req, resp) => resp.sendFile(path_index_html_file)
);


// Run express, passing to it the IP port it should be listening to.
app.listen(
    port,
    ()=>{
       console.log(`express server is up on port ${port} (public folder: ${path_public})`); 
    }
);


