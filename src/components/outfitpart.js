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

import {topCategoryOptions,fabricDesignOptions,fabricTypeOptions,
         brandOptions,typeOptions,footwearCategoryOptions,footwearBrandOptions,footwearMaterialTypeOptions,
         bottomCategoryOptions} from "./outfitpartoptions.js"

export const defaultOutfitPartObj  = {
    type: "top",
    category: [],
    fabricDesign: "",
    fabricType: "",
    description: "", 
    imgUrls:[]
};

class OutfitPart extends React.Component {

    handleTypeChange = (event) =>{
        console.log(`event onChanged Type: ${event.value}`)



        this.setState (
            (prevState)=> {

                let outfitPartObj = {...prevState.outfitPartObj};
                outfitPartObj.type = event.value;    
                
                let state = this.generateStateObject(outfitPartObj)

                return state;
            }
        )        
    }     

    generateStateObject = (outfitPartObj)=>{
        console.log(outfitPartObj);
//        alert('here');

        let state = {};
        switch (outfitPartObj.type) {
            case 'top':
                state = {
                    outfitPartObj: outfitPartObj,
                    typeOptions: typeOptions,
                    categoryOptions: topCategoryOptions,
                    materialOptions: fabricDesignOptions,
                    materialTypeOptions: fabricTypeOptions,
                    brandOptions: brandOptions
                }
            break;

            case 'footwear':
                state = {
                    outfitPartObj: outfitPartObj,
                    typeOptions: typeOptions,                   
                    categoryOptions: footwearCategoryOptions,
                    materialOptions: fabricDesignOptions,
                    materialTypeOptions: footwearMaterialTypeOptions,
                    brandOptions: footwearBrandOptions
                }
            break;

            case 'bottom':
                state = {
                    outfitPartObj: outfitPartObj,
                    typeOptions: typeOptions,
                    categoryOptions: bottomCategoryOptions,
                    materialOptions: fabricDesignOptions,
                    materialTypeOptions: fabricTypeOptions,
                    brandOptions: brandOptions
                }
            break;

            default:
                alert('MISSING LOGIC!')
        }

        return state;
    }

