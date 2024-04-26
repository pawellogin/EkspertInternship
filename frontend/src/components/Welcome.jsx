import { DemoService } from "../services/DemoService"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";

const Welcome = () => {



  const isUserLoggedIn = AuthService.checkIsUserLoggedIn();

    return (
      <section className="WelcomePage-section">
        {isUserLoggedIn ? (
          <>
          <p>Welcome</p>
          </>
        ) : (
          <>
          <h1>Welcome, please login or register:</h1>
          <Link type="button" className="btn btn-secondary" to="/login">Login</Link>
          <Link type="button" className="btn btn-secondary" to="/register">Register</Link>
          </>
        )}
      </section>
    );
  };

export default Welcome