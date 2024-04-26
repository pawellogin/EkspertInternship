import { DemoService } from "../services/DemoService"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import '../styles/Welcome.css'

const Welcome = () => {



  const isUserLoggedIn = AuthService.checkIsUserLoggedIn();

    return (
      <section className="welcome">
        {isUserLoggedIn ? (
          <>
          <h1 className="welcome-title">Welcome</h1>
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