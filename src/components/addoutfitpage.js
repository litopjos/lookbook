/* -----------------------------------------------
FILE: addoutfitpage.js

DESCRIPTION:
This file implements a stateless functional React component
that renders the AddNewOutfitPage page.

(c) 2018 Joselito Pe 
-------------------------------------------------- */

import {connect} from "react-redux";
import React from "react";

import {defaultOutfitObj} from "./outfit";
import {history} from "../routes/routes";
import {startAddOutfitAction} from "../redux/actions/actionsoutfits.js"
import Outfit from "./outfit";



class AddOutfitPage extends React.Component {
    constructor(props){
        super(props);

    }
    handleSaveNewOutfit = ()=>{
        alert('save');
    }

    handleCancelNewOutfit = ()=>{
        alert('cancel');
    }    

    render() {
        return (
            <div>
                <Outfit
                    outfitObj = {defaultOutfitObj}
                    pageTitle = "Add Outfit"
                    handleSaveButtonClick = {this.handleSaveEditedOutfit}
                    handleCancelButtonClick = {this.handleCancelEditedOutfit}
                />
            </div>

        )
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        AddOutfit: (outfit)=>{dispatch(startAddOutfitAction(outfit))}
    }
}

const connectedAddOutfitPage = connect( undefined, MapDispatchToProps)(AddOutfitPage);


export default connectedAddOutfitPage;