/* -----------------------------------------------
FILE: outfit.js

DESCRIPTION:

props:
-----

outfitObj => 
pageTitle => 

handleSaveButtonClick =>
handleCancelButtonClick =>

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {connect} from "react-redux";
import React from "react";
import Select from "react-select";
import ExifOrientationImg from 'react-exif-orientation-img';


import {PageTitleHeader} from "./pagetitleheader";
import ImagesSlider from "./imagesslider";
import ObjsSlider from "./objsslider";
import Toolbar from "./toolbar";

import {outfitCategoryOptions} from "./outfitpartoptions";

class Outfit extends React.Component {
    constructor(props){
        super(props);
//        alert('Outfit:constructor()');

        let categoryDefaultValue = this.xlateListOfValuesToValueLabel (props.outfitObj.category,outfitCategoryOptions);

        // Search for the top objs
        let topObjs = this.buildListOfSelPartObjs(props.outfitObj.topPartIDs,props.partObjs);

        // Search for the bottom objs
        let bottomObjs = this.buildListOfSelPartObjs(props.outfitObj.bottomPartIDs,props.partObjs);

        // Search for the footwear objs
        let footwearObjs = this.buildListOfSelPartObjs(props.outfitObj.footwearPartIDs,props.partObjs);

        this.state = {
            outfitObj: props.outfitObj,
            topObjs,
            bottomObjs,
            footwearObjs,
            categoryDefaultValue,
        }
    }

    render() {
//        alert('Outfit:render()');

        return (
            <div>
                <div className="navbar__offset"/>
                <div className="container"> 
                    <PageTitleHeader  title={this.props.pageTitle}/>

                    <Toolbar
                        handleSaveButtonClick = {this.props.handleSaveButtonClick}
                        handleCancelButtonClick = {this.props.handleCancelButtonClick}
                    />

                    <div class = "input-group">
                        <label>Category:</label>
                        <div class = "input-group__item-flex">
                            <Select
                                onChange = {this.handleCategoryChange}
                                options = {outfitCategoryOptions}
                                isMulti = {true}
                                defaultValue = {this.state.categoryDefaultValue}
                            />
                        </div>
                    </div>

                    <div class = "input-group">
                        <label>Description:</label>
                        <textarea class = "input-group__item-flex"
                            onChange = {this.handleDescriptionChange}
                            defaultValue={this.state.outfitObj.description}
                        />
                    </div>                    


                    <div class = "page-section-header"> Outfit Images: </div>
                    <ImagesSlider
                        imageUrls = {this.state.outfitObj.imgUrls} 
                        onImageUrlsChanged = {this.onOutfitImageUrlsChanged}
                    />

                    <div class = "page-section-header"> Selected Top: </div>
                    <ObjsSlider
                        objList = {this.state.topObjs} 
                        onObjListChanged = {this.onOutfitImageUrlsChanged}
                    /> 

                    <div class = "page-section-header"> Selected Bottom: </div>
                    <ObjsSlider
                        objList = {this.state.bottomObjs} 
                        onObjListChanged = {this.onOutfitImageUrlsChanged}
                    />                     

                    <div class = "page-section-header"> Selected Footwear: </div>
                    <ObjsSlider
                        objList = {this.state.footwearObjs} 
                        onObjListChanged = {this.onOutfitImageUrlsChanged}
                    />                    
                    
                </div>
           </div>
        )
    }

    buildListOfSelPartObjs = (selPartIDs,listParts)=>{
        let selPartsObjs = [];
        selPartIDs.forEach(
            (id)=>{
 //               alert(`Outfit:buildListOfSelPartObjs(): id=${id}`);
                let part_obj = listParts.find(
                    (obj)=>{
//                        alert(`listParts id = ${obj.id}`);
                        if (obj.id === id)
                            return true;
                    }
                )   
                
                if (part_obj) {
                //    console.log(part_obj);
                //    alert('here3');
                    selPartsObjs.push(part_obj);
                }
                else
                    alert('LOGIC ERROR: couldnt find part obj');
            }
        )  
        return selPartsObjs;     
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
    handleDescriptionChange = (event) =>{
        const val = event.target.value;
        console.log(event.target.value);
        console.log(`event onChange Description: ${event}`);

        this.setState (
            (prevState)=> {
                let outfitObj = {...prevState.outfitObj};
                outfitObj.description = val;

                return {
                    outfitObj: outfitObj
                }
            }
        )           
    }    


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

                let outfitObj = {...prevState.outfitObj};
                outfitObj.category = newArr;

                return {
                    outfitObj: outfitObj
                }
            }
        )
    }        
    
}

const MapStateToProps = (state)=>{
    return {
        partObjs : state.outfit_parts
    }
}

const connectedOutfit = connect(MapStateToProps,undefined)(Outfit);

export default connectedOutfit;

