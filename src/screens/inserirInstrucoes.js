import React, {Component} from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Dimensions , Image, 
  KeyboardAvoidingView, FlatList, Button, ScrollView, Keyboard } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import imagem from '../../assets/imgs/addReceita.png'

import AddInstrucao from '../components/AddInstrucao'

const initialState = { 
  inputInstrucao: '',
  instrucoes: [''],
  isKeyboardOpen: false,
}

export default class App extends Component {

  state = {
    ...initialState
  }

  setInputIntrucao = (inputInstrucao) => {
    this.setState({ inputInstrucao })
  }

  setInstrucao = (valor, indice) => {
    
    let instrucoes = this.state.instrucoes
    instrucoes[indice] = valor
    console.log(instrucoes[indice + 1])
    if (!instrucoes[indice + 1]) {
      instrucoes[indice+1] = ''
    }
    this.setState({ instrucoes })

    console.log(this.state.instrucoes)
  }

  setKeyboardOn = () => {
    this.setState({ isKeyboardOpen: true });
  };
  
  setKeyboardOff = () => {
    this.setState({ isKeyboardOpen: false });
  };

  addInstrucao() {
    let instrucoes = this.state.instrucoes
    instrucoes.push('')
    this.setState({ instrucoes })
  }

  componentDidMount() {


    /* Usando uma solução ruim, pois foi a unica que consegui */
    /* Basicamente vamos monitorar o teclado, se ligado, oculta botões /*/
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.setKeyboardOn
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.setKeyboardOff
    );

  }

  render() {

    return (

      <SafeAreaView style={styleApp.app}>

          <ScrollView>
        
            <View style={styleApp.appMain}>
              
              { /* Imagem superior */ }
              <View style={styleApp.imagem}>
                <Image source={imagem} style={styleApp.image}/>
              </View>

              { /* Escolha dos ingredientes */ }
              <View style={{flex: 1}}>

                <View style={styleApp.input}>
                  <Text style={styleApp.inputDesc}> Digite o </Text>
                  <Text style={[styleApp.inputDesc, {color: '#ECA457'} ]}>modo de preparo </Text>
                </View>

                <View style={{flex: 1}}>
                  {this.state.instrucoes.map((instrucao, index) => (
                    <AddInstrucao
                      key={index}
                      valor={instrucao}
                      indice={index}
                      funcao={this.setInstrucao}
                      onChange={(valor) => handleChange(valor, index)}
                    />
                  ))}
                </View>
              </View>
            </View>

          </ScrollView>
              
          { /*  Botões de navegação */ }
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
            {!this.state.isKeyboardOpen && (
              <TouchableOpacity style={[styleApp.backButton]}
                activeOpacity={0.7}
                onPress={() => this.props.navigation.goBack()} >
                <Ionicons name="arrow-back" size={30} color={'white'} />
              </TouchableOpacity>
            )}

            {!this.state.isKeyboardOpen && (
              <TouchableOpacity style={[styleApp.addButton]}
                activeOpacity={0.7}
                //onPress={() => this.props.navigation.navigate('Ingrediente', { view: 'Ingrediente' } )}
                >
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}> Salvar </Text>
              </TouchableOpacity>
            )}
          </View>

      </SafeAreaView>
    
    )
  }
}

const styleApp = StyleSheet.create({

  app: {
    flex: 1,
    backgroundColor: '#D5ECF0',
  },

  appMain: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20
  },

  imagem: {
    alignItems: 'center'
  },

  image: {
    height: (Dimensions.get('window').width / 4) * 3,
    resizeMode: 'contain',
  },

  input: {
    justifyContent: 'center',
    marginTop: 20,
    flexDirection: 'row'
  },

  inputDesc: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20
  },

  inputNomeIngrediente: {
    width: '80%' ,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 7,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  backButton: {
    position: 'absolute',
    left: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center' ,
    backgroundColor: '#ECA457',
  },

  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 90,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center' ,
    backgroundColor: '#ECA457',
   }

})