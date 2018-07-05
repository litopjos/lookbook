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
import {login,startLoginAsGuest} from "../redux/actions/actionsauth";



const renderLoginPage = (props) => {

    return (
        <div>

        <button>Login Using Google</button>


        <button onClick = {props.LoginAsGuest} >
            Login As Guest
        </button>
        </div>        
    )

}



const LoginPage = (props)=>{
//    console.log(props);
//    alert('render of LoginPage');
    return renderLoginPage(props);


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
        LoginAsGuest: ()=>{dispatch(startLoginAsGuest('guest'))}
    }
)

// Give LoginPage access to the redux store.
const connectedLoginPage = connect(MapStateToProps,MapDispatchToProps)(LoginPage);

// Export the newly connected component.
export default connectedLoginPage;