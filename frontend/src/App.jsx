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
import UsersPageAdmin from './components/UsersListAdmin';
import AddProductAdmin from './components/AddProductAdmin';
import UserEditAdmin from './components/UserEditAdmin';
import ProductListAdmin from './components/ProductsListAdmin';
import ProductEditAdmin from './components/ProductEditAdmin';
import ProductListDetails from './components/ProductListDetails';
import Cart from './components/Cart';

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
          <Route exact path="/manageProducts" element={<ProductListAdmin/>}/>
          <Route path="manageProducts/:productId" element={<ProductEditAdmin/>}/>;
          <Route exact path="/manageUsers" element={<UsersPageAdmin/>}/>
          <Route path="manageUsers/:userId" element={<UserEditAdmin/>}/>
          <Route exact path="/manageProducts/addNewProduct" element={<AddProductAdmin/>}/>
          <Route path="products/:productId" element={<ProductListDetails/>}/>
          <Route exact path="/cart" element={<Cart/>}/>
          </Routes>
        </Layout>
      </div>
    </Router>
  );  
}


export default App
