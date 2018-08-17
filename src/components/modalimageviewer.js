/* -----------------------------------------------
FILE: modalimageviewer.js

DESCRIPTION:


(c) 2018 Joselito Pe 
-------------------------------------------------- */
import Modal from "react-modal";
import React from "react";

//import ImageViewer from 'react-image-viewer-zoom';
//import 'react-image-viewer-zoom/dist/style.css'; 

import ImageGallery from 'react-image-gallery';

import Gallery from 'react-grid-gallery';

class ModalImageViewer extends React.Component {

    render () {
        console.log(this.props);
//        alert(this.props.imgToView);


        const imgs = [
                {
                    original: this.props.imgToView,
                    thumbnail: this.props.imgToView,
                    orientation: 4
                }
            ];

        const img2 = [
            {
            src: this.props.imgToView,
            thumbnail:this.props.imgToView,
            orientation: 5
            }
        ]

        return (

            <Modal
                isOpen = {this.props.showModalViewer}
                contenLabel = "Image Viewer"
                onRequestClose = {this.props.handleHideOutfitsImageViewer}
            >
                <button 
                    className = 'button'
                    onClick = {this.handleBackClick}
                    >
                    Back
                </button>

               
                <ImageGallery items={imgs} useBrowserFullscreen={true} orientation={4}/>
 
                <Gallery images={img2}/>

            </Modal>
        )
    }

    handleBackClick = ()=>{
        console.log(this.props);
//        alert('clicked');
        this.props.handleHideOutfitsImageViewer();
    }

}

export default ModalImageViewer;