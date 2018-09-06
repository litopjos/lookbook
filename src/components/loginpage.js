/* -----------------------------------------------
FILE: LoginPage.js

DESCRIPTION:
This file implements a stateless functional React component
that renders the Login page which is connected component
having access to the Redux store.

(c) 2018 Joselito Pe 
-------------------------------------------------- */

import React from "react";
import {connect} from "react-redux";

import {history} from "../routes/routes"
import {login,startLoginAsGuest,startLoginViaGoogle} from "../redux/actions/actionsauth";



const LoginPage = (props)=>{
//    console.log(props);
//    alert('render of LoginPage');
    return (
        <div className='login-page'>

            <div className='login-page__login-box'>
                <h1 className = 'login-page__title'>Lookbook</h1>
                <h3>Your curated wardrobe at your fingertips.</h3>

                <p>
                    <button 
                        className="button"
                        onClick = {props.LoginAsGuest} >
                        Login As Guest
                    </button>
                    <button 
                        className="button"
                        onClick = {props.LoginViaGoogle} >
                        Login Via Google
                    </button>
                </p>

            </div>

        </div>        
    )
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
        LoginAsGuest: ()=>{dispatch(startLoginAsGuest('guest'))},
        LoginViaGoogle: ()=>{dispatch(startLoginViaGoogle())}
    }
)

// Give LoginPage access to the redux store.
const connectedLoginPage = connect(MapStateToProps,MapDispatchToProps)(LoginPage);

// Export the newly connected component.
export default connectedLoginPage;