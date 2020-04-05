import React, { Component } from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';

import introSliderOption from './introSliderOption';
import contactOption from './contactOptions';

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
    activeBackgroundColor: 'rgb(220,220,220)',
    inactiveBackgroundColor: 'rgb(229,229,229)'
  }
}
))
export default class optionHome extends Component {
  render() {
    return (
      <OptionNavigator />
    );
  }
}