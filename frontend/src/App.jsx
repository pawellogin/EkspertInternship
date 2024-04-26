import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as React from "react";
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import AuthService from './services/AuthService';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import RegisterForm from './components/RegisterForm';
import UsersPage from './components/UsersPage';
import ProductPageAdd from './components/AddProductForm';
import UserPage from './components/UserPage';
import {NextUIProvider} from "@nextui-org/react";
import ProductsPageAdmin from './components/ProductsPageAdmin';
import ProductPageAdmin from './components/ProductPageAdmin';

function App() {

  const handleLogout = () => {
    AuthService.logout();
    console.log("handel logout in app");
  }

  return (
    <Router>
      <div>
        <Layout onLogout = {handleLogout}>
          <Routes>
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/register" element={<RegisterForm />} />
          <Route exact path="" element={<Welcome/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/manageProducts" element={<ProductsPageAdmin/>}/>
          <Route path="manageProducts/:productId" element={<ProductPageAdmin/>}/>;
          <Route exact path="/manageUsers" element={<UsersPage/>}/>
          <Route path="manageUsers/:userId" element={<UserPage/>}/>
          <Route exact path="/manageProducts/addNewProduct" element={<ProductPageAdd/>}/>
          </Routes>
        </Layout>
      </div>
    </Router>
  );  
}


export default App
