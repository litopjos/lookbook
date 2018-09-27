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
import {isUserGuest} from "./utils";
import {startAddOutfitAction} from "../redux/actions/actionsoutfits.js"
import Outfit from "./outfit";

const uuid = require('uuid/v1');

class AddOutfitPage extends React.Component {
    constructor(props){
        super(props);

    }
    handleSaveNewOutfit = (outfitObj)=>{
        console.log(outfitObj);
        alert(`AddOutfitPage:handleSaveNewOutfit(${outfitObj})`);

        if (isUserGuest(this.props.auth.provider)) {
            // This means user is logged in as guest.
            // and the outfit obj needs an id.
            alert('logged in as guest!!');

            outfitObj.id = uuid();
        }

        this.props.AddOutfit(outfitObj);
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
                    handleSaveButtonClick = {this.handleSaveNewOutfit}
                    handleCancelButtonClick = {this.handleCancelNewOutfit}
                />
            </div>

        )
    }
}

const MapStateToProps = (state)=>{
    return {
        auth: state.auth
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        AddOutfit: (outfit)=>{dispatch(startAddOutfitAction(outfit))}
    }
}

const connectedAddOutfitPage = connect( MapStateToProps, MapDispatchToProps)(AddOutfitPage);


export default connectedAddOutfitPage;