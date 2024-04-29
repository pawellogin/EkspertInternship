import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'

import AuthService from '../services/AuthService'; // Import AuthService

const Navbar = ({ onLogout }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        setCurrentUser(user); // Set current user when component mounts
    }, []);
  

    const getRoles = () => {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser && currentUser.authorities && currentUser.authorities.length > 0) {
          const role = currentUser.authorities[0].authority;
          // console.log(role);
          return role;
      } else {
          console.log("No authorities found for the current user.");
          return null;
      }
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand text-light" to="/">My App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {AuthService.getCurrentUser() ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/profile">{AuthService.getCurrentUserUsername()}</Link>
                  </li>

                  <li>
                    <Link className="nav-link text-light" to="/cart">Cart</Link>
                  </li>

                  {getRoles() === 'ROLE_ADMIN' && (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link text-light" to="/manageProducts">Manage Products</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link text-light" to="/manageUsers">Manage Users</Link>
                      </li>
                    </>
                  )}
                  
                  <li className="nav-item">
                    <Link className="nav-link text-light" onClick = {onLogout} to="/login" >Logout</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/login">Login</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/register">Register</Link>
                    </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>  
    );
  }

export default Navbar;
