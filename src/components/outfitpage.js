/* -----------------------------------------------
FILE: Outfit.js

DESCRIPTION:
This file implements the OutfitPage component as a
class based React component. This component is to
be used during the Add Outfit and Edit Outfit use cases.

USAGE:
props.defaultState = to be passed if the controls
in the form is to be initialized with a the specified 
value when the component is first rendered.


(c) 2018 Joselito Pe 
-------------------------------------------------- */

import React from "react";

import Images from "./imagesslider";

class OutfitPage extends React.Component {

    // This is called by the Images component every time there is a change
    // to the outfit image URLS.
    onOutfitImageUrlsChanged = (images)=>{         
 //       console.log(images);

        this.outfitImageUrls = [...images];
//        console.log(this.outfitImageUrls);
//        alert('onOutfitImageUrlsChanged'); 
    }

    constructor(props) {
        super(props);

//        alert('OutfitPage constructor');

        // Non-creactive state.
        this.outfitImageUrls = props.defaultOutfit ? props.defaultOutfit.outfitImageUrls : [];

        // Reactive State
        this.state = {
            id :            props.defaultOutfit ? props.defaultOutfit.id : "default id",
            title:          props.defaultOutfit ? props.defaultOutfit.title : "default title",
            notes:          props.defaultOutfit ? props.defaultOutfit.notes : "default notes",
        };
    }

    onSubmit = (e)=> {
        e.preventDefault();

        let outfit = {...this.state};
        outfit.outfitImageUrls = this.outfitImageUrls;

//        console.log(outfit);
//        alert('OutfitPage onSubmit()');

        this.props.onSubmit(outfit);
    } 

    onChangeTitle = (e)=> {
        const title = e.target.value;
        this.setState(()=>({title}));
    }



    render () {
        return (
            <div>
                <button 
                    class="button"
                    onClick = {
                        ()=>{
                            let outfit = {...this.state};
                            outfit.outfitImageUrls = this.outfitImageUrls;
                    
                    //        console.log(outfit);
                    //        alert('OutfitPage onSubmit()');
                    
                            this.props.onSubmit(outfit);                           
                        }
                    }
                >
                    Save Outfit
                </button>

                <h3> Outfit Images </h3>
                <Images
                    imageUrls = {this.outfitImageUrls} 
                    onImageUrlsChanged = {this.onOutfitImageUrlsChanged}
                />

                <form>                   
                    <input
                        type= "text"
                        placeholder = "id"
                        value = {this.state.id}
                    />

                    <input 
                        type = "text"
                        placeholder = "title"
                        value = {this.state.title}
                        onChange = {this.onChangeTitle}
                    />

                    <textarea
                        placeholder = "notes"
                        value = {this.state.notes}
                    />


                >
                
                </form>
            </div>
            )

        }

}

export default OutfitPage;
