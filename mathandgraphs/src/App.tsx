import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './style.scss';

import StartPage from './components/pages/startpage'
import ProjectMenu from './components/pages/projectmenu'
import Header from './components/global/header'


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div id="pageContent">
        <Switch>
          <Route path="/projects">
            <ProjectMenu />
          </Route>
          <Route path="/">
            <StartPage />
          </Route>
        </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
