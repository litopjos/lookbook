/* -----------------------------------------------
FILE: AddTopPage.js

DESCRIPTION:


(c) 2018 Joselito Pe 
-------------------------------------------------- */

import {connect} from "react-redux";

import Chrome from "react-color";
import React from "react";
import Select from "react-select";

import {outfitPartObj} from "./outfitpart.js";
import OutfitPart from "./outfitpart.js";
import {history} from "../routes/routes.js";
import {startAddOutfitPart} from "../redux/actions/actionsoutfitpart.js";
import ImagesSlider from "./imagesslider.js";
import axios from "axios";




class AddTopPage extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {

        return (
            <div>
                <OutfitPart 
                    outfitPartObj = {outfitPartObj}
                    pageTitle = "Add Top"
                />
            </div>
        )
    }

/*
        return (
            <div>
                <OutfitPart 
                    outfitPartObj = {outfitPartObj}
                    pageTitle = "Add Top"
                />
            </div>
        )
*/


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
