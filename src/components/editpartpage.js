/* -----------------------------------------------
FILE: EditPartPage.js

DESCRIPTION:

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {connect} from "react-redux";
import React from "React";

import {outfitPartObj} from "./outfitpart.js";
import OutfitPart from "./outfitpart.js";
import {PageTitleHeader} from "./pagetitleheader.js";
import {topCategoryOptions,fabricDesignOptions,fabricTypeOptions,brandOptions} from "./outfitpartoptions.js"


export class EditPartPage extends React.Component {
    constructor(props) {
        alert(`EditPartPage:constructor() - ${props.match.params.id}`);
        super(props)

        const editedPartId = props.match.params.id;

        // Find the partObj to be edited.
    //    alert(props.outfitParts.length);
        props.outfitParts.some(
            (part)=>{
                alert(part.id);
                if (part.id === editedPartId) {
                    alert('match');
                    this.state = {editPartObj: part};
                    return true;
                }
            }
        )

    }

    render() {
        console.log(this.state.editPartObj);
        alert(`EditPartPage:render() state:`)
        return (
            <div>
                    <OutfitPart 
                        outfitPartObj = {this.state.editPartObj}
                        pageTitle = "Edit Outfit Part"
                        handleSaveButtonClick = {this.handleSaveEditedPart}
                        handleCancelButtonClick = {this.handleCancelEditedPart}
                        categoryOptions = {topCategoryOptions}
                        materialOptions = {fabricDesignOptions}
                        fabricTypeOptions = {fabricTypeOptions}
                        brandOptions = {brandOptions}
                    />


            </div>
        )
    }

    handleSaveEditedPart = (item)=>{
        alert(`EditPartPage:handleSaveEditedPart(${item})`)
    }

    handleCancelEditedPart = ()=> {
        alert(`EditPartPage:handleCancelEditedPart()`);
    }

}

const MapStateToProps = (state)=>{
 //   console.log(state.outfit_parts);
 //   alert('EditPartsPage:MapStateToProps');
    return {
        outfitParts: state.outfit_parts
    }
}


const MapDispatchToProps = (dispatch)=>{
    return {
    }
}



const connectedEditPartPage = connect(MapStateToProps,MapDispatchToProps)(EditPartPage);



export default connectedEditPartPage;