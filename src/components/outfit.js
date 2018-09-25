/* -----------------------------------------------
FILE: outfit.js

DESCRIPTION:

props:
------

outfitObj => 
pageTitle => 
handleSaveButtonClick =>
handleCancelButtonClick =>

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import React from "react";
import Select from "react-select";

import {PageTitleHeader} from "./pagetitleheader";
import ImagesSlider from "./imagesslider";
import Toolbar from "./toolbar";

import {outfitCategoryOptions} from "./outfitpartoptions";

class Outfit extends React.Component {

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

    constructor(props){
        super(props);
//        alert('Outfit:constructor()');

        let categoryDefaultValue = this.xlateListOfValuesToValueLabel (props.outfitObj.category,outfitCategoryOptions);
        this.state = {
            outfitObj: props.outfitObj,
            categoryDefaultValue:categoryDefaultValue
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
    
                </div>
           </div>
        )
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
}

export default Outfit;