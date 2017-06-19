import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Login from './src/components/login';
import CarSelector from './src/components/carSelector';
import RouteSelector from './src/components/routeSelector';
import Map from './src/components/map';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key="login" component={Login} />
          <Scene key="carSelector" component={CarSelector} />
          <Scene key="routeSelector" component={RouteSelector} />
          <Scene key="map" component={Map} />
        </Scene>
      </Router>
    );
  }
}
