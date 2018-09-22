/* -----------------------------------------------
FILE: actionsoutfitparts.js

DESCRIPTION:


(c) 2018 Joselito Pe 
-------------------------------------------------- */

import database from "../../firebase/firebase";
import { auth } from "firebase";

export const clearOutfitParts = ()=>{
    //   alert('ACTION OUTFITS: CLEAR_OUTFITPARTS');
       return {
           type: 'CLEAR_OUTFITPARTS'
       }
   }

export const addOutfitPart = (outfitPart) => {
//    alert (`ACTION OUTFIT_PART: ADD_OUTFIT_PART ${outfitPart}`);
    return {
        type: 'ADD_OUTFIT_PART',
        part: outfitPart
    }
}

export const loadOutfitPartsAction = (outfitParts)=>{
//    alert (`ACTION OUTFIT_PART: LOAD_OUTFIT_PART ${outfitParts}`);
    return {
        type: 'LOAD_OUTFIT_PARTS',
        parts: outfitParts
    }

}

export const startLoadOutfitPartsAction = (uid)=>{
    return (dispatch,getState)=>{
//        alert(`ACTION OUTFIT_PART: START_LOAD_OUTFITPARTS uid:${uid}`);

        return database.ref(`users/${uid}/OUTFIT_PART`)
            .once('value')
            .then(
                (snapshot)=>{
                    let outfitParts = [];
                    snapshot.forEach (
                        (child)=>{
                            outfitParts.push (
                                {
                                    id:child.key,
                                    ...child.val()
                                }
                            )
                        }
                    )
                    console.log(outfitParts);
                    alert(`outfit parts read from db.`);
                    dispatch(loadOutfitPartsAction(outfitParts));
                }
            )


    }
}
export const startAddOutfitPart = (outfitPart) => {
    return (dispatch,getState)=> {
        alert (`ACTION OUTFIT_PART: START_ADD_OUTFIT_PART ${outfitPart}`);
 //       console.log(`database: ${database}`);

        const uid = getState().auth.uid;

        database.ref(`users/${uid}/OUTFIT_PART`)
            .push(outfitPart)
            .then(
                ()=>{
                    //                alert("firebase push ok")
                    dispatch(addOutfitPart(outfitPart));
                }
            )
            .catch(
                (e)=>alert(`ERROR: ${e}`)
            )
        
    }
}

export const showOutfitParts = () => {
//    alert(`ACTION OUTFIT_PART: SHOW_OUTTFIT_PARTS`);
    return {
        type: 'SHOW_ALL_PARTS'
    }

}

export const startShowOutfitParts = (filter) => {
//    alert('startShowoutfitParts');

    return (dispatch) => {

//        alert(`ACTION OUTFIT_PART: START_SHOW_OUTTFIT_PARTS ${filter}`);

        // Inhale outfit parts from datatabase here.

        dispatch(showOutfitParts());
        /*
        () => {
            console.log('hey there');
            dispatch(showOutfitParts())
        }
        */
    }
} 

export const editOutfitPart = (outfitPart) => {
//    alert(`ACTION OUTFIT_PART: EDIT_OUTTFIT_PART ${outfitPart}`);
    return (
        {
            type: 'EDIT_OUTFIT_PART',
            outfitpart
        }
    )
}

export const startEditOutfitPart = (outfitPart) => {

//    alert(`ACTION OUTFIT_PART: START_EDIT_OUTTFIT_PART ${outfitPart}`);
    return (dispatch,getState)=> {

        const uid = getState().auth.uid;
        alert(`ACTION OUTFIT_PART: START_EDIT_OUTTFIT_PART thunk. ref=users/${uid}/OUTFIT_PART/${outfitPart.id}`);        

        database.ref(`users/${uid}/OUTFIT_PART/${outfitPart.id}`)
            .set(outfitPart)
            .then(
                ()=>{
                    alert(`edit outfit part ok. ref=users/${uid}/OUTFIT_PART/${outfitPart.id}`)
                    return dispatch(editOutfitPart(outfitPart));
                }
            )      
            .catch(
                (e)=>alert(`EDIT_OUTTFIT_PART database ERROR: ${e}`)
            )  


    }
}