/* -----------------------------------------------
FILE: footwarereducer.js

DESCRIPTION:
This file exports the footwareReducer() function which
is called by Redux to determine if the specified
Redux action object is to be processed by this reducer
(to be determined by action.type). If so, the reducer
returns a new state object having properties whose 
values reflect the new state.

(c) 2018 Joselito Pe 
-------------------------------------------------- */
const footwearReducer =  (state = {},action)=>{
//    alert(`footwearReducer state=${state}, action=${action}`);
    switch (action.type) {
        case "LOAD_FOOTWEAR":
 //           alert(`REDUCER: LOAD_FOOTWEAR`);
            return action.footwear;
        break;


        default:
            return state;
    }

}

export default footwearReducer;