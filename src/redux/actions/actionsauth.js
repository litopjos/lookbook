/* -----------------------------------------------
FILE: actionsauth.js

DESCRIPTION:
This file exports the action object generators 
pertaining to authtication.

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {firebase,googleAuthProvider} from "../../firebase/firebase";
import {history} from "../../routes/routes";

import {clearOutfits} from "../../redux/actions/actionsoutfits.js";
import {clearOutfitParts} from "../../redux/actions/actionsoutfitpart.js";
import {loadFootwearAction} from "./actionsfootwear";
import {loadOutfitsAction} from "./actionsoutfits";

const loadGuestFootwear = ()=>{
    const footwear = [];

    footwear.push (
        {
            id: "footwear_1",
            notes: "",
            imageUrls: 
            [
                "/images/footwear/20180711_044454.jpg"             
            ]             
        },

        {
            id: "footwear_2",
            notes: "",
            imageUrls: 
            [
                "/images/footwear/20180711_051515.jpg"    
            ]             
        }        
    )

    return footwear;
}

const loadGuestOutfits = () => {
    const outfits = [];

    outfits.push (
        {
            id: "1",
            title: 'formal wear',
            notes: "wore april 2005",
            outfitImageUrls: 
            [
                "/images/outfits/20180516_152108.jpg"               
            ],          
            
            outfitFootwear:
            [
                "footwear_1"
            ]
    
        }
    )

    outfits.push (
        {
            id: "2",
            title: 'favorite lineup',
            notes: 'business casual',

            outfitImageUrls: 
            [
                "/images/outfits/20180423_122730.jpg"                    
            ],
 
            outfitFootwear:
            [
                "footwear_2"
            ]            
            
        }
    )

    return outfits
}

export const login = (provider,uid) =>{
    alert(`ACTION GENERATOR: LOGIN provider:${provider}, uid:${uid}`);
    return {
        type: 'LOGIN',
        provider,
        uid
    }
}

export const logout = ()=>{
 //  alert('ACTION GENERATOR: LOUGOUT');
    return {
        type: 'LOGOUT'
    }
}


export const startLoginAsGuest = () => {
    alert(`ACTION GENERATOR: Start Login As Guest`);
    return (dispatch) => {
        dispatch(login('guest','guest'));   

        let outfits = loadGuestOutfits();
        let footwear = loadGuestFootwear();
        
        dispatch(loadOutfitsAction(outfits));
        dispatch(loadFootwearAction(footwear));        

        history.push('/alloutfits');
    }
}

export const startLogout = (provider) => {
    alert(`AUTH Action Generator: startLogout provider:${provider}`);
    return (dispatch) => {
        switch(provider) {

            case 'guest': 
                // This means the user logged in as 'guest which
                // further means that no authentication mechanism was used.
                dispatch(logout());
                history.push('/');

                // Clear outfits from redux store
                dispatch(clearOutfits()); 

                // Clear outfit parts from redux store
                dispatch(clearOutfitParts()); 
            break;

            case 'google':
                // This means the authentication mechanism was firebase-google.
                //NB Call to 'dispatch(logout())' and redirect to login page will be done by 
                //firebase onAuthStateChanged() handler.
                firebase.auth()
                    .signOut()
                    .catch(
                        (e)=>{
                            alert(e);
                        }
                    )
            break;

        }
        

    }
}

export const startLoginViaGoogle = () => {
//    alert(`AUTH Action Generator: startLoginViaGoogle`);
    return (dispatch)=>{
        return firebase.auth()
            .signInWithPopup(googleAuthProvider)
            .then(
                ()=>{
                    alert(`startLoginViaGoogle() ok`);
                    // NB: Auth login redux action will be dispatched
                    // in firebase onAuthStateChanged() handler.
                }
            )
            .catch(
                (e)=>{
                    alert(e);
                }
            )
    }
}
