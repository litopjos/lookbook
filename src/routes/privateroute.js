/* -----------------------------------------------
FILE: PrivateRoute.js

DESCRIPTION:
Implements the connected component <PrivateRoute>.
<PrivateRoute> is a wrapper for Redux's <Route> element.
<PrivateRoute> redirects to the login page if the user
has not logged in. If the user is logged in, the 'path'
attribute of the <Route> element is set to path specified
in the <PrivateRoute> element.

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {connect} from "react-redux";
import {Route,Redirect} from "react-router-dom";
import React from "react";
import Header from "../components/header";

const PrivateRoute = ({isAuthenticated, component:Component, ...rest}) => (
    <Route
        {...rest}
        component = {
            (props)=>(
                isAuthenticated ?
                (
                    <div>
                        <Header/>
                        <Component {...props}/>
                    </div>
                 ) :
                (<Redirect to="/"/>)
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

const connectedPrivateRoute = connect(MapStateToProps)(PrivateRoute);

export default connectedPrivateRoute;
