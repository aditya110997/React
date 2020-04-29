import React from "react";
import {Container} from "reactstrap";

const Footer = () => {
    return (
    <Container
    style = {{backgroundColor : '#2C3335', marginTop : "300px"}}
    fluid
    tag = "footer"
    className = "text-center bg-dark text-white text-uppercase fixed-bottom p-3"
    >
        Github Search App With Firebase
    </Container>)
}

export default Footer;