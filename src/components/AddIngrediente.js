import React, { Component } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Modal, Text, TouchableOpacity, TextInput, Platform, FlatList } from 'react-native'
import { ListItem, Avatar, Button } from '@rneui/themed'

// Componente baseado em classe
export default class AddIngrediente extends Component {

    state = {
        descricao: ''
    }

    setDescricao = async (descricao) => {
        await this.setState({ descricao })
        this.props.funcao(descricao, this.props.indice)
      }

    componentDidMount() {
        this.setState({ descricao : this.props.valor })
    }

    render() {

        return (
        
            <View style={{alignItems: 'center', paddingTop: 10}}> 
                  <View style={styleApp.inputNomeIngrediente}>
                    <TouchableOpacity>
                        <TextInput 
                            placeholder="Insira a quantidade e o ingrediente  "
                            style={{fontSize: 16}}
                            value={this.state.descricao}
                            onChangeText={this.setDescricao}
                        />
                     </TouchableOpacity>
                  </View>
              </View>

        )
    }

}

const styleApp = StyleSheet.create({
    inputNomeIngrediente: {
        width: '80%' ,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 7,
        paddingHorizontal: 20,
        alignItems: 'center',
      },
})