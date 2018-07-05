/* -----------------------------------------------
FILE: images.js

DESCRIPTION:

Abstracts the logic needed to render a collection of images along with the ability
to replace or delete a specific image. When an image is replaced or a new image is added, the new/edited image must be uploaded to the app's
Express server's images folder. User will also be given the option to optimize the image for size before uploading
to the server.

(c) 2018 Joselito Pe 
-------------------------------------------------- */

import React from "react";

import FilePicker from "./filepicker";

class Images extends React.Component {


    onAddImage = (imageUrl)=>{
        alert (imageUrl);
        this.setState((prevState)=>(
            {
                imageUrls: [...prevState.imageUrls,imageUrl]
            }
        ));
    }

    constructor (props) {
        super(props);

        this.state = {
            imageUrls: [...props.imageUrls]
        }
    }

    render() {
        const imageUrls = this.state.imageUrls;

        console.log (imageUrls);
        alert ('here');
        
        return (
            <div>
                {imageUrls.length > 0 &&
                imageUrls.map((url)=>{
                    return (
                        <div>
                            <img src={url} />
                            <button>Replace</button>
                            <button>Delete</button>
                        </div>
                    )
                })} 

                <FilePicker
                    onPickedImage = {this.onAddImage}
                    >
                    <button>
                        Add Image
                    </button>
                </FilePicker>

            </div>

        );
    }
}

export default Images;