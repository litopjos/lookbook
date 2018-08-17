/* -----------------------------------------------
FILE: actionsoutfitparts.js

DESCRIPTION:


(c) 2018 Joselito Pe 
-------------------------------------------------- */

import database from "../../firebase/firebase";

export const addOutfitPart = (outfitPart) => {
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