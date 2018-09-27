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

import {outfitCategoryOptions} from "./outfitpartoptions";
import {PageTitleHeader} from "./pagetitleheader";
import {isUserGuest,xlateListOfValuesToValueLabel} from "./utils";
import ImagesSlider from "./imagesslider";
import ObjsSlider from "./objsslider";
import Toolbar from "./toolbar";



export const defaultOutfitObj = {
    id: "",
    category: [],
    description: "",
    imgUrls: [], 
    topPartIDs: [],    
    bottomPartIDs:[],                
    footwearPartIDs:[],
};

class Outfit extends React.Component {

    handleImgsChanged = (imgUrls) => {
        console.log (`Images: ${imgUrls}`);
        alert('Outfit:handleImgsChanged()');

        this.setState (
            (prevState)=> {

                let outfitObj = {...prevState.outfitObj};
                outfitObj.imgUrls = imgUrls;

                return {
                    outfitObj: outfitObj
                }
            }
        )               
    }

    handleSaveButtonClick= ()=>{
        alert(`Outfit:handleSaveButtonClick()`);
        this.props.handleSaveButtonClick(this.state.outfitObj);
    }

    constructor(props){
        super(props);
//        alert('Outfit:constructor()');

        let categoryDefaultValue = xlateListOfValuesToValueLabel (props.outfitObj.category,outfitCategoryOptions);

        // Search for the top objs
        let topObjs = [];
        if(props.outfitObj.topPartIDs)
            topObjs= this.buildListOfSelPartObjs(props.outfitObj.topPartIDs,props.partObjs);

        // Search for the bottom objs
        let bottomObjs = [];
        if(props.outfitObj.bottomPartIDs)
            bottomObjs=this.buildListOfSelPartObjs(props.outfitObj.bottomPartIDs,props.partObjs);

        // Search for the footwear objs
        let footwearObjs = [];
        if(props.outfitObj.footwearPartIDs)
            footwearObjs=this.buildListOfSelPartObjs(props.outfitObj.footwearPartIDs,props.partObjs);

        this.state = {
            outfitObj: props.outfitObj,
            topObjs,
            bottomObjs,
            footwearObjs,
            categoryDefaultValue,
        }
    }

    render() {
 //       alert('Outfit:render()');

        return (
            <div>
                <div className="navbar__offset"/>
                <div className="container"> 
                    <PageTitleHeader  title={this.props.pageTitle}/>

                    <Toolbar
                        handleSaveButtonClick = {this.handleSaveButtonClick}
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
                        onImageUrlsChanged = {this.handleImgsChanged}
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

