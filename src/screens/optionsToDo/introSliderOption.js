import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Icon from 'react-native-vector-icons/MaterialIcons';

import IntroSlider from '../../introSlider/IntroSlider';

export default class introSliderOption extends Component {

    static navigationOptions = {
        tabBarIcon: ({focused}) => {
            if(focused) {
                return <Icon name="view-carousel" size={24} color="#4444DD" />
            } else {
                return <Icon name="view-carousel" size={24} color="#000000" />
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
                <IntroSlider
                    fromWhoScreen={{ key: 'Option' }} />
        );
    }
}