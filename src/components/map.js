import React, { Component } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import MapView from 'react-native-maps';
import { Icon } from 'react-native-elements';

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
      vehicles: [
        { name: 'Bus 1',
          position: { latitude: -33.389646, longitude: -70.547886 },
          image: BusIcon,
        },
        { name: 'Truck 1',
          position: { latitude: -33.403888, longitude: -70.586463 },
          image: MinerIcon,
        },
      ],
      iteration: 1000,
      lines: {},
      circle: [
        { latitude: -33.393687, longitude: -70.559315 },
        { latitude: -33.400444, longitude: -70.577871 },
      ],
      polyline: [
        [
          { latitude: -33.388625, longitude: -70.548583 },
          { latitude: -33.391106, longitude: -70.547253 },
        ],
        [
          { latitude: -33.403306, longitude: -70.586978 },
          { latitude: -33.405321, longitude: -70.586109 },
        ],
      ],
      counter: 0,
      active: 0,
      alert: false,
      problems: [],
    };
  }

  componentWillMount() {
    const { iteration, vehicles } = this.state;
    const diffLat = vehicles[0].position.latitude - vehicles[1].position.latitude;
    const diffLng = vehicles[0].position.longitude - vehicles[1].position.longitude;
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
      }),
    );
    setInterval(() => this.setState(Math.floor(this.state.counter / iteration) % 2 === 0 ?
    {
      vehicles: [
        {
          name: 'Bus 1',
          position: {
            latitude: this.state.vehicles[0].position.latitude - (diffLat / iteration),
            longitude: this.state.vehicles[0].position.longitude - (diffLng / iteration),
          },
          image: BusIcon,
        },
        {
          name: 'Truck 1',
          position: {
            latitude: this.state.vehicles[1].position.latitude + (diffLat / iteration),
            longitude: this.state.vehicles[1].position.longitude + (diffLng / iteration),
          },
          image: MinerIcon,
        },
      ],
      counter: this.state.counter + 1,
    }
    :
    {
      vehicles: [
        {
          name: 'Bus 1',
          position: {
            latitude: this.state.vehicles[0].position.latitude + (diffLat / iteration),
            longitude: this.state.vehicles[0].position.longitude + (diffLng / iteration),
          },
          image: BusIcon,
        },
        {
          name: 'Truck 1',
          position: {
            latitude: this.state.vehicles[1].position.latitude - (diffLat / iteration),
            longitude: this.state.vehicles[1].position.longitude - (diffLng / iteration),
          },
          image: MinerIcon,
        },
      ],
      counter: this.state.counter + 1,
    }), 100);
  }

  render() {
    const { region, myPosition, circle, vehicles, polyline, active, problems, alert } = this.state;
    return (
      <View style={{ ...StyleSheet.absoluteFillObject }}>
        <MapView
          style={{ ...StyleSheet.absoluteFillObject }}
          region={region}
          // showsMyLocationButton
          showsCompass
          onRegionChange={regionAux => this.setState({ region: regionAux })}
          loadingEnabled
        >
          <MapView.Marker coordinate={myPosition} title="titulo" />
          {vehicles.map((car, key) =>
            (<MapView.Marker coordinate={car.position} title={car.name} style={{ height: 30, width: 30 }} onPress={() => this.setState({ active: key })} >
              <Image source={car.image} style={{ height: 15, width: 30, top: 15 }} />
            </MapView.Marker>),
          )}
          {circle.map(cir =>
            <MapView.Circle center={cir} radius={150} fillColor={'rgba(231, 76, 60,0.5)'} />,
          )}
          {polyline.map(pol =>
            <MapView.Polyline coordinates={pol} strokeWidth={5} strokeColor="rgba(52, 152, 219,0.6)" />,
          )}
          {problems.map((item, key) =>
            (<MapView.Marker coordinate={item.position} onPress={() => { problems.splice(key, 1); this.setState({ problems }); }} >
              <Icon name={item.type} color="rgba(243, 156, 18,1.0)" raised size={10} reverse />
            </MapView.Marker>),
          )}
        </MapView>
        <View style={{ position: 'absolute', top: 15, right: 15 }}>
          <Icon
            name="report-problem"
            raised
            color="rgba(192, 57, 43,1.0)"
            size={35}
            onPress={() => Alert.alert(
              'Hay una emergencia',
              'Por favor, reduce tu velocidad y ten cuidado en la ruta',
              [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ],
              { cancelable: false }
            )}
          />
        </View>
        <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-around', backgroundColor: 'rgba(52, 73, 94,1.0)', borderRadius: 20, bottom: 20, position: 'absolute' }}>
          <Icon
            name="directions-walk"
            raised
            color="rgba(243, 156, 18,1.0)"
            onPress={() => this.setState({ problems: [...this.state.problems, { type: 'directions-walk', position: vehicles[active].position }] })}
          />
          <Icon
            name="error"
            raised
            color="rgba(243, 156, 18,1.0)"
            onPress={() => this.setState({ problems: [...this.state.problems, { type: 'error', position: vehicles[active].position }] })}
          />
          <Icon
            name="pets"
            raised
            color="rgba(243, 156, 18,1.0)"
            onPress={() => this.setState({ problems: [...this.state.problems, { type: 'pets', position: vehicles[active].position }] })}
          />
        </View>

      </View>
    );
  }
}
