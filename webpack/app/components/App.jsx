'use strict';

import React from 'react';
import { Link, RouteHandler, State as RouterState } from 'react-router';

const App = React.createClass({
  mixins: [RouterState],
  render() {
    return(
      <div>
        App App
        <br/>
        <ul>
          <li><Link to="test">Test</Link></li>
          <li><Link to="dashboard">Dashboard</Link></li>
        </ul>
        <RouteHandler/>
      </div>
    );
  }
});

export default App;
