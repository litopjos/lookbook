/* -----------------------------------------------
FILE: outfitsReducer.js

DESCRIPTION:
This file exports the outfitsReducer() function which
is called by Redux to determine if the specified
Redux action object is to be processed by this reducer
(to be determined by action.type). If so, the reducer
returns a new state object having properties whose 
values reflect the new state.

(c) 2018 Joselito Pe 
-------------------------------------------------- */
const outfitsReducer =  (state = {},action)=>{
    let allOutfits = [];

    switch (action.type) {
        case 'CLEAR_OUTFITS':
            return [];
        break;

        case "LOAD_OUTFITS":
 //           console.log(action.outfits);
 //           alert(`OUTFITS REDUCER: SET_OUTFITS ${action.outfits}`);
            return action.outfits;
        break;

        case "ADD_OUTFIT":   
 //           console.log(state);
 //           alert(`OUTFITS REDUCER: ADD_OUTFIT`);  

                // Copy the current array of outfits and add the new outfit at the end of it.
                allOutfits = [...state, action.outfit];
                return allOutfits;
        break;

        case "EDIT_OUTFIT":
 //           alert(`OUTFITS REDUCER: EDIT_OUTFIT`);  

            // Find the outfit to be edited from the state. Generate a new array of outfits
            // based on the old array of outfits. With the found outfit to be edited, 
            // replace that element with the new outfit parameters passed in the action object.

            allOutfits = state.map((outfit)=>{
                if(outfit.id === action.id) {
                    const editedOutfit = {...outfit, ...action.outfit};
                    return editedOutfit;
                } else
                    return outfit;
            })

            return allOutfits;
        break;

        case "DELETE_OUTFIT":
 //                 alert(`OUTFITS REDUCER: DELETE_OUTFIT`);  
       
                   // Find the outfit to be deleted from the state. Generate a new array of outfits
                   // based on the old array of outfits. With the found outfit to be edited, 
                   // replace that element with the new outfit parameters passed in the action object.
       
                   allOutfits = state.filter((outfit)=>{
                       return (outfit.id !== action.id);
                   })
       
                   return allOutfits;
               break;        

        default:
            return state;
    }
}

export default outfitsReducer;