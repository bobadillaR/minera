import React, { Component } from 'react';
import { View, Image } from 'react-native';
import MapView from 'react-native-maps';

import BusIcon from '../images/bus.png';
import MinerIcon from '../images/minerTruck.png';


export default class Router extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: -33.35,
        longitude: -70.55,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      bus: { latitude: -33.389646, longitude: -70.547886 },
      miner: { latitude: -33.403888, longitude: -70.586463 },
      busInitial: { latitude: -33.389646, longitude: -70.547886 },
      minerInitial: { latitude: -33.403888, longitude: -70.586463 },
      iteration: 1000,
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(position =>
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        myPosition: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        counter: 0,
      }),
    );
  }

  componentDidMount() {
    const { iteration, busInitial, minerInitial } = this.state;
    const diffLat = busInitial.latitude - minerInitial.latitude;
    const diffLng = busInitial.longitude - minerInitial.longitude;
    console.log(busInitial);
    setInterval(() => this.setState(Math.floor(this.state.counter / iteration) % 2 === 0 ?
    {
      bus: {
        latitude: this.state.bus.latitude - (diffLat / iteration),
        longitude: this.state.bus.longitude - (diffLng / iteration),
      },
      miner: {
        latitude: this.state.miner.latitude + (diffLat / iteration),
        longitude: this.state.miner.longitude + (diffLng / iteration),
      },
      counter: this.state.counter + 1,
    }
    :
    {
      bus: {
        latitude: this.state.bus.latitude + (diffLat / iteration),
        longitude: this.state.bus.longitude + (diffLng / iteration),
      },
      miner: {
        latitude: this.state.miner.latitude - (diffLat / iteration),
        longitude: this.state.miner.longitude - (diffLng / iteration),
      },
      counter: this.state.counter + 1,
    }), 100);
  }

  componentWillUnmount() {
    // navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    const { region, miner, bus, myPosition } = this.state;
    console.log(Math.floor(this.state.counter / this.state.iteration) % 2);
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={region}
          showsMyLocationButton
          showsCompass
          onRegionChange={regionAux => this.setState({ region: regionAux })}
          loadingEnabled
        >
          <MapView.Marker coordinate={myPosition} title="titulo" />
          <MapView.Marker coordinate={miner} style={{ height: 30, width: 30, position: 'absolute', left: -15, top: -15 }} >
            <Image source={MinerIcon} style={{ height: 30, width: 30 }} />
          </MapView.Marker>
          <MapView.Marker coordinate={bus} style={{ height: 30, width: 30, position: 'absolute', left: -15, top: -15 }} >
            <Image source={BusIcon} style={{ height: 30, width: 30 }} />
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}
