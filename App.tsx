import React, {Component} from 'react';
import {
  View, 
  StyleSheet, 
  Text, 
  TextInput, 
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

export default class App extends Component {

  state = {
    loading: false,
    cep: '',
    dados: {
      logradouro: '',
      uf: '',
      bairro: '', 
      localidade: ''
    }
  };

  buscarCep = () => {
    this.setState({
      loading: true,
      cep: '',
      dados: {
        logradouro: '',
        uf: '',
        bairro: '', 
        localidade: ''
      }
    });

    fetch(`https://viacep.com.br/ws/${this.state.cep}/json/`).then(res => res.json()).then(data => {
        this.setState({
          loading: false,
          dados: data
        })
      }).catch(err => {
        this.setState({
          loading: false
        })
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image 
           style={styles.logo}
           source={{
            uri: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'}} />
        <Text style={styles.text}>Buscar meu CEP </Text>
        <TextInput
          value={this.state.cep}
          onChangeText={cep => {
            this.setState({cep})}}
          style={styles.input}
          placeholder="Digite o seu CEP"
          placeholderTextColor="#c3c3c3"
        />
        <TouchableOpacity 
          style={styles.button} 
          onPress={this.buscarCep} 
          disabled={this.state.loading ? true:false}
        >
          <Text>Buscar</Text>
        </TouchableOpacity>
        {this.state.dados.localidade ? <View style={styles.informacao_box}>
            <Text style={styles.informacao}>Estado: {this.state.dados.uf}</Text>
            <Text style={styles.informacao}>
              Cidade: {this.state.dados.localidade}</Text>
            <Text style={styles.informacao}>
              Bairro: {this.state.dados.bairro} </Text>
            <Text style={styles.informacao}>
              Rua: {this.state.dados.logradouro} </Text>
          </View> :
           (this.state.loading ? <View style={styles.indicador}>
            <ActivityIndicator size='large' /> 
            </View> :null)
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingVertical: 150
  },
  containerCEP: {
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    textAlign: 'center',
    fontSize: 20
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#c3c3c3',
    paddingHorizontal: 20,
    paddingVertical: 15 
  },
  button: {
    marginTop: 10, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c3c3c3',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  informacao:{
    fontSize: 18
  },
  informacao_box: {
    marginTop: 10
  },
  logo: {
    marginLeft: 70, 
    width: 200, 
    height: 200, 
    resizeMode: 'contain'
  },
  centro: {
    alignItems: 'center',
    marginBottom: 50
  },
  indicador: {
    marginTop: 40
  }
})