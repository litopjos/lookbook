/* -----------------------------------------------
FILE: images.js

DESCRIPTION:

(c) 2018 Joselito Pe 
-------------------------------------------------- */

import React from "react";

class Images extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            imageUrls: props.imageUrls
        }
    }

    render() {
        const imageUrls = this.state.imageUrls;

        console.log (imageUrls);
        alert ('here');
        
        return (
            imageUrls.length > 0 ?
                imageUrls.map((url)=>{
                    return (
                        <div>
                            <img src={url} />
                            <button>Replace</button>
                            <button>Delete</button>
                        </div>
                    )
                }) :
            <button>Add Image </button>

        );
    }
}

export default Images;