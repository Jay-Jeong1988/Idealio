import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar(props) {


    return (
        <nav className="Navbar">
        {
            props.user ?
                [
                    <NavLink key={1} exact to="/" >🏡</NavLink>,
                    <NavLink key={2} exact to="/search_rests" >Rate Restaurants</NavLink>,
                    <NavLink key={3} exact to="/add_restaurant" >Add Restaurant</NavLink>,
                    <NavLink key={4} exact to="/restaurants" >Look Up Restaurants</NavLink>,
                ]
                :
                [   
                    <NavLink key={1} exact to="/" ><img id="home_icon" src="/assets/images/home_icon.png"/></NavLink>,
                    <NavLink key={4} exact to="/restaurants" >Look Up Restaurants</NavLink>,
                    <NavLink key={5} exact to="/sign_in" >Sign In</NavLink>,
                    <NavLink key={6} exact to="/sign_up" >Sign Up</NavLink>,
                ]
            
        }
        </nav>
    )
}

export default Navbar;
