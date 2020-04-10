import React, { useState } from 'react';
import { userContext } from './context';
import _ from 'lodash';
import './App.css';
import Aside from './layouts/Aside';
import Home from './components/Home';

function App() {
  const [ user, setUser ] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [showAside, setShowAside] = useState(false);

  const persistUser = (_user)=>{
    setUser(_user);
    localStorage.setItem("user", JSON.stringify(_user));
  };

  const value = {
    user,
    setUser : persistUser
  };


  const openAside = () =>{
    setShowAside(!showAside);
  }

  const closeAside = () =>{
    setShowAside(false);
  }

  return (
    <userContext.Provider value={value}>
      <div className="float" onClick={ () =>{setShowAside (true)}}>
        <i className="fas fa-bars my-float"></i>
      </div>
      {
        (showAside || _.isEmpty(user)) && <Aside closeAside={closeAside}/>
      }

      { !_.isEmpty(user) ?
        <Home showAside={showAside} openAside={openAside}/>:
        <div className="home empty"></div>
      }

    </userContext.Provider>
  );
}

export default App;
