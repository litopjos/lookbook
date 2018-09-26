/* -----------------------------------------------
FILE: AllOutfitsPage.js

DESCRIPTION:
This file implements a class based React component
that renders the AllOutfitsPage.

(c) 2018 Joselito Pe 
-------------------------------------------------- */

import {connect} from "react-redux";
import {Link} from "react-router-dom";

import React from "react";

import ImageGallery from "./imagegallery";
import {history} from "../routes/routes";
import {PageTitleHeader} from "./pagetitleheader.js";
import {startDeleteOutfit,deleteOutfit} from "../redux/actions/actionsoutfits";
import FlexBox from "../playground/flexbox";

class AllOutfitsPage extends React.Component {

    handlerEditOutfit = (id)=>{
        alert('edit');
        history.push(`/editoutfit/${id}`)
    }

    handlerAddOutfit = ()=>{
        alert('add');
        history.push('/addnewoutfit');
    }


    onDeleteOutfit = (outfit_id)=>{
//        console.log(outfit_id);
//        alert(outfit_id);
    } 

    constructor(props) {
        super(props);
 //       alert('AllOutfitsPage:constructor()');
    }

    render() {
//        console.log(this.props.outfits);
//        alert('AllOutfitsPage:render()');
        return (
            <div>
                <div className="navbar__offset"/>

                <div className="container">

                    <PageTitleHeader  title='Show All Outfits'/>

                    <h3>Number of outfits: {this.props.outfits.length}</h3>

                    <ImageGallery 
                        galleryItems = {this.props.outfits}
                        handlerOnDoubleClick = {this.handlerEditOutfit}
                        handlerOnAddItem = {this.handlerAddOutfit}
                    />                    
   
                </div>
            </div>
        )
    }
    componentDidMount() {
        //        alert(`AllOutfitsPage: componentdidmount`);
    }

    componentWillUnmount(){
//        alert(`AllOutfitsPage: componentWillUnmount`);
    }    
};

const MapStateToProps = (state)=>{
//    console.log(state);
//    alert(`MapStateToProps AllOutfitsPage`);

    // Reads the store for the outfits and maps it to props.outfits.
    return {
        outfits: state.outfits
    }
}

const MapDispatchToProps = (dispatch)=>{
    return {
        DeleteOutfit: (id)=>dispatch(startDeleteOutfit(id))
    }
}

const connectedAllOutfitsPage = connect(MapStateToProps,MapDispatchToProps)(AllOutfitsPage);

export default connectedAllOutfitsPage;