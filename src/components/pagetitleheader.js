import React from "react";

export const PageTitleHeader = (props)=>{
    return (
        <div className='page-style__header'>
            <h2>{props.title}</h2>
        </div>
    );
}