/* -----------------------------------------------
FILE: editoutfitspage.js

DESCRIPTION:
This file implements a stateless functional React component
that renders the EditOutfitPage page.

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {connect} from "react-redux";
import React from "react";
import {Button} from "react-bootstrap";

import {history} from "../routes/routes";

import {PageTitleHeader} from "./pagetitleheader.js";
import {startEditOutfit} from "../redux/actions/actionsoutfits";
import Images from "./imagesslider";

import Outfit from "./outfit";

class EditOutfitPage extends React.Component {

    handleSaveEditedOutfit = (item)=>{
        console.log(item);
        alert(`EditPartPage:handleSaveEditedOutfit(${item})`)
        this.props.editOutfit(item);
    }
    


    handleCancelEditedOutfit = ()=>{alert('cancel')}    

    constructor (props) {
 //       alert(`EditOutfitPage:constructor()- id:${props.match.params.id}`);
        super (props);

        // Find the outfit Obj to be edited from the redux store.
        // props.outfitObjs is mapped to the redux store.
        let outfit_id = props.match.params.id;
 //       alert(props.outfitObjs.length);

        let outfit_obj = props.outfitObjs.find(
            (outfit)=>{
                if (outfit.id === outfit_id)
                    return true;
            }
        )       

        if (outfit_obj) {
            alert('ok');
            this.state = {editOutfitObj:outfit_obj};
        } else {
            alert ('EditOutfitPage: Error! Could not find outfit to be edited.')
        }
        
    }

    render() {
 //       alert(`EditOutfitPage:render()`);

        return (
            <div>
                <Outfit
                    outfitObj = {this.state.editOutfitObj}
                    pageTitle = "Edit Outfit"
                    handleSaveButtonClick = {this.handleSaveEditedOutfit}
                    handleCancelButtonClick = {this.handleCancelEditedOutfit}
                />
            </div>
        )
    }
}
/*
                    <OutfitPage 
                        outfitObj = {this.state.editOutfitObj}
                        pageTitle = "Edit Outfit Part"
                        handleSaveButtonClick = {this.handleSaveEditedOutift}
                        handleCancelButtonClick = {this.handleCancelEditedOutfit}


                        defaultOutfit={this.props.defaultOutfit}

                        onSubmit = {(outfit)=>{

                            this.props.EditOutfit(props.match.params.id,outfit);
                            history.push('/');    // Redirect to root which should redirect to AllOutfits page.
                            }}                
                    />
*/

const MapStateToProps = (state,props)=>{
 //   console.log(state);
    return {
        outfitObjs: state.outfits
    }
}

const MapDispatchToProps = (dispatch)=>{
    return {
        editOutfit: (outfit)=>{
            dispatch(startEditOutfit(outfit))
        }
    }
}


const connectedEditOutfitPage = connect(MapStateToProps,MapDispatchToProps)(EditOutfitPage);

export default connectedEditOutfitPage;