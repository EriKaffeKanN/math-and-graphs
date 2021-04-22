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
import TestProject from './components/projects/testproject/testproject';
import FractalTree from './components/projects/fractal-tree/fractaltree';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/projects/fractaltree">
            <FractalTree width={1200} height={500} />
          </Route>
          <Route path="/projects/testproject">
            <TestProject width={1200} height={400} />
          </Route>
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
