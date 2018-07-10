/* -----------------------------------------------
FILE: outfitpartslider.js

DESCRIPTION:
This file implements the OutfitPartSlider component 
that is used to display the first image associated
with the specified array of outfit part objects.


(c) 2018 Joselito Pe 
-------------------------------------------------- */
import React from "react";

class OutfitPartSlider extends React.Component {
    constructor(props) {
        super(props);



    }

    render() {
        let imageUrls = [];
        imageUrls = this.getImageFromParts(this.props.outfitParts);

        return (
            <div className="image-slider-container" >

            {imageUrls.length > 0 &&
                imageUrls.map((url)=>{
                    return (
                        <div className="image-slider-item">
                            <img  src={url} />
                        </div>
                    )
                })
            }    

            </div>
        )       

    }


             


    getImageFromParts = (outfitParts)=>{
        let arrayImages = [];
        outfitParts.forEach(
            (part)=>{
                if (part.imageUrls[0])
                    arrayImages.push(part.imageUrls[0]);
            }
        )
        return arrayImages;
    }
}

export default OutfitPartSlider;