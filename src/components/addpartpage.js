/* -----------------------------------------------
FILE: addpartpage.js

DESCRIPTION:


(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {connect} from "react-redux";
import React from "react";

import {isUserGuest} from "./utils";
import {defaultOutfitPartObj} from "./outfitpart.js";
import {startAddOutfitPart} from "../redux/actions/actionsoutfitpart.js"
import {topCategoryOptions,fabricDesignOptions,fabricTypeOptions,brandOptions,typeOptions} from "./outfitpartoptions.js"
import OutfitPart from "./outfitpart.js";

import {history} from "../routes/routes.js";

const uuid = require('uuid/v1');


class AddPartPage extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>
                <OutfitPart 
                    outfitPartObj = {defaultOutfitPartObj}
                    pageTitle = "Add Outfit Part: Top"
                    handleSaveButtonClick = {this.handleSaveOutfitPart}
                    handleCancelButtonClick = {this.handleCancelOutfitPart}
                />
            </div>
        )
    }

    // This handler is called when the user clicks on the 'Save' button.
    // It kicks off the Redux process of saving the newly defined outfit part.
    handleSaveOutfitPart = (outfitPartObj)=>{
        console.log(outfitPartObj);
        alert('clicked on Save button in AddToPage');

        if (isUserGuest(this.props.auth.provider)) {
            // This means user is logged in as guest.
            // and the outfit obj needs an id.
            alert('logged in as guest!!');

            outfitPartObj.id = uuid();
        }

        this.props.addOutfitPart(outfitPartObj);
    }

    handleCancelOutfitPart() {
        alert ('clicked on Cancel button in AddTopPage');
        history.push('/alloutfits');
    }

}

const MapStateToProps = (state)=>{
    return {
        auth: state.auth
    }
}

const MapDispatchToProps = (dispatch)=>{
    return {
        addOutfitPart: (outfitPart)=>dispatch(startAddOutfitPart(outfitPart)),
    }

}

const connectedAddPartPage = connect(MapStateToProps,MapDispatchToProps)(AddPartPage);

export default connectedAddPartPage;
