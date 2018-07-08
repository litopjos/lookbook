/* -----------------------------------------------
FILE: actionsfootwear.js

DESCRIPTION:
This file exports the action object generators 
pertaining to footwear

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {history} from "../../routes/routes";

export const loadFootwearAction = (footwear)=>{
//    alert('ACTION FOOTwEAR: LOAD_OUTFITS');
    return {
        type: 'LOAD_FOOTWEAR',
        footwear,
    }
}