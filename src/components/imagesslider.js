/* -----------------------------------------------
FILE: imagesslider.js

DESCRIPTION:

- Abstracts a collection of images displayed horizontally.

- The collection of images is abstracted by the ColImgObjs
  collection class.

- Each image can be stored locally or in the lookbook
server. If stored locally, an 'upload' image overlay
will be rendered on top of the image that when clicked
will attempt to upload the image to the Lookbook server.

Abstracts the logic needed to render a collection of images along with the ability
to add, replace or delete a specific image. When an image is replaced or a new image is added, the new/edited image must be uploaded to the app's
Express server's images folder. User will also be given the option to optimize the image for size before uploading
to the server.

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import React from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faPlusCircle, faTrash, faUpload, faExchangeAlt, faInverse, faCircle} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ExifOrientationImg from 'react-exif-orientation-img';

import {ColImgObjs} from "./colimgobjs";
import FilePicker from "./filepicker";
import ModalImageViewer from "./modalimageviewer";

class ImagesSlider extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            imageUrls: props.imageUrls?[...props.imageUrls]:[], // Array of urls of the images, typically from the database.
            colImgObjs: new ColImgObjs,        
            showModalViewer: false,
            imgToView: undefined
        }

        // Initialize the collection of imageObjs with the list of remote image urls.
        this.state.colImgObjs.initWithListOfUrls(this.state.imageUrls);
    }



    render() {
        const arrImgObjs = this.state.colImgObjs.getArrImgObjs();
        const imageUrls = this.state.imageUrls;

 //       console.log (imageUrls);
 //       alert ('here');
        
        return (
            <div>
                <ModalImageViewer 
                    showModalViewer={this.state.showModalViewer}
                    handleHideOutfitsImageViewer = {this.handleHideOutfitsImageViewer}
                    imgToView = {this.state.imgToView}
                />

                <div className="image-slider-container">

                    {/* Iterate through the arrImgObj */}
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
                    })} 

                    <FilePicker onPickedImage = {this.onAddImage} >
                        <div className="image-slider-item-icon">
                            <a><FontAwesomeIcon className="fa-3x" icon={faPlusCircle} /></a>
                        </div>
                    </FilePicker>

                </div>
            </div>
        );
    }

    onUploadImg = (imgObj)=>{
        console.log(imgObj);
        alert(`Upload Img (id=${imgObj}`);

        const fd = new FormData();
        fd.append ("avatar", imgObj.fileObj, imgObj.filename);
        fd.append ("UploadFolderQualifier", "tops");

        axios.post('http://localhost:8080/images/top',fd)
            .then (
                (res)=>{
                    const fileUrl = res.data.fileUrl;
                    alert(fileUrl);
                    this.setState ( 
                        (prevState)=> {
                            const arr = prevState.colImgObjs.getArrImgObjs();
                            console.log(arr);
                            console.log('pe');
                            const newArr = arr.map(
                                (img)=>{
    
                                    console.log(img);
                                    console.log('lito');
                                    alert('yo');

                                    if (img.id !== imgObj.id)
                                        return img;
    
                                    // This means that this imgObj is to be replaced with a new one
                                    // containing the img described by fileObj.
                                    const newImgObj = prevState.colImgObjs.genImgObj("", "", imgObj,true, fileUrl);
                        
                                    return newImgObj;
                                }
                            );

                            // Inform the parent that the array of uploaded images
                            // has changed.
                            // Build the array.
                            const arrImgUrls = [];
                            newArr.forEach(
                                (obj)=>{
                                    if (obj.isUploaded)
                                        arrImgUrls.push(obj.fileUrl);
                                }
                            )
                            console.log(arrImgUrls);
                            alert('ALMOST');
                            this.props.onImageUrlsChanged (arrImgUrls);

                            // Update the state
                            return {
                                colImgObjs: new ColImgObjs(newArr)
                            }
    
                        }     
                    )              
                }
            )
            .catch (
                (e) => {
                    alert(`Error: ${e}`);
                }
            )            
    }
     



    onReplaceImg = (fileObj, id) => {
        console.log (fileObj);
//        alert(id);

        this.setState ( (prevState)=> {

            const arr = prevState.colImgObjs.getArrImgObjs();
            const newArr = arr.map(
                (imgObj)=>{

                    if (imgObj.id !== id)
                        return imgObj;

                    // This means that this imgObj is to be replaced with a new one
                    // containing the img described by fileObj.
                    const newImgObj = prevState.colImgObjs.genImgObj(fileObj.preview, fileObj.name);
                    return newImgObj;
                }
            );


            return {
                colImgObjs: new ColImgObjs(newArr)
            }
        })        
    }

    onRemoveImg = (id)=>{
//        alert(id);
                
        this.setState ( (prevState)=> {

            const arr = prevState.colImgObjs.getArrImgObjs();
            const newArr = arr.filter(
                (imgObj)=>{
                    return (imgObj.id !== id);
                }
            );


            return {
                colImgObjs: new ColImgObjs(newArr)
            }
        })
                                
    }

    // This is called by FilePicker everytime a new image is added.
    onAddImage = (fileObj)=>{
        console.log(fileObj);
        console.log (`PICKED NEW IMAGE: ${fileObj}`);
 //       alert (`PICKED NEW IMAGE: ${fileObj}`);

        let newState = {};

        this.setState((prevState)=>{
            let col = new ColImgObjs(prevState.colImgObjs.arrImgObjs);
 //           col.addImgBlob(fileObj.preview, fileObj.name);
            col.addFileObj(fileObj);

            newState = {
 //               imageUrls: [...prevState.imageUrls,"/images/footwear/20180711_044454.jpg"]
 //               arrImgObjs: new ArrayImgObjs(prevState.arrImgObjs.arrImgObjs).addImgBlob(fileObj.preview,fileObj.filename),
                colImgObjs: col,        
                imageUrls: [...prevState.imageUrls,fileObj.preview]


            }

            return newState;
        });
    }

    //

    launchImageViewer = (url)=>{
//        alert('double click');
//        alert(url);
        this.setState(()=>({showModalViewer:true, imgToView:url}));
    }

    handleHideOutfitsImageViewer = ()=>{
 //       alert('clicked parent');
        this.setState(()=>({showModalViewer:false}))
    }



}



export default ImagesSlider;