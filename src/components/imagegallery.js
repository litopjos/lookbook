/* -----------------------------------------------
FILE: imagegallery.js

DESCRIPTION:


(c) 2018 Joselito Pe 
-------------------------------------------------- */
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faPlusCircle, faTrash, faUpload, faExchangeAlt, faInverse, faCircle} from "@fortawesome/free-solid-svg-icons";
import ExifOrientationImg from 'react-exif-orientation-img';

export const ImageGallery = (props) => {
    return (
 
        <div className="image-gallery-container">
            { 
                props.galleryItems.map(
                    (item)=>{
                       
                        return (
                            <div className="image-gallery-item">
                                    <ExifOrientationImg
                                        onDoubleClick= {()=>props.handlerOnDoubleClick(item.id)} 
                                        src={item.imgUrls?item.imgUrls[0]:""}
                                    />
                            </div>
                        )
                    }
                )
            }

            <div className="image-gallery__plus-container">
                <a href='#' onClick={()=>props.handlerOnAddItem()}>
                    <FontAwesomeIcon 
                        className="fa-3x" 
                        icon={faPlusCircle} />
                </a>
            </div>
        </div>        

    )
}

export default ImageGallery;