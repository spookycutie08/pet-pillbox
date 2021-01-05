import './NavNavbar.scss';

import firebase from 'firebase'

import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'


class NavNavbar extends React.Component {
    state = {
        isOpen: false,
    }

    logoutEvent = (e) => {
        e.preventDefault();
        firebase.auth().signOut();
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    closeToggle = () => {
        this.setState({ isOpen: false });
    }

    render() {
        const { isOpen } = this.state;

        const showLogout = () => {
            const { authed } = this.props;
            if (authed) {
                return (
                    <NavItem>
                        <NavLink onClick={this.logoutEvent}>Logout</NavLink>
                    </NavItem>
                )
            }
        };

        return (
            <div className="NavNavbar">
                <Navbar className="navbar-custom" expand="sm">
                    <NavbarToggler className="toggler-custom navbar-dark" onClick={this.toggle} />
                    <NavbarBrand href="/">Pet Pillbox</NavbarBrand>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink tag={RRNavLink} to='/home' onClick={this.closeToggle}>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRNavLink} to='/pets' onClick={this.toggle}>Pets</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRNavLink} to='/medlist/pet/1'  onClick={this.toggle}>Test</NavLink>
                            </NavItem>
                            {showLogout()}
                        </Nav>

                    </Collapse>
                </Navbar>

                {/* <Navbar className="navbar-custom">
                    <NavbarToggler className="font-pale" onClick={this.toggle} />
                    <NavbarBrand>Pet Pillbox</NavbarBrand>
                    <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                    <div className="collapse navbar-collapse">
                        <NavItem>
                            <NavLink tag={RRNavLink} to='/home'>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink} to='/pets'>Pets</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink} to='/addMed/2029'>Test</NavLink>
                        </NavItem>
                        {showLogout()}
                        </div>
                        </Nav>
                        </Collapse>
                </Navbar> */}
            </div>
        );
    }
}

export default NavNavbar;