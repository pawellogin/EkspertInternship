import React from 'react';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';


function Layout({ children, onLogout }) {
  return (
    <div>
      <Navbar onLogout = {onLogout} />
      {children}
      {/*   <Footer /> */}
    </div>
  );
}


export default Layout;