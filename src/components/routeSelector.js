import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Text } from 'react-native-elements';

export default class RouteSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }} >
          <Text h3 style={{ color: 'rgba(52, 73, 94,1.0)' }}>
            Selecciona tu Ruta
          </Text>
        </View>
        <View>
          <Button large backgroundColor="#e67e22" raised icon={{ name: 'arrow-upward' }} title="Ruta de subida" containerViewStyle={{ margin: 20 }} onPress={Actions.map}/>
          <Button large backgroundColor="#e67e22" raised icon={{ name: 'arrow-downward' }} title="Ruta de bajada" onPress={Actions.map} />
        </View>
      </View>
    );
  }
}
