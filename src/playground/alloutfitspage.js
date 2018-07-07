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

import {startDeleteOutfit,deleteOutfit} from "../redux/actions/actionsoutfits";
import FlexBox from "../playground/flexbox";

class AllOutfitsPage extends React.Component {

    onDeleteOutfit = (outfit_id)=>{
//        console.log(outfit_id);
//        alert(outfit_id);
    } 

    render() {
//        console.log(this.props.outfits);
//        alert('render');
        return (
            <div>
                <div className="page-spec-header">
                    <div className = "container">
                        <Link className="button" to="/addnewoutfit">Add New Outfit</Link> 
                    </div>
                </div>

                <div className="container">

                    <h2>All Outfits Page </h2>

                    <h3>Number of outfits: {this.props.outfits.length}</h3>

                    <div className="image-container">

                        {this.props.outfits.map((outfit)=>{
                            console.log(outfit);
                            const outfit_id = outfit.id;
                            return(
                                <div>
                                    <h3>Outfit</h3>
                                    <p> 
                                        <Link to={`/editoutfit/${outfit.id}`}> {outfit.id} </Link> 
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
                                    </p>


                                    { outfit.outfitImageUrls.length > 0 && 
                                    <img src = {outfit.outfitImageUrls[0]} />}

                                    <p>{outfit.title}</p>                        
                                    <p>{outfit.notes}</p>

                                </div>
                                );
                        })}

                    </div>    
                </div>
            </div>
        )
    }
};

const MapStateToProps = (state)=>{
//    console.log(state);
//    alert(`MapStateToProps AllOutfitsPage`);
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