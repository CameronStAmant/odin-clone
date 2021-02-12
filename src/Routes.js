import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Curriculum from './components/Curriculum';
import FoundationsPathCourses from './components/FoundationsPathCourses';
import FoundationsCourse from './components/FoundationsCourse';
import JavaScriptPathCourses from './components/JavaScriptPathCourses';
// import JavaScriptCourse from './components/JavaScriptCourse';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/curriculum" component={Curriculum} />
        <Route
          exact
          path="/curriculum/foundations"
          component={FoundationsPathCourses}
        />
        <Route
          exact
          path="/courses/foundations"
          component={FoundationsCourse}
        />
        <Route
          exact
          path="/curriculum/javascript"
          component={JavaScriptPathCourses}
        />

        {/* <Route exact path="/courses/javascript" component={JavaScriptCourse} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
