import {connect} from "react-redux";
import {Link} from "react-router-dom";
import React from "react";

import EditPartPage from "./editpartpage";
import ImageGallery from "./imagegallery";
import {history} from "../routes/routes";
import {PageTitleHeader} from "./pagetitleheader.js";
import {startShowOutfitParts,showOutfitParts} from "../redux/actions/actionsoutfitpart.js";
class AllPartsPage extends React.Component {

    handlerEditOutfitPart=(itemId)=>{
//        alert(`AllPartsPage:handlerEditOutfitPart(${itemId})`);
        history.push(`/editpart/${itemId}`);
    }

    constructor (props) {
        super (props);
    }

    render () {
        return (
            <div>
                <div className="navbar__offset"/>

                <div className="container">

                    <PageTitleHeader  title='Show All Outfit Parts'/>

                    <h1> Num. Parts: {this.props.outfitParts.length} </h1>

                    <ImageGallery 
                        galleryItems = {this.props.outfitParts}
                        handlerOnDoubleClick = {this.handlerEditOutfitPart}
                    />

                </div>
            </div>

        )
    }

    //                     {this.props.ShowOutfitParts(undefined)}


}

const MapStateToProps = (state)=>{
    return {
        outfitParts: state.outfit_parts
        }
    
}

const MapDispatchToProps = (dispatch)=>{
    return {
        ShowOutfitParts: (filter)=>{
            dispatch(startShowOutfitParts(filter))
        }
    }
}

const connectedAllPartsPage = connect(MapStateToProps,MapDispatchToProps)(AllPartsPage);

export default connectedAllPartsPage;

