import React, {useContext, useState} from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from "reactstrap";

import {UserContext} from "../context/UserContext";
import { Link } from "react-router-dom";

const NavBar = ({scroll}) => {

    const context = useContext(UserContext);

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar
        style = {{backgroundColor : "#192A56", marginBottom : "3rem"}}
        className = "navpad navbar-dark fixed-top text-responsive"
        id = "menubar"
        expand = "sm" 
        >
            <NavbarBrand tag = {Link} to = "/" className = {scroll === true ? "logosmall":"text-white logo"}>GitFireApp</NavbarBrand>
            <NavbarText className = "text-white h4" style = {{fontFamily : "Arial"}}>{
                context.user?.email ? "Welcome, " + context.user.email : ""
            }</NavbarText>
            <NavbarToggler onClick = {toggle}/>
            <Collapse isOpen = {isOpen} navbar>
                <Nav className = "ml-auto" navbar>
                    {
                        context.user ? (
                        <NavItem>
                            <NavLink onClick = {() => {context.setUser(null)}} className = "text-white h5">
                            Logout
                            </NavLink>
                        </NavItem>
                        ) : (
                        <>
                            <NavItem>
                                <NavLink tag = {Link} to = "/signup" className = "text-white h5">
                                    Signup
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag = {Link} to = "/signin" className = "text-white h5">
                                    Signin
                                </NavLink>
                            </NavItem>
                        </>
                        )
                    }
                    
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default NavBar;