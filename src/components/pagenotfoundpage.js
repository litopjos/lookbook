/* -----------------------------------------------
FILE: PageNotFoundPage.js

DESCRIPTION:
This file implements a stateless functional React component
that renders the PageNotFound page.

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import React from "react";
import {Link} from "react-router-dom";


const PageNotFoundPage = (props)=>{
    console.log(props);
    return (

        <div>
            <h1> Page Not Found </h1>
            <Link to="/"> Go Back </Link>
        </div>
    );
}

export default PageNotFoundPage;