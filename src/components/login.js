import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { FormLabel, FormInput, Button, Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import Logo from '../images/logoLosBronces.jpg';

export default class Login extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(52, 73, 94,1.0)' }}>
        <Card style={{ backgroundColor: 'rgba(255, 255, 255, 1)', padding: 20, margin: 10 }}>
          <View style={{ alignItems: 'center' }}>
            <Image source={Logo} />
          </View>
          <FormLabel>Usuario</FormLabel>
          <FormInput onChangeText={text => this.setState({ user: text })} />
          <FormLabel>Contraseña</FormLabel>
          <FormInput secureTextEntry onChangeText={text => this.setState({ password: text })} />
          <Button large backgroundColor="#e67e22" raised icon={{ name: 'edit' }} title="Iniciar Sesion" onPress={Actions.carSelector} />
        </Card>
      </View>
    );
  }
}
