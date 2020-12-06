import React from 'react'
import {Navbar,Container } from 'react-bootstrap'

const Header = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand>React Todo App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
                </Container>
                  
            </Navbar>
        </div>
    )
}

export default Header
