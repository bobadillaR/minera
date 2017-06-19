import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

export default class Router extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          name: 'Vehiculo 1 - DZBX33',
          icon: 'directions-car',
          subtitle: 'Camioneta',
        },
        {
          name: 'Vehiculo 2 - DZBX33',
          icon: 'local-shipping',
          subtitle: 'Camion',
        },
        {
          name: 'Vehiculo 3 - DZBX33',
          icon: 'directions-car',
          subtitle: 'Camioneta',
        },
        {
          name: 'Vehiculo 4 - DZBX33',
          icon: 'directions-car',
          subtitle: 'Camioneta',
        },
        {
          name: 'Vehiculo 5 - DZBX33',
          icon: 'local-shipping',
          subtitle: 'Camion',
        },
        {
          name: 'Vehiculo 6 - DZBX33',
          icon: 'directions-car',
          subtitle: 'Camioneta',
        },
        {
          name: 'Vehiculo 7 - DZBX33',
          icon: 'directions-car',
          subtitle: 'Camioneta',
        },
        {
          name: 'Vehiculo 8 - DZBX33',
          icon: 'local-shipping',
          subtitle: 'Camion',
        },
        {
          name: 'Vehiculo 9 - DZBX33',
          icon: 'directions-car',
          subtitle: 'Camioneta',
        },
      ],
    };
  }

  render() {
    const { list } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }} >
          <Text h3 style={{ color: 'rgba(52, 73, 94,1.0)' }}>
            Selecciona tu vehiculo
          </Text>
        </View>
        <List containerStyle={{ marginBottom: 20 }}>
          {
            list.map(item => (
              <ListItem
                key={item.name}
                roundAvatar
                leftIcon={{ name: item.icon, color: 'rgba(52, 73, 94,1.0)' }}
                subtitle={item.subtitle}
                title={item.name}
                onPress={Actions.routeSelector}
              />
            ))
          }
        </List>
      </View>
    );
  }
}
