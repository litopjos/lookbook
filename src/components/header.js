/* -----------------------------------------------
FILE: Header.js

DESCRIPTION:
This file implements a stateless functional React component
that renders the Header component that contains the apps
navigation bar. It is intended to appear in every 
page of the app except in the PageNotFound page.

(c) 2018 Joselito Pe 
-------------------------------------------------- */

import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {NavBar} from "./navbar.js";
import {startLogoutAsGuest} from "../redux/actions/actionsauth";

const Header = (props)=>{

 
    return (
        <div className="header">
        <div className="container">
        <NavBar/>
        </div>
        </div>
    );


/*
    return (
        <div className='header'>
            <div className="container">
                <div className="header__content">
                    <Link className="header__title" to="/">
                        <h1> Lookbook </h1>
                    </Link>

                    <button className="button button--link" onClick={props.LogoutAsGuest}>Logout</button>
                </div>    
            </div>
        </div>
    );

*/

}

const MapStateToProps = (state)=>{
    //    alert("MapStateToProps call in LoginPage");
    //    alert(!! state.auth.uid);
        return {
            isAuthenticated: !! state.auth.uid,
            uid: state.auth.uid
        }
    }
    
const MapDispatchToProps = (dispatch)=>(
    {
        LogoutAsGuest: ()=>{dispatch(startLogoutAsGuest())}
    }
)

const connectedHeader = connect(MapStateToProps,MapDispatchToProps)(Header);

export default connectedHeader;