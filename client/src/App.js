import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from './hoc/auth';
// pages for this product
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';
import UploadVideoPage from './components/views/VideoUploadPage/VideoUploadPage';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <NavBar />
        <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
          <Switch>
            <Route exact path='/' component={Auth(LandingPage, null)} />
            <Route exact path='/login' component={Auth(LoginPage, false)} />
            <Route
              exact
              path='/register'
              component={Auth(RegisterPage, false)}
            />
            <Route
              exact
              path='/video/upload'
              component={Auth(UploadVideoPage, true)}
            />
          </Switch>
        </div>
      </BrowserRouter>

      <Footer />
    </Suspense>
  );
}

export default App;
