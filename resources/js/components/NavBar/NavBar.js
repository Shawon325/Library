import React, { Component, Fragment } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../../App.css'

export class NavBar extends Component {
    render() {
        return (
            <Fragment>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand><NavLink to="/" className="navTitle">React-Library</NavLink></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Book" id="collasible-nav-dropdown">
                                <NavDropdown.Item><NavLink to="/book_category"  className="navList">Book Category</NavLink></NavDropdown.Item>
                                <NavDropdown.Item><NavLink to="/book_list"  className="navList">Book List</NavLink></NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Member" id="collasible-nav-dropdown">
                                <NavDropdown.Item><NavLink to="/member_type"  className="navList">Member Type</NavLink></NavDropdown.Item>
                                <NavDropdown.Item><NavLink to="/member_list"  className="navList">Member List</NavLink></NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link to="#deets">More deets</Nav.Link>
                            <Nav.Link eventKey={2} to="#memes">
                                Dank memes
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Fragment>
        )
    }
}

export default NavBar;



