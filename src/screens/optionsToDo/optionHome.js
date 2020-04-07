import React, { Component } from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import introSliderOption from './introSliderOption';
import contactOption from './contactOptions';
import { TouchableOpacity } from 'react-native';

const OptionNavigator = createAppContainer(createBottomTabNavigator({
  introSliderOption: {
    screen: introSliderOption,
    navigationOptions: {
      title: 'Tutorial'
    }
  },
  contactOption: {
    screen: contactOption,
    navigationOptions: {
      title: 'Desenvolvedor'
    }
  }
},{
  tabBarOptions: {
    activeBackgroundColor: 'rgb(58,56,151)',
    inactiveBackgroundColor: 'rgba(58, 56, 151, 0.37)'
  }
}
))
export default class optionHome extends Component {
  render() {
    return (
      <>
      <TouchableOpacity onPress={() => {this.props.navigation.navigate('Home')}} style={{position:'absolute', marginTop:20, marginLeft:5, zIndex: 5}}>
      <Icon name="arrow-back" size={28} color={"#ddd"}/>
      </TouchableOpacity>
      <OptionNavigator />
      </>
    );
  }
}