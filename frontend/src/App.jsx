import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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

  const isUserLoggedIn = AuthService.checkIsUserLoggedIn();

  return (
    <Router>
      <div>
      <Layout onLogout={handleLogout}>
          {isUserLoggedIn ? (
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/profile" element={<LoggedUserInformation />} />
              <Route path="/manageProducts" element={<ProductListAdmin />} />
              <Route path="manageProducts/:productId" element={<ProductEditAdmin />} />
              <Route path="/manageUsers" element={<UsersPageAdmin />} />
              <Route path="manageUsers/:userId" element={<UserEditAdmin />} />
              <Route path="/manageProducts/addNewProduct" element={<AddProductAdmin />} />
              <Route path="products/:productId" element={<ProductListDetails />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<LoginForm />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          )}
        </Layout>
      </div>
    </Router>
  );  
}


export default App
