/* -----------------------------------------------
FILE: modalimageviewer.js

DESCRIPTION:


(c) 2018 Joselito Pe 
-------------------------------------------------- */
import Modal from "react-modal";
import React from "react";

class ModalImageViewer extends React.Component {

    render () {
        console.log(this.props);
//        alert(this.props.imgToView);

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

                {this.props.imgToView && <p>{this.props.imgToView}</p>}

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