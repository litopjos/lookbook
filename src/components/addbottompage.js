import React from "react";

import {bottomCategoryOptions,fabricDesignOptions,fabricTypeOptions} from "./outfitpartoptions.js"
import {outfitPartObj} from "./outfitpart.js";
import OutfitPart from "./outfitpart.js";
import {startAddOutfitPart} from "../redux/actions/actionsoutfitpart.js";

class AddBottomPage extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>
                <OutfitPart 
                    outfitPartObj = {outfitPartObj}
                    pageTitle = "Add Outfit Part: Bottom"
                    handleSaveButtonClick = {this.handleSaveOutfitPart}
                    handleCancelButtonClick = {this.handleCancelOutfitPart}
                    categoryOptions = {bottomCategoryOptions}
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

export default AddBottomPage;