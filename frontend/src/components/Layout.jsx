import React from 'react';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';


function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      {/*   <Footer /> */}
    </div>
  );
}


export default Layout;