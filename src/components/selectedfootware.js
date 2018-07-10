
/* -----------------------------------------------
FILE: selectedfootware.js

DESCRIPTION:


(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {connect} from "react-redux";
import React from "react";

import OutfitPartSlider from "./outfitpartslider";

class SelectedFootware extends React.Component {

    constructor(props) {
        super(props);

        // Generate an array of actual footware objects
        // from the array of footware IDs passed as props.
        const actualFootwear = [];
        props.ids.forEach( (id)=>{
    
            const item = props.availFootwear.find((footwear)=>{
                return (id == footwear.id);
            })
            if (item)
                actualFootwear.push(item);
        })

 //       console.log (actualFootwear);
 //       alert('here3');

        this.state = {
            actualFootwear
        }
    }

    render() {
        return (
            <div>
                <h2>Selected Footwear</h2>
                <button className="button">Select Footwear</button>
                <OutfitPartSlider outfitParts = {this.state.actualFootwear} />
            </div>
        )
    }
};

const MapStateToProps = (state)=> {



//    console.log(state);
//    alert("MapStateToProps");
    return {
        availFootwear: state.footwear,
    }
}


const connectedSelectedFootware = connect(MapStateToProps)(SelectedFootware);

export default connectedSelectedFootware;

