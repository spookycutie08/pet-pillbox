import './NavNavbar.scss';

import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Nav, NavbarBrand, NavItem, NavLink } from 'reactstrap'


class NavNavbar extends React.Component {

    render() {
        return (
            <div className="NavNavbar">
                <Nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <NavbarBrand>Pet Pillbox</NavbarBrand>
                    <div className="collapse navbar-collapse">
                        <NavItem>
                            <NavLink tag={RRNavLink} to='/home'>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink} to='/pets'>Pets</NavLink>
                        </NavItem>
                    </div>
                </Nav>
            </div>
        );
    }
}

export default NavNavbar;