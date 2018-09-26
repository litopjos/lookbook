/* -----------------------------------------------
FILE: objsslider.js

DESCRIPTION:

Objects to be displayed in this slider must have
the following properties:

type
imgUrls

props:
-----

objList = 
onObjsListChanged = 

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandPointUp,faMousePointer,faPlus, faPlusCircle, faTrash, faUpload, faExchangeAlt, faInverse, faCircle} from "@fortawesome/free-solid-svg-icons";
import React from "react";

import ExifOrientationImg from 'react-exif-orientation-img';

class ObjsSlider extends React.Component {
    constructor(props){
        super (props);

        this.state = {
            objList: props.objList
        }
    }

    render() {
 //       alert(`ObjsSlider:render()`);
        return (
            <div>
                <div className="image-slider-container">
                    {
                        (this.state.objList) && this.state.objList.map(
                            (obj)=>{
                                let imgUrl=obj.imgUrls[0];
                                return(
                                    <div className="image-slider-item">
                                        <ExifOrientationImg
                                            src={imgUrl}
                                        />       
                                    </div>   
                                );                  
                            }
                        )
                    }
                    <div className="image-slider-item-icon">
                        <a><FontAwesomeIcon className="fa-3x" icon={faHandPointUp} /></a>
                    </div>
                    
                </div>
            </div>
        )
    }
}

/*
              {(arrImgObjs && arrImgObjs.length > 0) && arrImgObjs.map((imgObj)=>{

                    const imgUrl = imgObj.isUploaded ? imgObj.fileUrl : imgObj.img;
    //                        alert(`imgUrl: ${imgUrl}`);

                    return (
                            
                        <div className="image-slider-item">

                            <ExifOrientationImg
                                src={imgUrl} 
                                onDoubleClick = {()=>this.launchImageViewer(imgUrl)}
                                onClick = {()=>this.launchImageViewer(imgUrl)}
                            />


                            <div className='image-slider-item-icon-exchange'>
                            <FilePicker onPickedImage = { (fileObj) => this.onReplaceImg(fileObj, imgObj.id) }>
                                <a >
                                    <FontAwesomeIcon className="fa-3x" color="#1c88bf" icon={faExchangeAlt} />
                                </a>                                    
                            </FilePicker>
                            </div>

                            <a className="image-slider-item-icon-trash" onClick = {()=>this.onRemoveImg(imgObj.id)}>
                                <FontAwesomeIcon className="fa-3x" color="#1c88bf"  icon={faTrash} />
                            </a>

                            { !imgObj.isUploaded &&
                                <a className='image-slider-item-icon-upload' onClick = {()=>this.onUploadImg(imgObj)}>
                                        <FontAwesomeIcon className="fa-3x" color="#1c88bf" icon={faUpload} />
                                </a>

                            }

                            

                        </div>
                        
                    )
                }
*/

export default ObjsSlider;

