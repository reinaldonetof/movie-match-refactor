import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';


export default class contactOption extends Component {

  static navigationOptions = {
    tabBarIcon: ({ focused }) => {
      if (focused) {
        return <Icon name="contacts" size={22} color="#4444DD" />
      } else {
        return <Icon name="contacts" size={22} color="#000000" />
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <LinearGradient colors={['#101D29', '#4F00BC']} style={styles.container}>
        <View style={styles.container}>
          <View style={styles.areaView}>
            <Icon name="account-circle" size={90} color="#CCC" />
            <Text style={styles.textAutor}>Autor: Reinaldo Neto</Text>
            <Text style={styles.textOrientador}>Projeto desenvolvido para o TCC, com a ajuda do Prof Dr Kleber Zuza</Text>
            <View style={styles.areaLinks}>
              <TouchableOpacity onPress={() => { Linking.openURL('https://www.linkedin.com/in/reinaldo-c-s-neto-8a798a139/') }}>
                <FontAwesome name="linkedin-square" size={70} color="#00B" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { Linking.openURL('https://github.com/reinaldonetof') }}>
                <FontAwesome name="github-square" size={70} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    height: 26,
    width: 26
  },
  container: {
    paddingTop: 20,
    flex: 1
  },
  areaView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  areaLinks: {
    marginTop: 30,
    width: '100%',
    height: '50%',
    flexDirection:'row',
    justifyContent: 'space-around',
  },
  textAutor: {
    textAlign: 'center',
    color: '#CCC',
    fontSize: 20
  },
  textOrientador: {
    textAlign: 'center',
    color: '#CCC',
    fontSize: 18
  }
})