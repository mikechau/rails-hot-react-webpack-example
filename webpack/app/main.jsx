import 'babel/polyfill';

import React from 'react';
import Router, { Route, DefaultRoute, RouteHandler } from 'react-router';
import App from './components/App';

import createAsyncHandler from './utils/createAsyncHandler';
import testPage from 'promise?global!./components/Test';
import dashboardPage from 'promise?global!./components/Dashboard';

var routes = (
  <Route name="app" handler={App} path="/">
    <Route name="test" handler={createAsyncHandler(testPage, 'TestPage')}/>
    <Route name="dashboard" handler={createAsyncHandler(dashboardPage, 'DashboardPage')}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.getElementById('content'));
});
