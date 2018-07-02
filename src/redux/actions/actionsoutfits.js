/* -----------------------------------------------
FILE: actionsoutfits.js

DESCRIPTION:
This file exports the action object generators 
pertaining to outfits

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {history} from "../../routes/routes";

export const loadOutfitsAction = (outfits)=>{
 //   alert('ACTION OUTFITS: LOAD_OUTFITS');
    return {
        type: 'LOAD_OUTFITS',
        outfits
    }
}

export const addOutfitAction = (outfit)=>{
//    alert('ACTION OUTFITS: ADD_OUTFIT');
    return {
        type: 'ADD_OUTFIT',
        outfit
    }
}

export const startAddOutfitAction = (outfit) => {
 //   alert(`START_ACTION OUTFITS: ADD_OUTFIT ${outfit}`);          
    return (dispatch)=>{
        dispatch  (addOutfitAction(outfit));

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