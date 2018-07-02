/* -----------------------------------------------
FILE: EditOutfitsPage.js

DESCRIPTION:
This file implements a stateless functional React component
that renders the EditOutfitPage page.

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {connect} from "react-redux";
import React from "react";

import {history} from "../routes/routes";
import {startEditOutfitAction} from "../redux/actions/actionsoutfits";
import OutfitPage from "./outfitpage";

const EditOutfitPage = (props)=>{
    console.log(props);
    return (

        <div>
            <h2> Edit Outfit Pages </h2>
            <OutfitPage 
                defaultOutfit={props.defaultOutfit}

                onSubmit = {(outfit)=>{

                    props.EditOutfit(props.match.params.id,outfit);
                    history.push('/');    // Redirect to root which should redirect to AllOutfits page.
                    }}                

            />
        </div>
    );
}

const MapStateToProps = (state,props)=>{
 //   console.log(state);
 //   alert(`edit id: ${props.match.params.id}`);

    const outfit = state.outfits.find((outfit)=>{
//        alert (props.match.params.id);
//        alert(outfit.id);
        if(outfit.id === props.match.params.id) {
//            alert('outfit to be edited found!');
            return true;
        }
    })    

    console.log ('edit outfit');
    console.log(outfit);
    return {
        defaultOutfit: outfit
    }
}

const MapDispatchToProps = (dispatch)=>{
    return {
        EditOutfit: (id,outfit)=>{
            dispatch(startEditOutfitAction(id,outfit))
        }
    }
}


const connectedEditOutfitPage = connect(MapStateToProps,MapDispatchToProps)(EditOutfitPage);

export default connectedEditOutfitPage;