/* -----------------------------------------------
FILE: PublicRoute.js

DESCRIPTION:
Implements the connected component <PublicRoute>.
<PublicRoute> is a wrapper for Redux's <Route> element.
<PublicRoute> redirects to the /alloutfits page if the user
has been logged in. If the user has not logged in, the 'path'
attribute of the <Route> element is set to path specified
in the <PublicRoute> element.

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {connect} from "react-redux";
import {Route,Redirect} from "react-router-dom";
import React from "react";
import Header from "../components/header";

const PublicRoute = ({isAuthenticated, component:Component, ...rest}) => (
    <Route
        {...rest}
        component = {
            (props)=>(
                isAuthenticated ?
                (<Redirect to="/alloutfits"/>):
                (<Component {...props}/>) 

            )
        }
    />
);



const MapStateToProps = (state)=>{
 //   alert(`MapStateToProps of Public route uid=${state.auth.uid}`);
    return {
        isAuthenticated: !!state.auth.uid
    }
}

const connectedPublicRoute = connect(MapStateToProps)(PublicRoute);

export default connectedPublicRoute;