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

    // This is called when a selected image is to be removed.
    onRemoveImage = (url)=>{
        console.log(url)
        alert('remove image');
    }

    // This is called by FilePicker everytime a new image is added.
    onAddImage = (imageUrl)=>{
 //       alert (imageUrl);

        let newState = {};

        this.setState((prevState)=>{
            newState = {
                imageUrls: [...prevState.imageUrls,imageUrl]
            };

            // Inform the parent of the change.
//            console.log(newState.imageUrls);
//            alert("imageUrls");
            this.props.onImageUrlsChanged (newState.imageUrls);           

            return newState;
        });


    }

    constructor (props) {
        super(props);

        this.state = {
            imageUrls: [...props.imageUrls]
        }
    }

    render() {
        const imageUrls = this.state.imageUrls;

 //       console.log (imageUrls);
 //       alert ('here');
        
        return (
            <div>
                {imageUrls.length > 0 &&
                imageUrls.map((url)=>{
                    return (
                        <div>
                            <img src={url} />
                            <button>Replace</button>

                            <button
                                onClick = {()=>{
                                    this.setState ( (prevState)=> {

                                        const arr = prevState.imageUrls.filter(
                                            (url2)=>{
                                                return (url2 !== url);
                                            }
                                        );

 //                                       console.log (arr);
 //                                       alert("new state");

                                        // Inform the parent of the change.
                                        //            console.log(newState.imageUrls);
                                        //            alert("imageUrls");
                                        this.props.onImageUrlsChanged (arr);

                                        return {
                                            imageUrls: arr
                                        }
                                    })
                                }}
                            >
                                Remove
                            </button>

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