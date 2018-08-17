/* -----------------------------------------------
FILE: filepicker.js

DESCRIPTION:
This component wraps the <Dropzone> component which
abstracts a user interface that allows the user to 
pick a file. 
<Dropzone> returns the filename along with its conent.

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import Dropzone from "react-dropzone"
import React from "react";

const FilePicker = ({onPickedImage,children})=> {
//    console.log(onPickedImage);
    return (
        <Dropzone 
            className = "ignore"
            onDrop = {(files)=>{
                console.log(files);
//                alert('file dropped');
                onPickedImage(files[0]);

            }}
        >
            {children}
        </Dropzone>

    )
}

export default FilePicker;