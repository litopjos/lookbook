/* -----------------------------------------------
FILE: .js

DESCRIPTION:


(c) 2018 Joselito Pe 
-------------------------------------------------- */
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimesCircle,faFilter} from "@fortawesome/free-solid-svg-icons";

const Toolbar = (props) => {
    return (
        <div>
            <div className="toolbar">
                <div className="container">        
                    <div className="toolbar__flexcontainer">
                        <div className='toolbar__flexgrow'/>
                        <div>
                            <a href='#'>
                                <FontAwesomeIcon className="fa-3x" color="green"  icon={faFilter} />
                            </a>       

                            <a href='#' onClick={props.handleSaveButtonClick}>
                                <FontAwesomeIcon className="fa-3x" color="green"  icon={faCheck} />
                            </a>

                            <a href='#' onClick={props.handleCancelButtonClick}>
                                <FontAwesomeIcon className="fa-3x" color="red"  icon={faTimesCircle} />
                            </a>                       
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default Toolbar;