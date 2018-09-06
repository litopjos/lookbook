/* -----------------------------------------------
FILE: AddTopPage.js

DESCRIPTION:


(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {connect} from "react-redux";
import React from "react";

import {topCategoryOptions,fabricDesignOptions,fabricTypeOptions} from "./outfitpartoptions.js"
import {outfitPartObj} from "./outfitpart.js";
import OutfitPart from "./outfitpart.js";
import {startAddOutfitPart,startShowOutfitParts} from "../redux/actions/actionsoutfitpart.js";


class AddTopPage extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>
              {this.props.ShowOutfitParts(undefined)}

                <OutfitPart 
                    outfitPartObj = {outfitPartObj}
                    pageTitle = "Add Top"
                    handleSaveButtonClick = {this.handleSaveOutfitPart}
                    handleCancelButtonClick = {this.handleCancelOutfitPart}
                    categoryOptions = {topCategoryOptions}
                    materialOptions = {fabricDesignOptions}
                    fabricTypeOptions = {fabricTypeOptions}
                />
            </div>
        )
    }

    // This handler is called when the user clicks on the 'Save' button.
    // It kicks off the Redux process of saving the newly defined outfit part.
    handleSaveOutfitPart = (outfitPartObj)=>{
        console.log(outfitPartObj);
        alert('clicked on Save button in AddToPage');

        this.props.addOutfitPart(outfitPartObj);
    }

    handleCancelOutfitPart() {
        alert ('clicked on Cancel button in AddToPage');
        history.push('/');
    }

}

const MapDispatchToProps = (dispatch)=>{
    return {
        addOutfitPart: (outfitPart)=>dispatch(startAddOutfitPart(outfitPart)),
        ShowOutfitParts: (filter)=>dispatch(startShowOutfitParts(filter))
    }

}

const connectedAddTopPage = connect(undefined,MapDispatchToProps)(AddTopPage);

export default connectedAddTopPage;
