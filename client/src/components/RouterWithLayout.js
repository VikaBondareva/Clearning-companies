import React from 'react';
import Footer from './Footer/Footer';
import Header from './Header/HeaderComponent';
import './App.css'

const RouteWithLayout = Component => props=>{
    return (
      <div>
        <Header/>
            <main className="main">
                <Component {...props} />
            </main>
        <Footer/>
      </div>
    );
};

export default RouteWithLayout;