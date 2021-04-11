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
import ComplexTransformationGrapher from './components/projects/complexgrapher/complextransformationgrapher';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/projects/complexgrapher">
            <ComplexTransformationGrapher width={1200} height={400}/>
          </Route>
          <Route path="/projects">
            <ProjectMenu />
          </Route>
          <Route path="/">
            <StartPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
