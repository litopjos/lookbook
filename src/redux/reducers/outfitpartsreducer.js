
const outfitPartsReducer =  (state = {},action)=>{
//    alert(`outfitPartsReducer state=${state}, action=${action}`);
    let outfitParts = [];

    switch (action.type) {

        case 'EDIT_OUTFIT_PART':
            alert(`OUTFITS_PARTS REDUCER: EDIT_OUTFIT_PART`); 

            // Find the outfit part to be edited from the state. Generate a new array of outfits
            // based on the old array of outfits. With the found outfit to be edited, 
            // replace that element with the new outfit parameters passed in the action object.
            let allOutfitParts = [];
            allOutfitParts = state.map(
                (outfitPart)=>{
                    if(outfitPart.id === action.outfitpart.id) {
                        console.log(action.outfitpart);
                        alert('match');
                        return action.outfitpart;
                    } else
                        return outfitPart;
                }
            )
            console.log(allOutfitParts);
            return allOutfitParts;
        break;

        case 'LOAD_OUTFIT_PARTS':
 //           alert(`OUTFITS_PARTS REDUCER: LOAD_OUTFIT_PARTS`); 
            // This action was caused by a db read during startup.
            outfitParts = [...action.parts];
            return outfitParts;
        break;

        case 'CLEAR_OUTFITPARTS':
            return [];
        break;

        case 'SHOW_ALL_PARTS':
            alert(`OUTFITS_PARTS REDUCER: SHOW_ALL_PARTS`); 
            return state;   
        break;
        
        case "ADD_OUTFIT_PART":   
            console.log(action);
            alert(`OUTFITS_PARTS REDUCER: ADD_OUTFIT_PART`);  

                // Copy the current array of outfits and add the new outfit at the end of it.
                outfitParts = [...state, action.part];
                return outfitParts;
        break;

        default:
            return state;
    }

}


export default outfitPartsReducer;