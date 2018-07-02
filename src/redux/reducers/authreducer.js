/* -----------------------------------------------
FILE: authReducer.js

DESCRIPTION:
This file exports the authReducer() function which
is called by Redux to determine if the specified
Redux action object is to be processed by this reducer
(to be determined by action.type). If so, the reducer
returns a new state object having properties whose 
values reflect the new state.

(c) 2018 Joselito Pe 
-------------------------------------------------- */
const authReducer =  (state = {},action)=>{
    switch (action.type) {
        case "LOGIN":
//            alert(`ACTION REDUCER: LOGIN ${action.uid}`);
            return {
                uid: action.uid
            }
        break;

        case "LOGOUT":
            alert(`ACTION REDUCER: LOGOUT`);
            return {};
        break;

        default:
            return state;
    }
}

export default authReducer;
