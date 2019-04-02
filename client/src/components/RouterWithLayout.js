import React from 'react';
import Footer from './Footer/Footer';
import Header from'../containers/HeaderContainer';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import './App.css'

const RouteWithLayout = Component => props=>{
    return (
      <ErrorBoundary>
        <Header/>
            <main className="main">
                <Component {...props} />
            </main>
        <Footer/>
      </ErrorBoundary>
    );
};

export default RouteWithLayout;