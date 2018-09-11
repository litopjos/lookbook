import {connect} from "react-redux";
import {Link} from "react-router-dom";
import React from "react";

import {startShowOutfitParts,showOutfitParts} from "../redux/actions/actionsoutfitpart.js";
class AllPartsPage extends React.Component {

    constructor (props) {
        super (props);
    }

    render () {
        return (

            <div>
                <div className="page-spec-header">
                    <div className = "container">
                        <Link className="button" to="/addnewoutfit">Add New Outfit</Link> 
                        <Link className="button" to="/addtop">Add Top</Link> 
                        <Link className="button" to="/addbottom">Add Bottom</Link> 
                    </div>
                </div>

                <div className="container">

                    <h1> Num. Parts: {this.props.outfitParts.length} </h1>

                    <div className="image-gallery-container">
                        { this.props.outfitParts.map(
                            (part)=>{
                                return (
                                    <div className="image-gallery-item">
                                        <img src={part.imgUrls[0]}/>
                                    </div>
                                )
                            }
                        )}
                    </div>

                    {this.props.ShowOutfitParts(undefined)}

                </div>
            </div>

        )
    }
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

