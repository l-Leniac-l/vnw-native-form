import React from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import axios from "axios";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: undefined,
      email: undefined,
      perfil: undefined
    };
  }

  sendForm = async event => {
    event.preventDefault();
    const { name, email, perfil } = this.state;
    if (!name || !email || !perfil) {
      return Alert.alert("Todos os campos sao obrigatorios!");
    }
    try {
      let api = axios.create({
        baseURL: "http://192.168.0.100:3000",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let result = await api.post("/users", {
        ds_name: name,
        ds_email: email,
        ds_profile: perfil
      });
      Alert.alert(`ID: ${result.data.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Digite seu nome:</Text>
        <TextInput
          placeholder="Nome"
          onChangeText={text => {
            this.setState({
              name: text
            });
          }}
        />
        <Text>Email:</Text>
        <TextInput
          placeholder="Email"
          onChangeText={text => {
            this.setState({
              email: text
            });
          }}
        />
        <Text>Perfil:</Text>
        <TextInput
          placeholder="Perfil"
          onChangeText={text => {
            this.setState({
              perfil: text
            });
          }}
        />
        <Button title="Cadastrar" onPress={this.sendForm} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
