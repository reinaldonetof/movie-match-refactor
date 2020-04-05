import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Touchable from 'react-native-platform-touchable'
import CheckBox from 'react-native-check-box'

export default class IntroModalBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutoCheck: true
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body} >
          <Text style={styles.tutoText}>Tutorial</Text>
          <View style={styles.texto} >
            <CheckBox style={styles.checkStyle} isChecked={this.state.tutoCheck}
              onClick={(value) => {
                this.setState({ tutoCheck: !this.state.tutoCheck })
              }}
              checkBoxColor={'#FFFFFF'} checkedCheckBoxColor={'#77CC77'}
            />
            <Text style={styles.textCheck}>Sempre mostrar o tutorial quando iniciar o aplciativo?</Text>
          </View>
          <Touchable style={styles.touchButton} onPress={()=>{this.props.finalizar(this.state.tutoCheck)}}>
            <Text style={styles.textCheck}>OK</Text>
          </Touchable>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  texto: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tutoText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white'
  },
  textCheck: {
    fontSize: 16,
    color: 'white'
  },
  touchButton: {
    marginTop: 10,
    height: 35,
    width: 60,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#29ABE2',
    justifyContent: 'center',
    alignItems: 'center'
  }
})