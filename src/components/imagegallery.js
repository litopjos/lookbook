/* -----------------------------------------------
FILE: imagegallery.js

DESCRIPTION:


(c) 2018 Joselito Pe 
-------------------------------------------------- */
import React from "react";

export const ImageGallery = (props) => {
    return (
 
        <div className="image-gallery-container">
            { 
                props.galleryItems.map(
                    (item)=>{
                        return (
                            <div className="image-gallery-item">
                                    <img 
                                        onDoubleClick= {()=>props.handlerOnDoubleClick(item.id)} 
                                        src={item.imgUrls[0]}
                                    />
                            </div>
                        )
                    }
                )
            }
        </div>        

    )
}

export default ImageGallery;