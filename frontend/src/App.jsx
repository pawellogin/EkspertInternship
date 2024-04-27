import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import AuthService from './services/AuthService';
import LoginForm from './components/LoginForm';
import LoggedUserInformation from './components/LoggedUserInformation';
import RegisterForm from './components/RegisterForm';
import UsersPageAdmin from './components/UsersPageAdmin';
import ProductPageAdd from './components/AddProductForm';
import UserPage from './components/UserPage';
import ProductsPageAdmin from './components/ProductsPageAdmin';
import ProductEditAdmin from './components/ProductEditAdmin';

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
          <Route exact path="/profile" element={<LoggedUserInformation/>}/>
          <Route exact path="/manageProducts" element={<ProductsPageAdmin/>}/>
          <Route path="manageProducts/:productId" element={<ProductEditAdmin/>}/>;
          <Route exact path="/manageUsers" element={<UsersPageAdmin/>}/>
          <Route path="manageUsers/:userId" element={<UserPage/>}/>
          <Route exact path="/manageProducts/addNewProduct" element={<ProductPageAdd/>}/>
          </Routes>
        </Layout>
      </div>
    </Router>
  );  
}


export default App
