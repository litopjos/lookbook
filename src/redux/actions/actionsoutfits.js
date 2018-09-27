/* -----------------------------------------------
FILE: actionsoutfits.js

DESCRIPTION:
This file exports the action object generators 
pertaining to outfits

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {history} from "../../routes/routes";
import {isUserGuest} from "../../components/utils";

import database from "../../firebase/firebase";

export const clearOutfits = ()=>{
    //   alert('ACTION OUTFITS: CLEAR_OUTFITS');
       return {
           type: 'CLEAR_OUTFITS'
       }
   }

export const loadOutfitsAction = (outfits)=>{
    alert('ACTION OUTFITS: LOAD_OUTFITS');
    return {
        type: 'LOAD_OUTFITS',
        outfits,
    }
}

export const startLoadOutfitsAction = (uid)=>{
    return (dispatch,getState)=>{
        alert(`ACTION OUTFIT: START_LOAD_OUTFITS uid:${uid}`);

        return database.ref(`users/${uid}/OUTFITS`)
            .once('value')
            .then(
                (snapshot)=>{
                    let outfits = [];
                    snapshot.forEach (
                        (child)=>{
                            let outfit = {...child.val()};
                            outfit.id = child.key;
                            outfits.push (outfit );
                        }
                    )
                    console.log(outfits);
                    alert(`outfits read from db.`);
                    dispatch(loadOutfitsAction(outfits));
                }
            )


    }
}

export const addOutfitAction = (outfit)=>{
    alert('ACTION OUTFITS: ADD_OUTFIT');
    return {
        type: 'ADD_OUTFIT',
        outfit
    }
}

export const startAddOutfitAction = (outfit) => {
    console.log(outfit);
    alert(`START_ACTION OUTFITS: ADD_OUTFIT ${outfit}`);     
     
    return (dispatch,getState)=>{

        let auth_provider = getState().auth.provider;
        alert (auth_provider);

        if (isUserGuest(auth_provider)) {
            // This means user is logged in as guest.
            alert('logged in as guest');
            dispatch  (addOutfitAction(outfit));
        } else {
            // This means user logged in via google.
            // We must first deposit the new outfit in the database.
            const uid = getState().auth.uid;

            database.ref(`users/${uid}/OUTFITS`)
                .push(outfit)
                .then(
                    ()=>{
                        alert("firebase push ok");
                        // We are not going to call dispatch(addOutfitPart())
                        // here. We are just going to wait for firebase to inform
                        // us of the new outfit before calling it

                    }
                )
                .catch(
                    (e)=>alert(`ERROR: ${e}`)
                )
        }

    }
}

export const editOutfitAction = (id,outfit)=>{
//        alert('ACTION OUTFITS: EDIT_OUTFIT');
        return {
            type: 'EDIT_OUTFIT',
            id,
            outfit
        }
    }
    
export const startEditOutfitAction = (id,outfit) => {
//   alert(`ACTION OUTFITS: START_EDIT_OUTFIT ${outfit}`);          
    return (dispatch)=>{
        dispatch  (editOutfitAction(id,outfit));

    }
}

export const deleteOutfit = (id) => {
//    alert (`ACTION OUTFITS: DELETE_OUTFIT ${id}`);
    return {
        type: 'DELETE_OUTFIT', 
        id
    }
}

export const startDeleteOutfit = (id) => {
//    alert ('ACTION OUTFITS: START_DELETE_OUTFIT');
    return (dispatch)=>{
        dispatch(deleteOutfit(id));
    }
}