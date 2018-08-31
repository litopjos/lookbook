import React from "react";


const handleClick = ()=>{
    alert('clicked');
}

export const HamburgerButton = props => {
//    alert(`hamburger ${props.handlerOnClick}`);
    return (
        <button 
            className="hamburger-button"
            onClick={props.handlerOnClick}
        >
            <div className="hamburger-button__line" />
            <div className="hamburger-button__line" />
            <div className="hamburger-button__line" />
        </button>
        
    );
}
