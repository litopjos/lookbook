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


class OutfitPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id :            props.defaultOutfit ? props.defaultOutfit.id : "default id",
            title:          props.defaultOutfit ? props.defaultOutfit.title : "default title",
            notes:          props.defaultOutfit ? props.defaultOutfit.notes : "default notes",
            imageUrls:      props.defaultOutfit ? props.defaultOutfit.imageUrls : []
        };
    }

    onSubmit = (e)=> {
  //      alert('OutfitPage onSubmit()');
        e.preventDefault();
        this.props.onSubmit(this.state);
    } 

    onChangeTitle = (e)=> {
        const title = e.target.value;
        this.setState(()=>({title}));
    }

    render () {
        return (
            <div>
                <form 
                    onSubmit = {this.onSubmit} >
                
                    <input
                        type= "text"
                        placeholder = "id"
                        value = {this.state.id}
                    />

                    {
                        this.state.imageUrls.length > 0  ?
                            this.state.imageUrls.map ((imgUrl)=>{
                                console.log(`img url: ${imgUrl}`);
                                return (<img src={imgUrl}/>);
                            }) :
                            (<p>no images </p>)
                    }

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

                    <button> Submit </button>
                >
                
                </form>
            </div>
            )

        }

}

export default OutfitPage;
