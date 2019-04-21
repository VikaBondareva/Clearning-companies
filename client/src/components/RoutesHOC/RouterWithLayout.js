import React from 'react';
import Footer from '../Footer/Footer';
import Header from'../../containers/HeaderContainer';
import  {NavigationProfile} from '../Profile/SelectMenu';
import ErrorBoundary from '../common/ErrorBoundary/ErrorBoundary';
import '../App.css'

export const WithLayout = Component => props=>{
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

export const ProfileWithLayout = Component => props=>{
  return (
    <ErrorBoundary>
      <Header/>
          <main className="main">
              <NavigationProfile role={props.role} isSocial={props.isSocial}/>
              <Component {...props} />
          </main>
      <Footer/>
    </ErrorBoundary>
  );
};