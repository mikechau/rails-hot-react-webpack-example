'use strict';

import React from 'react';
import { Link, RouteHandler, State as RouterState } from 'react-router';

const Dashboard = React.createClass({
  mixins: [RouterState],
  render() {
    return(
      <div>
        Dashboard
        <br/>
        <ul>
          <li><Link to="test">Test</Link></li>
          <li><Link to="dashboard">Dashboard</Link></li>
        </ul>
        <RouteHandler/>
      </div>
    );
  },
  componentWillUnmount() {
    console.log('yes');
  }
});

export default Dashboard;
