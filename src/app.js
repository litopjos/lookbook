/* -----------------------------------------------
FILE: app.js

DESCRIPTION:
This file is the designated Javascript entry point 
to this React app. (See webpackconfig.js)
When webpack starts building the app's bundle.js file,
it will first parse this file and then work down
the dependency tree based on the import directives
it reads.

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import "./styles/styles.scss"
import createStore from "./redux/createstore";
import Routes from "./routes/routes";

// Create the redux store
const store = createStore();

store.subscribe(()=>{
    const state = store.getState();
    console.log(state);
 //   alert("redux store state change");
});


// Allow all the components in the routes to have access
// to the redux store by enclosing the routes with 
// Redux's <Provider> element.
const jsx = (
    <Provider  store={store} >
        <Routes />
    </Provider>
);

// Insert the <Provider> and the route maps into the DOM.
ReactDOM.render(jsx, document.getElementById('app'));

//const isAuthenticated = true;
//ReactDOM.render(isAuthenticated ? <h1>hello world</h1> : <h1>loading via authenticated = false</h1>, document.getElementById('app'));

//ReactDOM.render({<h1>hello world</h1>}, document.getElementById('app'));