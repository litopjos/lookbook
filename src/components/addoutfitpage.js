/* -----------------------------------------------
FILE: AddNewOutfitsPage.js

DESCRIPTION:
This file implements a stateless functional React component
that renders the AddNewOutfitPage page.

(c) 2018 Joselito Pe 
-------------------------------------------------- */

import {connect} from "react-redux";
import React from "react";

import {history} from "../routes/routes";
import {startAddOutfitAction} from "../redux/actions/actionsoutfits.js"
import Outfit from "./outfitpage";


const AddNewOutfitPage = (props)=>{

    return (

        <div>
            <h2> Add New Outfit Pages </h2>
            <Outfit 
                onSubmit = {(outfit)=>{
 //                   console.log(outfit);
 //                   alert('submit');
                    props.AddOutfit(outfit);
                    history.push('/');    // Redirect to root which should redirect to AllOutfits page.
                }} 
            />
        </div>
    );
}

const MapDispatchToProps = (dispatch) => {
    return {
        AddOutfit: (outfit)=>{dispatch(startAddOutfitAction(outfit))}
    }
}

const connectedAddNewOutfitPage = connect( undefined, MapDispatchToProps)(AddNewOutfitPage);


export default connectedAddNewOutfitPage;