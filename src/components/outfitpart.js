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
import {PageTitleHeader} from "./pagetitleheader.js";
import {startAddOutfitPart} from "../redux/actions/actionsoutfitpart.js";
import ImagesSlider from "./imagesslider.js";
import axios from "axios";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

export const outfitPartObj  = {
    type: "top",
    category: [],
    fabricDesign: "",
    fabricType: "",
    description: "",
    imgUrls:[]
};

class OutfitPart extends React.Component {

    handlePredomColorChange= (color) => {
 //       alert(`color picker choice: ${color.hex}`);
        this.setState ( ()=> ({predomColor: color.hex}) );
    }

    xlateListOfValuesToValueLabel = (values, options) => {
        let valueLabelList = [];

        values.map (
            (value) => {
                options.some (
                    (option) => {
 //                       alert(`value:${value}, option:${option.value}`);
                        if (value === option.value) {
 //                           alert('match2');
                            valueLabelList.push(option);
                            return true;
                        }

                    }
                )
            }
        )

        return valueLabelList;
    }

    xlateValueToValueLabel =  (value,options) => {
        let valueLabel = {};
        console.log(value);
        console.log (options);
        options.some(
            (option)=>{
                if (option.value === value) {
                    valueLabel = option;
                    console.log(valueLabel);
 //                   alert(`match label:${valueLabel}`)
                    return true;
                }
            }
        )

        return valueLabel;
    }
    constructor (props) {
        alert('OutfitPart:constructor()');        
        super (props);

        // Save the outfitpart to be edited as the component state.
        this.state = props.outfitPartObj;

        // Accomodating react-select control.
        // cuz only value is persisted in database and not the label
        // so we have to regen label-value in order to show default value 
        // selection.
        this.state.type 
            ? this.state.typeDefaultValue = this.xlateValueToValueLabel(this.state.type, props.typeOptions)
            : this.state.typeDefaultValue = '';
        console.log(this.state.typeDefaultValue)
        console.log('here0');

        this.state.brand 
            ? this.state.brandDefaultValue = this.xlateValueToValueLabel(this.state.brand, props.brandOptions)
            : this.state.brandDefaultValue = '';
        console.log(this.state.brandDefaultValue)
        console.log('here1');
//        alert('here2');

        this.state.fabricDesign
            ? this.state.fabricDesignDefaultValue = this.xlateValueToValueLabel(this.state.fabricDesign, props.materialOptions)
            : this.state.fabricDesignDefaultValue = '';
        console.log(this.state.fabricDesignDefaultValue);
        console.log('here2');
//        alert('here2');

        this.state.fabricType
            ? this.state.fabricTypeDefaultValue = this.xlateValueToValueLabel(this.state.fabricType, props.fabricTypeOptions)
            : this.state.fabricTypeDefaultValue = '';

        this.state.category
            ? this.state.categoryDefaultValue = this.xlateListOfValuesToValueLabel(this.state.category, props.categoryOptions)
            : this.state.categoryDefaultValue = '';

    }

    render() {
 //       alert('OutfitPart:render()');
        return (
            <div>
                <div className="navbar__offset"/>
                <div className="container">

                    <div className="toolbar">
                        <div className="container">
                            <div className="toolbar__flexcontainer">
                                <div className='toolbar__flexgrow'/>
                                <div>
                                    <a href='#' onClick={this.handleSaveOutfitPart}>
                                        <FontAwesomeIcon className="fa-3x" color="green"  icon={faCheck} />
                                    </a>

                                    <a href='#' onClick={this.handleCancelOutfitPart}>
                                        <FontAwesomeIcon className="fa-3x" color="red"  icon={faTimesCircle} />
                                    </a>                       
                                </div>
                            </div>
                        </div>
                    </div>

                    <PageTitleHeader  title={this.props.pageTitle}/>

                    <div class = "input-group">
                        <label>Type:</label>
                        <div class = "input-group__item-flex">
                            <Select
                                onChange = {this.handleTypeChange}
                                options = {this.props.typeOptions}
                                isMulti = {false}
                                defaultValue = {this.state.typeDefaultValue}
                            />
                        </div>
                    </div>                    

                    <div class = "page-section-header"> Images </div>

                    <ImagesSlider 
                        imageUrls = {this.state.imgUrls}
                        onImageUrlsChanged = {this.handleImgsChanged}
                    />
                   
                    <div class = "input-group">
                        <label>Category:</label>
                        <div class = "input-group__item-flex">
                            <Select
                                onChange = {this.handleCategoryChange}
                                options = {this.props.categoryOptions}
                                isMulti = {true}
                                defaultValue = {this.state.categoryDefaultValue}
                            />
                        </div>
                    </div>

                    <div class = "input-group">
                    <label>Brand:</label>
                    <div class = "input-group__item-flex">
                        <Select
                            defaultValue = {this.state.brandDefaultValue}
                            onChange = {this.handleBrandChange}
                            options = {this.props.brandOptions}
                            isMulti = {false}
                        />
                    </div>
                </div>

                    <div class = "input-group">
                        <label>Fabric Design:</label>
                        <div class = "input-group__item-flex">
                            <Select
                                defaultValue = {this.state.fabricDesignDefaultValue}
                                onChange = {this.handleFabricDesignChange}
                                options = {this.props.materialOptions}
                            />    
                        </div>
                    </div>     

                    <div class = "input-group">
                        <label>Fabric Type:</label>
                        <div class = "input-group__item-flex">
                            <Select
                                defaultValue = {this.state.fabricTypeDefaultValue}
                                onChange = {this.handleFabricTypeChange}
                                options = {this.props.fabricTypeOptions}
                            />    
                        </div>
                    </div>               

                    <div class = "input-group">                    
                        <label>Predominant Color</label>
                        <div class = "input-group__item-flex">
                            <Chrome
                                color={ this.state.predomColor }
                                onChangeComplete={ this.handlePredomColorChange }                           
                            />
                        </div>
                    </div>
           
            
                    <div class = "input-group">
                        <label>Color Description</label>
                        <input 
                            type='text' 
                            class = "input-group__item-flex"  
                            onChange = {this.handleColorDescriptionChange}
                            defaultValue={this.state.colorDescription}                                                 
                        />
                    </div>

                    <div class = "input-group">
                        <label>Description:</label>
                        <textarea class = "input-group__item-flex"
                            onChange = {this.handleDescriptionChange}
                            defaultValue={this.state.description}
                        />
                    </div>



                </div>              

            </div>
        )
    }

/*
                    <div class = "input-group">
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
*/
    // This handler is called when the user clicks on the 'Save' button.
    // It kicks off the Redux process of saving the newly defined outfit part.
    handleSaveOutfitPart = ()=>{
        console.log(this.state);
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
         alert(`handleSelectedFile(${e.target.files[0]})`);

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

    handleTypeChange = (event) =>{
        console.log(`event onChanged Type: ${event.value}`)

        this.setState (
            (prevState)=> {
                return {
                    type: event.value
                }
            }
        )        
    } 

    handleBrandChange = (event) =>{
        console.log(`event onChanged Brand: ${event.value}`)

        this.setState (
            (prevState)=> {
                return {
                    brand: event.value
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
    handleColorDescriptionChange = (event) =>{
        const val = event.target.value;
        console.log(event.target.value);
        console.log(`event colorDescription onChange Description: ${event}`);

        this.setState (
            (prevstate)=> {
                return {
                    colorDescription: val
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


