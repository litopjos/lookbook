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

import createStore from "./redux/createstore";
import Routes from "./routes/routes";
import {firebase} from "./firebase/firebase";
import {clearOutfits, loadOutfitsAction} from "./redux/actions/actionsoutfits.js";
import {clearOutfitParts,startLoadOutfitPartsAction} from "./redux/actions/actionsoutfitpart.js";
import {login,logout} from "./redux/actions/actionsauth";

// styles
import "normalize.css/normalize.css";   // Used to reset the styles of all the btowsers.
import "./styles/styles.scss";


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

// Register a call-back for the Firebase authetication provider.
// This callback will determine if the user has logged in or not via firebase.
firebase.auth().onAuthStateChanged(
    (user)=>{
        if (user) {
            // This means that the user has logged in via google.
            alert(`user logged in`);

            // Store login credentials in redux store and redirect to all outfits page.
            store.dispatch(login('google',user.uid));

            alert(`login via google ok. Loading outfit parts...`);
            store.dispatch(startLoadOutfitPartsAction(user.uid));

//            alert('redirect to alloutfits page');
            history.push('/alloutfits');
        } else {
            alert(`user logged out`);
            
            // Clear credentials from redux store
            store.dispatch(logout()); 

            // Clear outfits from redux store
            store.dispatch(clearOutfits()); 

            // Clear outfit parts from redux store
            store.dispatch(clearOutfitParts()); 

            // Redirect to login page.
            history.push('/');
        }
    }
)

//const isAuthenticated = true;
//ReactDOM.render(isAuthenticated ? <h1>hello world</h1> : <h1>loading via authenticated = false</h1>, document.getElementById('app'));

//ReactDOM.render({<h1>hello world</h1>}, document.getElementById('app'));