/* -----------------------------------------------
FILE: actionsoutfitparts.js

DESCRIPTION:


(c) 2018 Joselito Pe 
-------------------------------------------------- */

import database from "../../firebase/firebase";

export const clearOutfitParts = ()=>{
    //   alert('ACTION OUTFITS: CLEAR_OUTFITPARTS');
       return {
           type: 'CLEAR_OUTFITPARTS'
       }
   }

export const addOutfitPart = (outfitPart) => {
    alert (`ACTION OUTFIT_PART: ADD_OUTFIT_PART ${outfitPart}`);
    return {
        type: 'ADD_OUTFIT_PART',
        part: outfitPart
    }
}

export const startAddOutfitPart = (outfitPart) => {
    return (dispatch)=> {
        alert (`ACTION OUTFIT_PART: START_ADD_OUTFIT_PART ${outfitPart}`);
        console.log(`database: ${database}`);

        database.ref('OUTFIT_PART')
            .push(outfitPart)
            .then(
//                alert("firebase push ok")
                ()=>{
                    dispatch(addOutfitPart(outfitPart));
                }
            )
            .catch(
                (e)=>alert(`ERROR: ${e}`)
            )
        
    }
}

export const showOutfitParts = () => {
    alert(`ACTION OUTFIT_PART: SHOW_OUTTFIT_PARTS`);
    return {
        type: 'SHOW_ALL_PARTS'
    }

}

export const startShowOutfitParts = (filter) => {
    alert('startShowoutfitParts');

    return (dispatch) => {

        alert(`ACTION OUTFIT_PART: START_SHOW_OUTTFIT_PARTS ${filter}`);

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