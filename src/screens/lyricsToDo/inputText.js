import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Clipboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { WheelPicker } from 'react-native-wheel-picker-android';

import { styleGlobal } from '../StyleGlobal';
import { lyricsArray } from '../../actions/lyricsAction';
import { connect } from 'react-redux';

export class inputText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrayText: [],
      textString: ''
    }

    this.changeTextInput = this.changeTextInput.bind(this);
    this.clipboardGetString = this.clipboardGetString.bind(this);
  }

  changeTextInput(text) {
    let textString = text;
    let arrayText = text.split('\n');
    arrayText = arrayText.filter(function (testarNulo) {
      return testarNulo !== '';
    })

    let state = this.state;
    state.textString = textString;
    state.arrayText = arrayText;
    this.setState(state);

    this.props.lyricsArray(arrayText);
  }

  async clipboardGetString() {
    let textFromClipBoard = await Clipboard.getString();
    this.changeTextInput(textFromClipBoard)
  }


  render() {
    return (
      <LinearGradient colors={styleGlobal.backgroundGlobal} style={styles.lgcontainer} >
        <View style={styles.container}>
          <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={() => { this.clipboardGetString() }}>
            <View style={styles.newButton}>
              <Icon name="content-paste" style={{ marginLeft: 10 }} size={28} color={styleGlobal.colorIcon} />
              <Icon name="add" style={{ marginLeft: -12, marginTop: 3 }} size={20} color={'#ffff00'} />
              <Text style={styles.textNewButton} >Cole aqui</Text>
            </View>
          </TouchableOpacity>
          <TextInput style={styles.inputText}
            placeholder="Digite o texto aqui"
            onChangeText={this.changeTextInput}
            multiline={true}
            value={this.state.textString}
          />

          <View style={styles.returnHeader}>
            <Text style={styles.textOfLyrics} numberOfLines={2}>A letra que será utilizada para Legendar o vídeo</Text>
            {
              (this.props.lyrics.length > 0)
              &&
              <WheelPicker
              style={{ height: '75%', width: '100%' }}
              selectedItem={0}
              data={this.props.lyrics}
              onItemSelected={() => { }}
              itemTextSize={10}
              selectedItemTextSize={11}
            />
            }
          </View>

          {
            (this.props.lyrics.length > 1) &&
            <TouchableOpacity style={[styles.button, { marginTop: 30 }]} onPress={() => { this.props.navigation.navigate('Home') }}>
              <View style={styles.newButton}>
                <Icon name="done-all" style={{ marginLeft: 10 }} size={28} color={styleGlobal.colorIcon} />
                <Text style={styles.textNewButton} >Finalizar</Text>
              </View>
            </TouchableOpacity>
          }

        </View>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  lgcontainer: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingTop: 10
  },
  button: {
    width: '50%',
    height: 50,
    marginHorizontal: '25%'
  },
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#a3bd95',
    backgroundColor: '#9ab68b'
  },
  textNewButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f6e7f9',
    marginLeft: 5,
    textAlign: 'center'
  },
  inputText: {
    marginTop: 30,
    paddingTop: 20,
    height: 150,
    alignSelf: 'stretch',
    textAlign: 'left',
    textAlignVertical: 'top',
    backgroundColor: 'rgba(200,235,235,0.8)',
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5
  },
  returnHeader: {
    height: '25%',
    width: '100%',
    marginTop: 30,
    backgroundColor: 'rgba(154,182,139,0.8)',
    justifyContent: 'center',
    borderRadius: 5
  },
  textOfLyrics: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#f6e7f9',
    textAlign: 'center'
  }
})

const mapStateToProps = (state) => {
  return {
    lyrics: state.lyrics.inputLyric,
  };
};

const inputTextConnect = connect(mapStateToProps, { lyricsArray })(inputText);
export default inputTextConnect;