/* -----------------------------------------------
FILE: Routes.js

DESCRIPTION:
Contains the react-router routes that determines
the mapping between a URL and the React component
that shall be rendered.


(c) 2018 Joselito Pe 
-------------------------------------------------- */

import {Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import React from "react";
import createHistory from "history/createBrowserHistory";

import AddNewOutfitPage from  "../components/addoutfitpage";
import AllOutfitsPage from "../components/alloutfitspage";
import EditOutfitPage from "../components/editoutfitpage";
import Header from "../components/header";
import LoginPage from "../components/loginpage";
import PageNotFoundPage from "../components/pagenotfoundpage";
import PrivateRoute from "./privateroute";
import PublicRoute from "./publicroute";


// Exporting history which will enable redirection to any page.
export const history = createHistory();

// Declaring an arrou function that returns the React-Router routes
const routes = ()=>{
//    alert(`route props ${props}`);
    return (
    <Router history= {history}>
        <Switch>

            <PublicRoute 
                path="/" 
                component={LoginPage}
                exact={true} 
            />

            <PrivateRoute 
                path="/alloutfits" 
                component={AllOutfitsPage}
                exact={true} 
            />                

            <PrivateRoute 
                path="/addnewoutfit" 
                component={AddNewOutfitPage}
                exact={true} 
            />      


            <PrivateRoute path="/editoutfit/:id" component={EditOutfitPage} />
            <Route component={PageNotFoundPage} />                
            
        </Switch>
    </Router>
    );

}

export default routes;