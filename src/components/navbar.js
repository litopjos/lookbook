import React from "react";
import {Link} from "react-router-dom";

import {HamburgerButton} from "./hamburgerbutton.js";

import {Navbar, Nav,  NavDropdown, MenuItem, NavItem} from "react-bootstrap";
import SideDrawer from "./sidedrawer.js";
//import { render } from "../../node_modules/@types/react-dom";


export class NavBar extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            showSideDrawer: false
        }
    }
 
    render() {
        return (
            <header className="toolbar">

                <nav className="toolbar__navigation">

                    <div className="toolbar__hamburger">
                        <HamburgerButton handlerOnClick = {this.handlerHamburgerButtonClick} />
                    </div>

                    <div className="toolbar__logo">
                        <Link to="/">
                            <h1> Lookbook </h1>
                        </Link>            
                    </div>
                    
                    <div className="toolbar__spacer" />


                    <div className="toolbar__nav-items">
                        <ul>
                            <li>Outfits</li>
                            <li>Outfit Parts</li> 
                            <li>Search</li>
                            <li>Logouts</li>
                        </ul>
                    </div>


                    <div className="toolbar__linebreak" />

                    {this.state.showSideDrawer&& <SideDrawer clickedOutsideHandler = {this.handlerClickedOutsideSideDrawer}/>}

                </nav>
            </header>
        );
    }


    
    handlerClickedOutsideSideDrawer = ()=> {
//        alert('clicked outside SideBar in navbar.js');
        this.setState( () => ({showSideDrawer: false}) );
    }

    handlerHamburgerButtonClick = ()=>{
//        alert('Hamburger button clicked in navbar.js');
        this.setState( () => ({showSideDrawer: true}) );
    }
}


/*
export class NavBar extends React.Component {

    render() {

        return (


           <Navbar inverse fixedTop>

                <Navbar.Header> 
                    <Navbar.Toggle/>
                    <Navbar.Brand>
                        <Link to="/" >Lookbook </Link>
                    </Navbar.Brand>
                </Navbar.Header>

                <Navbar.Collapse>

                    <Nav>
                        <NavDropdown title="Outfits">
                            <MenuItem>Show All Outfits</MenuItem>
                            <MenuItem>Add Outfit</MenuItem>
                        </NavDropdown>

                        <NavDropdown title="Outfit Parts">
                            <MenuItem>Show All Outfit Parts</MenuItem>
                            <MenuItem>Add Top</MenuItem>
                            <MenuItem>Add Bottom</MenuItem>
                            <MenuItem>Add Footwear</MenuItem>
                            <MenuItem>Add Accessories</MenuItem>
                        </NavDropdown>           
                    </Nav>

                    <Nav pullRight>
                        <NavItem>Search</NavItem>
                        <NavItem>Logout</NavItem>
                    </Nav>

                </Navbar.Collapse>

           </Navbar>

           
        );
    }

}
*/
