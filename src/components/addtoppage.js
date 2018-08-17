/* -----------------------------------------------
FILE: AddTopPage.js

DESCRIPTION:


(c) 2018 Joselito Pe 
-------------------------------------------------- */

import {connect} from "react-redux";

import Chrome from "react-color";
import React from "react";
import Select from "react-select";

import {history} from "../routes/routes";
import {startAddOutfitPart} from "../redux/actions/actionsoutfitpart";
import ImagesSlider from "./imagesslider";
import axios from "axios";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faPlusCircle} from "@fortawesome/free-solid-svg-icons";


class AddTopPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: "top",
            category: [],
            fabricDesign: "",
            description: "",
            imgUrls:[]
        }
    }


    render() {

        const topCategoryOptions = [
            {label:'Dress Shirt', value: 'dress shirt'},
            {label:'Polo', value: 'polo'},
            {label:'T-Shirt', value: 't-shirt'},
            {label:'Tank Top', value: 'tank top'},
            { label:'short sleeves', value: 'shirt sleeves'},
            {label:'long sleeves', value: 'long sleeves'}
        ];

        const fabricDesignOptions = [
            {label:'Solid', value: 'solid'},
            {label:'Pattern', value: 'pattern'},
            {label:'Graphic', value: 'graphic'}
        ];


        return (
            <div>


                <div className="page-spec-header">
                    <div className = "container">
                        <h2>Add Top </h2>
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

                    <a onClick={this.onTestClick}><FontAwesomeIcon icon={faPlusCircle}/></a>

                    <div class = "page-section-header"> Top Images </div>

                    <input 
                        type="file"
                        name='avatar'
                        onChange={this.handleSelectedFile}
                    />

                    <ImagesSlider 
                        imageUrls = {[]}
                        onImageUrlsChanged = {this.handleImgsChanged}
                    />
                   
                    <div class = "input-group">
                        <label>Category:</label>
                        <div class = "input-group__item-flex">
                            <Select
                                onChange = {this.handleCategoryChange}
                                options = {topCategoryOptions}
                                isMulti = {true}
                            />
                        </div>
                        
                    </div>

                    <div class = "input-group">
                        <label>Fabric Design:</label>
                        <div class = "input-group__item-flex">
                            <Select
                                onChange = {this.handleFabricDesignChange}
                                options = {fabricDesignOptions}
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


    onTestClick = ()=>{
        alert('test');
    }

    // This handler is called when the user clicks on the 'Save' button.
    // It kicks off the Redux process of saving the newly defined outfit part.
    handleSaveOutfitPart = ()=>{
        alert('clicked on Save button');

        this.props.addOutfitPart(this.state);
    }

    handleCancelOutfitPart() {
        alert ('clicked on Cancel button');
        history.push('/');
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

const connectedAddTopPage = connect(undefined,MapDispatchToProps)(AddTopPage);

export default connectedAddTopPage;
