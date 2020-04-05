import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const NewButton = ({ params }) => {
  const [colorButton, setColorButton] = useState('novo');

  useEffect(() => {
    setColorButton(params.props);
  }, [params.props])

  return (
    <View style={styles.container}>
      {
        colorButton === 'novo' ? (
          <View style={[styles.newButton, { backgroundColor: '#9ab68b' }]}>
            <Icon name="add" size={32} color="#f6e7f9" />
            <Text style={styles.textNewButton} >Novo Projeto</Text>
          </View>
        ) :
          (
            <View style={[styles.newButton, styles.continueLayout]}>
              <Icon name="add" size={20} color="#f6e7f9" />
              <Text style={[styles.textNewButton, { fontSize: 14}]} >Novo Projeto</Text>
            </View>
          )
      }
    </View>
  )
}

export const ContinueButton = () => {
  return(
    <View style={[styles.newButton, { backgroundColor: '#9ab68b' }]}>
      <Icon name="play-arrow" size={32} color="#f6e7f9" />
      <Text style={styles.textNewButton} >Continue Projeto</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height:50,
    width:'100%',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 10,
    borderColor: '#a3bd95'
  },
  textNewButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f6e7f9'
  },
  continueLayout: {
    width: '50%',
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 10,
  }
})