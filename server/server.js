/* -----------------------------------------------
FILE: server.js

DESCRIPTION:
Contains the code needed to create an Express-based
server to be used in the app's deployment to Heroku


(c) 2018 Joselito Pe 
-------------------------------------------------- */

const express = require('express');
const path = require ('path');

//const formidable = require('express-formidable');
const bodyParser = require('body-parser');
const multer = require('multer');

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

// Initialize multer middlewawre
/*
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('diskstorage:destination()');
      cb(null, './')
    },

    }
  });
 */

  var storage = multer.diskStorage({
    destination: "./public/images",
    destination: function (req, file, cb) {
        console.log(req.body);
        console.log("HEYYOUE");
        const partial_path = path.join("./public/images", 'top');
        console.log(`destination: ${partial_path}`);
        cb(null, partial_path);
    },

    filename: function (req, file, cb) {
        const fname = file.originalname;
        cb(null, fname);
    }
});


  var upload = multer({ storage: storage })


console.log(upload);

// Initialize express with the static middleware
app.use(middleware);

// Install formidable as middleware so as to be able to parse formdata.
//app.use(formidable());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// For GET requests having URLs other than route, send back the
// html file. By doing this, you are reloading the app after which
// the specified URL will be dealt with by the app at the client-side.
app.get("*", 
    (req, resp) => resp.sendFile(path_index_html_file)
);

// POST eourw
// req.fields <----
// req.body ?
// req.files <----
// TO DO: FIGURE OUT PORT ISSUE WHEN REPORTING URL OF UPLOADED FILE.
app.post("/images/top",
    upload.single('avatar'),
    (req, resp) => {
        console.log("GOT A POST REQUEST");

        console.log(req.fields);
        console.log(req.body);
 
//        console.log(req);

        if (!req.file) {
            console.log("No file received");
            return resp.send({
              success: false
            });
        
          } else {
            const filePath =  req.file.path.replace('public\\',"");
            console.log('file received');
            return resp.send({
              success: true,
              fileUrl: req.protocol + "://" + req.hostname + ":" + "8080" + '/' + filePath
            })
          }



    } 
);


// Run express, passing to it the IP port it should be listening to.
app.listen(
    port,
    ()=>{
       console.log(`express server is up on port ${port} (public folder: ${path_public})`); 
    }
);


