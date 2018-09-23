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

import {startEditOutfitPart} from "../redux/actions/actionsoutfitpart";


export class EditPartPage extends React.Component {

    constructor(props) {
        alert(`EditPartPage:constructor() - ${props.match.params.id}`);
        super(props)

        const editedPartId = props.match.params.id;

        // Find the partObj to be edited from the redux store.
        // props.outfitParts is mapped to the redux store.
    //    alert(props.outfitParts.length);
        let edit_part = props.outfitParts.find(
            (part)=>{
                return part.id === editedPartId;
            }
        )

        if (edit_part) {
            this.state = {editPartObj:edit_part}
        }
        else 
            alert("Error: couldn't find outfit part to be edited.");``
        

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
                    />


            </div>
        )
    }

    handleSaveEditedPart = (item)=>{
        alert(`EditPartPage:handleSaveEditedPart(${item})`)
        this.props.editOutfitPart(item);
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
        editOutfitPart: (outfitPart)=>dispatch(startEditOutfitPart(outfitPart)),
    }
}



const connectedEditPartPage = connect(MapStateToProps,MapDispatchToProps)(EditPartPage);



export default connectedEditPartPage;