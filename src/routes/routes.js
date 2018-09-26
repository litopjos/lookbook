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

import AddOutfitPage from  "../components/addoutfitpage";
import AddPartPage from "../components/addpartpage";
import AllOutfitsPage from "../components/alloutfitspage";
import AllPartsPage from "../components/allpartspage";
import EditOutfitPage from "../components/editoutfitpage";
import EditPartPage from "../components/editpartpage";

import Header from "../components/header";
import LoginPage from "../components/loginpage";
import PageNotFoundPage from "../components/pagenotfoundpage";
import PrivateRoute from "./privateroute";
import PublicRoute from "./publicroute";


// Exporting history which will enable redirection to any page.
export const history = createHistory();

// Declaring an arrow function that returns the React-Router routes
const routes = ()=>{
//    alert(`route props ${props}`);
    return (

    //NB We are using <Router> instead of <BrowserRouter> so that we can
    //manually associate <history> to <Router>, enabling us to re-direct
    //(using <history>) from wherever we choose to import history.
    //If we didnt do this, re-direct is only possible from within a component.
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
                path="/allparts"
                component={AllPartsPage}
                exact={true} 
            />       
            <PrivateRoute 
                path="/addnewoutfit" 
                component={AddOutfitPage}
                exact={true} 
            />      

            <PrivateRoute 
                path="/addpart" 
                component={AddPartPage}
                exact={true} 
            />      


            <PrivateRoute 
                path="/editoutfit/:id" 
                component={EditOutfitPage} 
            />

            <PrivateRoute 
                path="/editpart/:id" 
                component={EditPartPage} 
            />

            <Route component={PageNotFoundPage} />                
            
        </Switch>
    </Router>
    );

}

export default routes;