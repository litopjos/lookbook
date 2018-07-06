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

import {startLogoutAsGuest} from "../redux/actions/actionsauth";

const Header = (props)=>{
    return (
        <div className='header'>
            <h1 className="header__title"> Lookbook </h1>
            {props.subtitle && <h2 className="header_subtitle">{props.subtitle}</h2>}
            <p> 
                <Link to="/">Home</Link> 
                <Link to="/addnewoutfit">Add New Outfit</Link> 
            </p>

            <button 
                onClick={props.LogoutAsGuest}
            >
                Logout
            </button>
        </div>
    );
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