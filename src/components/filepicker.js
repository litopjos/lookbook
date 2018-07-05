/* -----------------------------------------------
FILE: filepicker.js

DESCRIPTION:

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import Dropzone from "react-dropzone"
import React from "react";

const FilePicker = ({onPickedImage,children})=> {
    console.log(onPickedImage);
    return (
        <Dropzone 
            className = "ignore"
            onDrop = {(files)=>{
                console.log(files);
                alert('file dropped');
                onPickedImage(files[0].preview);

            }}
        >
            {children}
        </Dropzone>

    )
}

export default FilePicker;