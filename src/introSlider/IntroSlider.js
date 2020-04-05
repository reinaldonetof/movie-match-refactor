import React, { Component } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Modal, AsyncStorage, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IntroModalBox from './IntroModalBox';

import App from '../../App'

const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    colors: ['#63E2FF', '#B066FE'],
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
    colors: ['#A3A1FF', '#3A3897'],
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    colors: ['#29ABE2', '#4F00BC'],
  }
]

export default class IntroSlider extends Component {
  renderItem = ({ item, dimensions }) => (
      <LinearGradient
        style={[
          styles.mainContent,
          dimensions,
        ]}
        colors={item.colors}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0.1, y: 1 }}
      >
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </LinearGradient>
  );

  constructor(props) {
    super(props);
    this.state = {
      statusButton:true,
      modalVisible:false
    }
    this.eachScreenFormat = this.eachScreenFormat.bind(this);
    this.eachScreenFormat();

    this.openModal = this.openModal.bind(this);
  }

  eachScreenFormat() {
    switch(this.props.fromWhoScreen.key){
      case 'App':
        slides[0].title = 'VEIO PELO APP.JS'
        break;
      case 'Option':
          slides[0].title = 'VEIO PELO OPTION'
          let state = this.state;
          state.statusButton = false;
          this.setState(state);
          break;
    }
  }

  openModal() {
    this.setState({modalVisible:true})
  }

  setModalVisible(status) {
    this.setState({modalVisible:status})
  }

  render() {
    if (this.state.showRealApp) {
      return <App  />;
    } else {
      return (
        <View style={styles.container} >
          <AppIntroSlider
            slides={slides}
            renderItem={this.renderItem}
            onDone={this.openModal}
            onSkip={this.openModal}
            showSkipButton={this.state.statusButton}
            showDoneButton={this.state.statusButton} />
          <Modal animationType='slide' transparent={true} visible={this.state.modalVisible} onRequestClose={() => { }}>
            <View style={styles.modalWindow} >
              <View style={styles.modalBody}>
                <IntroModalBox finalizar={
                  this.props.closeSlider
                } />
              </View>
            </View>
          </Modal>
        </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalWindow:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  modalBody:{
    height:'35%',
    width:'90%',
    backgroundColor:'#345577',
    borderRadius:20
  }
});