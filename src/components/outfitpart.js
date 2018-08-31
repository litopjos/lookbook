/* -----------------------------------------------
FILE: outfitpart.js

DESCRIPTION:

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {connect} from "react-redux";

import Chrome from "react-color";
import React from "react";
import Select from "react-select";

import {history} from "../routes/routes.js";
import {startAddOutfitPart} from "../redux/actions/actionsoutfitpart.js";
import ImagesSlider from "./imagesslider.js";
import axios from "axios";

export const outfitPartObj  = {
    type: "top",
    category: [],
    fabricDesign: "",
    fabricType: "",
    description: "",
    imgUrls:[]
};

class OutfitPart extends React.Component {

    constructor (props) {
        super (props);

        this.state = props.outfitPartObj;


    }

    render() {

        return (
            <div>
                <div className="page-spec-header">
                    <div className = "container">
                        <h2>{this.props.pageTitle}</h2>
                    </div>
                </div>

                <div className = "container">
                    <button
                        class="button"
                        onClick={this.handleSaveOutfitPart}
                    >
                        Save
                    </button>

                    <button
                        class="button"
                        onClick={this.handleCancelOutfitPart}
                    >
                        Cancel
                    </button>  

                    <div class = "page-section-header"> Top Images </div>


                    <ImagesSlider 
                        imageUrls = {[]}
                        onImageUrlsChanged = {this.handleImgsChanged}
                    />
                   
                    <div class = "input-group">
                        <label>Category:</label>
                        <div class = "input-group__item-flex">
                            <Select
                                onChange = {this.handleCategoryChange}
                                options = {this.props.categoryOptions}
                                isMulti = {true}
                            />
                        </div>
                        
                    </div>

                    <div class = "input-group">
                        <label>Fabric Design:</label>
                        <div class = "input-group__item-flex">
                            <Select
                                onChange = {this.handleFabricDesignChange}
                                options = {this.props.materialOptions}
                            />    
                        </div>
                    </div>     

                    <div class = "input-group">
                        <label>Fabric Type:</label>
                        <div class = "input-group__item-flex">
                            <Select
                                onChange = {this.handleFabricTypeChange}
                                options = {this.props.fabricTypeOptions}
                            />    
                        </div>
                    </div>               

                    <div class = "input-group">                    
                        <label>Predominant Color</label>
                        <div class = "input-group__item-flex">
                            <Chrome/>
                        </div>
                    </div>
           
            
                    <div class = "input-group">
                        <label>Color Description</label>
                        <input type='text' class = "input-group__item-flex"/>                           
                    </div>

                    <div class = "input-group">
                        <label>Description:</label>
                        <textarea class = "input-group__item-flex"
                            onChange = {this.handleDescriptionChange}
                        />
                    </div>

                    <div class = "input-group">
                        <button 
                            class="input-group-item button"
                            onClick={this.handleSaveOutfitPart}
                        > 
                            Save 
                        </button>

                        <button 
                            class="button"
                            onClick={this.handleCancelOutfitPart}
                        > 
                            Cancel 
                        </button>
                    </div>

                </div>              

            </div>
        )
    }


    // This handler is called when the user clicks on the 'Save' button.
    // It kicks off the Redux process of saving the newly defined outfit part.
    handleSaveOutfitPart = ()=>{
        alert('clicked on Save button in outfitPart.');
        this.props.handleSaveButtonClick(this.state);
    }

    handleCancelOutfitPart = ()=>{
        alert ('clicked on Cancel button in outfitParts.');
        this.props.handleCancelButtonClick();
    }

    // This handler is called when the selects a new category from the list.
    handleCategoryChange = (selectedOptions)=>{
        console.log (selectedOptions);

        const newArr = selectedOptions.map(
            (arrItem)=>{
                return arrItem.value;
            }
        )

        console.log (`NEW ARRAY: ${newArr}`);        

        this.setState (
            (prevState)=> {
                return {
                    category: newArr
                }
            }
        )
    }

    handleSelectedFile(e) {
        console.log(e.target.files[0]);
        console.log(`SELECTED FILE: ${e.target.files[0]}`);
         alert('here');

         const fd = new FormData();
         fd.append ("avatar", e.target.files[0]);
//         fd.append ("avatar", e.target.files[0], e.target.files[0].name);
 //         fd.append ("test-label", "test-value");
        
         console.log(fd);
         alert('here');




         axios.post('http://localhost:8080/images/top',fd)
             .then (
                 (res)=> {
                     alert('axios ok');
                     console.log(res.data);
                 }
             )
             .catch (
                 (e) => {
                     console.log (`Error: ${e}`);
                 }
             )     


     }

     handleFabricDesignChange = (event) =>{
        console.log(`event onChanged FabricDesign: ${event.value}`)

        this.setState (
            (prevState)=> {
                return {
                    fabricDesign: event.value
                }
            }
        )        
    }       

    handleFabricTypeChange = (event) =>{
        console.log(`event onChanged FabricType: ${event.value}`)

        this.setState (
            (prevState)=> {
                return {
                    fabricType: event.value
                }
            }
        )        
    }        


    handleDescriptionChange = (event) =>{
        const val = event.target.value;
        console.log(event.target.value);
        console.log(`event onChange Description: ${event}`);

        this.setState (
            (prevstate)=> {
                return {
                    description: val
                }
            }
        )           
    }    

    handleColorChange = (event) =>{
        console.log(`event onChange Predominant COlor ${event}`)
    }       

    handleImgsChanged = (imgUrls) => {
        console.log("IMAGES");
        console.log (`Images: ${imgUrls}`);

        this.setState (
            ()=> {
                return {
                    imgUrls: imgUrls
                }
            }
        )               
    }

}
 
const MapDispatchToProps = (dispatch)=>{
    return {
        addOutfitPart: (outfitPart)=>dispatch(startAddOutfitPart(outfitPart))
    }

}

const connectedOutfitPart = connect(undefined,MapDispatchToProps)(OutfitPart);

export default connectedOutfitPart;


