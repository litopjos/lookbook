/* -----------------------------------------------
FILE: actionsauth.js

DESCRIPTION:
This file exports the action object generators 
pertaining to authtication.

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {history} from "../../routes/routes";
import {loadOutfitsAction} from "./actionsoutfits"

const loadGuestOutfits = () => {
    const outfits = [];

    outfits.push (
        {
            id: "1",
            title: 'formal wear',
            notes: "wore april 2005",
            outfitImageUrls: 
            [
                "/images/image1.jpg",
                "/images/image2.jpg"                 
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
                "/images/image3.jpg",
                "/images/image4.jpg"                 
            ]           
        }
    )

    return outfits
}

export const login = (uid) =>{
//    alert('ACTION GENERATOR: LOGIN');
    return {
        type: 'LOGIN',
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
    return (dispatch) => {
        dispatch(login('guest'));   

        let outfits= loadGuestOutfits();
        
        dispatch(loadOutfitsAction(outfits));

        history.push('/alloutfits');
    }
}

export const startLogoutAsGuest = () => {
    return (dispatch) => {
        dispatch(logout());   
        history.push('/');
    }
}