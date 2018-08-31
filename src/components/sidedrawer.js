import {Link} from "react-router-dom";
import onClickOutside from "react-onclickoutside";

import React from "react";

class SideDrawer extends React.Component {

    constructor(props) {
        super(props);

    }

    handleClickOutside = () => {
 //       alert('onClickOutside() method called');
        this.props.clickedOutsideHandler();
      }

    render() {
        return (
            <nav className="sidedrawer">
                <ul>
                    <li>Outfits</li>
                    <li>Outfit Parts</li>  

                    <ul>
                        <li><Link to='/addtop'>Add Top</Link></li>
                        <li>Add Bottom</li>
                        <li>Add Footwear</li>
                        <li>Add Accessories</li>
                    </ul>   


                    <li>Search</li>
                    <li>Logout</li>
                </ul>
            </nav>
        )
    }
}

export default onClickOutside(SideDrawer);

