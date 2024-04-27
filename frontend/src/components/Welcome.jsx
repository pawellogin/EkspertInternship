import { DemoService } from "../services/DemoService"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import '../styles/Welcome.css'
import ProductList from "./ProductsList";

const Welcome = () => {
  
  const isUserLoggedIn = AuthService.checkIsUserLoggedIn();

    return (
      <section className="welcome">
        {isUserLoggedIn ? (
          <>
          <ProductList/>
          </>
        ) : (
          <>
          <h1 className="welcome-title">Welcome, please login or register:</h1>
          <div className="welcome-links">
            <Link type="button" className="btn btn-secondary welcome-login-link" to="/login">Login</Link>
            <Link type="button" className="btn btn-secondary welcome-register-link" to="/register">Register</Link>
          </div>
          </>
        )}
      </section>
    );
  };

export default Welcome