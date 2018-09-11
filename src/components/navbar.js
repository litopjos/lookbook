import React from "react";
import {connect} from "react-redux";


import {Link} from "react-router-dom";

import {HamburgerButton} from "./hamburgerbutton.js";

import {startLogout} from "../redux/actions/actionsauth";
import SideDrawer from "./sidedrawer.js";
//import { render } from "../../node_modules/@types/react-dom";

import Dropdown, { DropdownTrigger, DropdownContent} from 'react-simple-dropdown';

/*
var Dropdown = require("react-simple-dropdown");
var DropdownTrigger = Dropdown.DropdownTrigger;
var DropdownContent = Dropdown.DropdownContent;
*/

class NavBar extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            showSideDrawer: false
        }
    }
 
    render() {

        return (
            <header className="navbar">
                <nav className="container">

                    <ul>

                        <div className="navbar__logo">
                            <Link to="/">Lookbook</Link>  
                        </div>      

                        <div className="navbar__spacer" />

                        <li className="navbar__navitem"><Link to='#'>Outfits</Link>
                            <ul className='dropdown-1'>
                                <li><Link to='/alloutfits'>Show All</Link></li>
                                <li><Link to='/addnewoutfit'>Add Outfit</Link></li>
                            </ul>                        
                        </li>

                        <li className="navbar__navitem"><Link to='#'>Outfit Parts</Link>
                            <ul className='dropdown-1'>
                                <li><Link to='/allparts'>Show All</Link></li>
                                <li><Link to='/addtop'>Add Top</Link></li>
                                <li><Link to='#'>Add Bottom</Link></li>
                                <li><Link to='#'>Add Footwear</Link></li>
                                <li><Link to='#'>Add Accessories</Link></li>
                            </ul>    
                        </li>           
                        
                        <li className="navbar__navitem"><Link to='#'>Search</Link></li>
                        <li className="navbar__navitem"><Link to='#'>Logout</Link></li>
                    </ul>
                </nav>
                
            </header>
        );
/*
        return (
            <header className="navbar">
        
                    <nav className="navbar__navigation">

                        <div className="navbar__spacer" />

                        <div className="navbar__nav-items">
                            <ul>
                                <li><Link to='#'>Outfits</Link></li>

                                <li><Link to='#'>Outfit Parts</Link>
                                    <ul className='dropdown-1'>
                                        <li><Link to='/allparts'>Show All Outfit Parts</Link></li>
                                        <li><Link to='/addtop'>Add Top</Link></li>
                                        <li><Link to='#'>Add Bottom</Link></li>
                                        <li><Link to='#'>Add Footwear</Link></li>
                                        <li><Link to='#'>Add Accessories</Link></li>
                                    </ul>    
                                </li>           
                                
                                <li><Link to='#'>Search</Link></li>
                                <li><Link to='#'>Logout</Link></li>
                            </ul>
                        </div>                        


                    </nav>
                
            </header>
        );
*?


 /*   
            return (
            <header className="navbar">
                <div className="container">
                    <nav className="navbar__navigation">
                        <div className="toolbar__hamburger">
                            <HamburgerButton handlerOnClick = {this.handlerHamburgerButtonClick} />
                        </div>

                        <div className="toolbar__logo">
                            <Link to="/">
                                <h1> Lookbook </h1>
                            </Link>            
                        </div>
                        
                        <div className="navbar__spacer" />


                        <div className="toolbar__nav-items">
                            <ul>
                                <Dropdown>
                                    <DropdownTrigger>Profile</DropdownTrigger>
                                    <DropdownContent>
                                        <ul>
                                            <li>Lito</li>
                                            <li>Lito</li>
                                            <li>Lito</li>
                                        </ul>
                                    </DropdownContent>
                                    <DropdownContent>
                                        <ul>
                                            <li>Lito</li>
                                            <li>Lito</li>
                                            <li>Lito</li>
                                        </ul>
                                    </DropdownContent>                                
                                </Dropdown>

                                <li>Outfits</li>
                                <li>Outfit Parts</li> 
                                <li>Search</li>
                                <li>
                                    <button 
                                        className="button button--link" 
                                        onClick={()=>this.props.Logout(this.props.authProvider)}
                                    >
                                        Logout
                                    </button>
                                </li>

                            </ul>
                        </div>

                        <div className="toolbar__linebreak" />

                       {this.state.showSideDrawer&& <SideDrawer clickedOutsideHandler = {this.handlerClickedOutsideSideDrawer}/>}

                    </nav>
                </div>
            </header>
        );
    */
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

const MapStateToProps = (state)=>{
    //    alert("MapStateToProps call in LoginPage");
    //    alert(!! state.auth.uid);
        return {
            isAuthenticated: !! state.auth.uid,
            authProvider: state.auth.provider,
            uid: state.auth.uid
        }
    }
    
const MapDispatchToProps = (dispatch)=>(
    {
        Logout: (provider)=>{dispatch(startLogout(provider))}
    }
)

const connectedNavBar = connect(MapStateToProps,MapDispatchToProps)(NavBar);

export {connectedNavBar as NavBar};


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
