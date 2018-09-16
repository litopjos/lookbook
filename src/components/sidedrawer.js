import {Link} from "react-router-dom";
import onClickOutside from "react-onclickoutside";

import React from "react";
import Dropdown, { DropdownTrigger, DropdownContent} from 'react-simple-dropdown';


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

                    <Dropdown>
                        <DropdownTrigger>Outfit Parts</DropdownTrigger>
                        <DropdownContent>
                            <ul>
                                <li><Link to='/allparts'>Show All Outfit Parts shoobeedoobe do</Link></li>
                                <li><Link to='/addpart'>Add Top</Link></li>
                                <li>Add Bottom</li>
                                <li>Add Footwear</li>
                                <li>Add Accessories</li>
                            </ul>   
                        </DropdownContent>
                        <DropdownContent>
                        <ul>
                            <li><a href="#">Lito</a></li>
                            <li><a href="#">Pe</a></li>
                        </ul>
                    </DropdownContent>                        
                    </Dropdown>

                    <li>Search</li>
                    <li>Logout</li>
                </ul>

                <Dropdown>
                    <DropdownTrigger>Profile</DropdownTrigger>
                    <DropdownContent>
                        <ul>
                            <li><a href="#">Lito</a></li>
                            <li><a href="#">Pe</a></li>
                        </ul>
                    </DropdownContent>
                </Dropdown>
            
            </nav>
        )
    }
}

export default onClickOutside(SideDrawer);

