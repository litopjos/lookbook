/* -----------------------------------------------
FILE: addpartpage.js

DESCRIPTION:


(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {connect} from "react-redux";
import React from "react";

import {topCategoryOptions,fabricDesignOptions,fabricTypeOptions,brandOptions,typeOptions} from "./outfitpartoptions.js"
import {outfitPartObj} from "./outfitpart.js";
import OutfitPart from "./outfitpart.js";
import {startAddOutfitPart,startShowOutfitParts} from "../redux/actions/actionsoutfitpart.js";

import {history} from "../routes/routes.js";

class AddPartPage extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>
              {this.props.ShowOutfitParts(undefined)}

                <OutfitPart 
                    outfitPartObj = {outfitPartObj}
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

        this.props.addOutfitPart(outfitPartObj);
    }

    handleCancelOutfitPart() {
        alert ('clicked on Cancel button in AddTopPage');
        history.push('/alloutfits');
    }

}

const MapDispatchToProps = (dispatch)=>{
    return {
        addOutfitPart: (outfitPart)=>dispatch(startAddOutfitPart(outfitPart)),
        ShowOutfitParts: (filter)=>dispatch(startShowOutfitParts(filter))
    }

}

const connectedAddPartPage = connect(undefined,MapDispatchToProps)(AddPartPage);

export default connectedAddPartPage;
