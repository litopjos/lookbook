
const outfitPartsReducer =  (state = {},action)=>{

    let outfitParts = [];

    switch (action.type) {
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