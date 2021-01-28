import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Curriculum from './components/Curriculum';
import PathCourses from './components/PathCourses';
import FoundationsCourse from './components/FoundationsCourse';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/curriculum" component={Curriculum} />
        <Route exact path="/curriculum/foundations" component={PathCourses} />
        <Route
          exact
          path="/courses/foundations"
          component={FoundationsCourse}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
