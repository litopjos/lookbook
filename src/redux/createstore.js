/* -----------------------------------------------
FILE: createStore.js

DESCRIPTION:
This file exports the createStore() function that
creates the Redux store and associates the reducers
for the store.
Redux store is created such that the Redux developer
tool can be used to analyze the store using dev tools.

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunk from "redux-thunk";

import authReducer from "./reducers/authreducer";
import outfitsReducer from "./reducers/outfitsreducer";
import outfitPartsReducer from "./reducers/outfitPartsReducer";
import footwearReducer from "./reducers/footwearreducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const create_store = ()=>{

    const initState = {
        auth: [],
        outfits: [],
        outfit_parts: [],
        footwear: []
    };

    return createStore(
        combineReducers( 
            {
                auth: authReducer,
                outfits: outfitsReducer,
                outfit_parts: outfitPartsReducer,
                footwear: footwearReducer
            }
        ),
        initState,
        composeEnhancers(applyMiddleware(thunk))
    );

}

export default create_store;