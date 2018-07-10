
/* -----------------------------------------------
FILE: selectedfootware.js

DESCRIPTION:


(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {connect} from "react-redux";

import React from "react";

class SelectedFootware extends React.Component {

    constructor(props) {
        super(props);

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
                <h1> Selected Footware </h1>
                {console.log(this.props.ids)}
                <p>{this.props.ids.length }</p>
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