    constructor (props) {
        alert('OutfitPart:constructor()');        
        super (props);


 
        // Generate a state object containing the correct options
        // based on the type of the outfitPart object.
        let state = this.generateStateObject(props.outfitPartObj);

        this.state = state;

        // Accomodating react-select control.
        // cuz only value is persisted in database and not the label
        // so we have to regen label-value in order to show default value 
        // selection.
        this.state.outfitPartObj.type 
            ? this.state.typeDefaultValue = this.xlateValueToValueLabel(this.state.outfitPartObj.type, this.state.typeOptions)
            : this.state.typeDefaultValue = '';
 //       console.log(this.state.typeDefaultValue)
 //       console.log('here0');

        this.state.outfitPartObj.brand 
            ? this.state.brandDefaultValue = this.xlateValueToValueLabel(this.state.outfitPartObj.brand, this.state.brandOptions)
            : this.state.brandDefaultValue = '';
        console.log(this.state.brandDefaultValue)
        console.log('here1');
//        alert('here2');

        this.state.outfitPartObj.fabricDesign
            ? this.state.fabricDesignDefaultValue = this.xlateValueToValueLabel(this.state.outfitPartObj.fabricDesign, this.state.materialOptions)
            : this.state.fabricDesignDefaultValue = '';
        console.log(this.state.fabricDesignDefaultValue);
        console.log('here2');
//        alert('here2');

        this.state.outfitPartObj.fabricType
            ? this.state.fabricTypeDefaultValue = this.xlateValueToValueLabel(this.state.outfitPartObj.fabricType, this.state.materialTypeOptions)
            : this.state.fabricTypeDefaultValue = '';

        this.state.outfitPartObj.category
            ? this.state.categoryDefaultValue = this.xlateListOfValuesToValueLabel(this.state.outfitPartObj.category, this.state.categoryOptions)
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
                                options = {this.state.typeOptions}
                                isMulti = {false}
                                defaultValue = {this.state.typeDefaultValue}
                            />
                        </div>
                    </div>                    

                    <div class = "page-section-header"> Images </div>

                    <ImagesSlider 
                        imageUrls = {this.state.outfitPartObj.imgUrls}
                        onImageUrlsChanged = {this.handleImgsChanged}
                    />
                   
                    <div class = "input-group">
                        <label>Category:</label>
                        <div class = "input-group__item-flex">
                            <Select
                                onChange = {this.handleCategoryChange}
                                options = {this.state.categoryOptions}
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
                            options = {this.state.brandOptions}
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
                                options = {this.state.materialOptions}
                            />    
                        </div>
                    </div>     

                    <div class = "input-group">
                        <label>Fabric Type:</label>
                        <div class = "input-group__item-flex">
                            <Select
                                defaultValue = {this.state.fabricTypeDefaultValue}
                                onChange = {this.handleFabricTypeChange}
                                options = {this.state.materialTypeOptions}
                            />    
                        </div>
                    </div>               

                    <div class = "input-group">                    
                        <label>Predominant Color</label>
                        <div class = "input-group__item-flex">
                            <Chrome
                                color={ this.state.outfitPartObj.predomColor }
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
                            defaultValue={this.state.outfitPartObj.colorDescription}                                                 
                        />
                    </div>

                    <div class = "input-group">
                        <label>Description:</label>
                        <textarea class = "input-group__item-flex"
                            onChange = {this.handleDescriptionChange}
                            defaultValue={this.state.outfitPartObj.description}
                        />
                    </div>



                </div>              

            </div>
        )
    }

    handlePredomColorChange= (color) => {
        //       alert(`color picker choice: ${color.hex}`);
        this.setState ( 
            (prevState)=>{
                let outfitPartObj = {...prevState.outfitPartObj};
                outfitPartObj.predomColor = color.hex;

                return {
                    outfitPartObj: outfitPartObj
                }                
            }
        );
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


    // This handler is called when the user clicks on the 'Save' button.
    // It kicks off the Redux process of saving the newly defined outfit part.
    handleSaveOutfitPart = ()=>{
        console.log(this.state.outfitPartObj);
        alert('clicked on Save button in outfitPart.');
        this.props.handleSaveButtonClick(this.state.outfitPartObj);
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

                let outfitPartObj = {...prevState.outfitPartObj};
                outfitPartObj.category = newArr;

                return {
                    outfitPartObj: outfitPartObj
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
        
 //        console.log(fd);
 //        alert('here');




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
                let outfitPartObj = {...prevState.outfitPartObj};
                outfitPartObj.fabricDesign = event.value;

                return {
                    outfitPartObj: outfitPartObj
                }
            }
        )        
    }       

    handleFabricTypeChange = (event) =>{
        console.log(`event onChanged FabricType: ${event.value}`)

        this.setState (
            (prevState)=> {
                let outfitPartObj = {...prevState.outfitPartObj};
                outfitPartObj.fabricType = event.value;

                return {
                    outfitPartObj: outfitPartObj
                }
            }
        )        
    }         


    handleBrandChange = (event) =>{
        console.log(`event onChanged Brand: ${event.value}`)

        this.setState (
            (prevState)=> {
                let outfitPartObj = {...prevState.outfitPartObj};
                outfitPartObj.brand = event.value;

                return {
                    outfitPartObj: outfitPartObj
                }
            }
        )        
    } 

    handleColorDescriptionChange = (event) =>{
        const val = event.target.value;
        console.log(event.target.value);
        console.log(`event colorDescription onChange Description: ${event}`);

        this.setState (
            (prevState)=> {
                let outfitPartObj = {...prevState.outfitPartObj};
                outfitPartObj.colorDescription = val;

                return {
                    outfitPartObj: outfitPartObj
                }
            }
        )           
    }    

    handleDescriptionChange = (event) =>{
        const val = event.target.value;
        console.log(event.target.value);
        console.log(`event onChange Description: ${event}`);

        this.setState (
            (prevState)=> {
                let outfitPartObj = {...prevState.outfitPartObj};
                outfitPartObj.description = val;

                return {
                    outfitPartObj: outfitPartObj
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
            (prevState)=> {

                let outfitPartObj = {...prevState.outfitPartObj};
                outfitPartObj.imgUrls = imgUrls;

                return {
                    outfitPartObj: outfitPartObj
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


