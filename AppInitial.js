import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import IntroSlider from './src/introSlider/IntroSlider';
import Home from './src/screens/Home';
import homeToLyrics from './src/screens/lyricsToDo/homeToLyrics';
import inputText from './src/screens/lyricsToDo/inputText';
import searchText from './src/screens/lyricsToDo/searchText';
import optionHome from './src/screens/optionsToDo/optionHome';
import searchVideo from './src/screens/videoToDo/searchVideo';
import screenToDoSubtitle from './src/screens/subtitleToDo/screenToDoSubtitle'

import { valueChange } from './src/actions/introActions';
import { connect } from 'react-redux';

const AppNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions:{
      header:null
    }
  },
  homeToLyrics: {
    screen: homeToLyrics,
    navigationOptions: {
      title:'Menu Lyrics',
    }
  },
  inputText: {
    screen: inputText,
    navigationOptions: {
      title: 'Cole seu Texto',
    }
  },
  searchText: {
    screen: searchText,
    navigationOptions: {
    }
  },
  searchVideo: {
    screen: searchVideo,
    navigationOptions: {
    }
  },
  screenToDoSubtitle:{
    screen:screenToDoSubtitle,
    navigationOptions: {
    }
  },
  optionHome:{
    screen:optionHome,
    navigationOptions: {
      title: 'Menu Opções',
    }
  }
}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#101D29',
      },
      headerTintColor: '#DDD'
    }
  }
))

export class AppInitial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backFromSlide: false,
      withTutoInit: this.props.valueCheckBox
    }
  }

  setCloseSlider(status) {
    this.props.valueChange(status);
    this.setState({ backFromSlide: true })
  }
  render() {
    if (this.state.backFromSlide == false && this.state.withTutoInit == true) {
      return (
        <IntroSlider closeSlider={(val) => {
          this.setCloseSlider(val);
        }}
          fromWhoScreen={{ key: 'App' }} />
      );
    } else {
      return (
          <AppNavigator />
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    valueCheckBox:state.valueCBox.valueCheckBox
  };
};

const AppInitialConnect = connect(mapStateToProps, { valueChange })(AppInitial);
export default AppInitialConnect