import React, { useEffect } from 'react';
import './App.css';
import Camera from './components/Camera/Camera';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Preview from './components/Preview/Preview';
import Chats from './components/Chats/Chats';
import View from './components/View/View';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import Login from './components/Login/Login';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid
        }));
      } else {
        dispatch(logout());
      }
    })
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? 
          <Login />
        :
        <>
          <img className="app__logo" src="https://www.logo.wine/a/logo/Snapchat/Snapchat-Logo.wine.svg" alt="" />
          <div className="app__body">
            <div className="app__body__background">
              <Switch>
                <Route exact path="/chats">
                  <Chats />
                </Route>
                <Route exact path="/chats/view">
                  <View />
                </Route>
                <Route exact path="/">
                  <Camera />
                </Route>
                <Route exact path="/preview">
                  <Preview />
                </Route>
              </Switch>
            </div>
          </div>
        </>}
      </Router>
    </div>
  );
}

export default App;
