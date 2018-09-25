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

import {PageTitleHeader} from "./pagetitleheader.js";
import {startDeleteOutfit,deleteOutfit} from "../redux/actions/actionsoutfits";
import FlexBox from "../playground/flexbox";

class AllOutfitsPage extends React.Component {
 
    componentDidMount() {
//        alert(`AllOutfitsPage: componentdidmount`);
    }
    componentWillUnmount(){
//        alert(`AllOutfitsPage: componentWillUnmount`);
    }

    onDeleteOutfit = (outfit_id)=>{
//        console.log(outfit_id);
//        alert(outfit_id);
    } 

    constructor(props) {
        super(props);
        alert('AllOutfitsPage:constructor()');
    }

    render() {
//        console.log(this.props.outfits);
        alert('AllOutfitsPage:render()');
        return (
            <div>
                <div className="navbar__offset"/>

                <div className="container">

                    <PageTitleHeader  title='Show All Outfits'/>

                    <h3>Number of outfits: {this.props.outfits.length}</h3>

                    <div className="image-gallery-container">

                        {this.props.outfits.map(
                            (outfit)=>{
                                console.log(outfit);
                                alert(`here: ${outfit.imgUrls.length}`);
                                const outfit_id = outfit.id;
                                return(
                                    <div className="image-gallery-item">
                                        <Link to={`/editoutfit/${outfit.id}`}>                                  
                                            <img src = {outfit.imgUrls[0]} />
                                        </Link>
                                        
                                        <button 
                                            onClick = {
                                                ()=>{
                                                    alert(outfit.id);
                                                    this.props.DeleteOutfit(outfit.id);
                                                }
                                            } 
                                        >
                                            Delete Outfit
                                        </button>

                                    </div>
                                );
                            }
                        )
                    }

                    </div>    
                </div>
            </div>
        )
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