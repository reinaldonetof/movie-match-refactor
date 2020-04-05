import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { styleGlobal } from '../StyleGlobal';
import DownloadLogo from '../../assets/icones/down_subt.png';
import InternetLogo from '../../assets/icones/search_internet.png'

export default class homeToLyrics extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<LinearGradient colors={styleGlobal.backgroundGlobal} style={styles.lgcontainer}>
				<View style={styles.container}>
					<TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.navigate('inputText') }}>
						<View style={styles.newButton}>
							<Image source={DownloadLogo} style={styles.logoImg} />
							<Text style={styles.textNewButton} >Inserir a letra</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.button, {marginTop: 35}]} onPress={() => { this.props.navigation.navigate('searchText') }}>
						<View style={styles.newButton}>
							<Image source={InternetLogo} style={styles.logoImg} />
							<Text style={styles.textNewButton} >Buscar na internet</Text>
						</View>
					</TouchableOpacity>

				</View>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	lgcontainer: {
		flex: 1
	},
	container: {
		flex: 1,
		paddingTop: 10,
		justifyContent:'center',
		alignItems:'center',
	},
	button: {
		width: '100%',
		height: 50,
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
    fontSize: 18,
    fontWeight: 'bold',
		color: '#f6e7f9',
		marginLeft: 10,
		textAlign:'center'
	},
	logoImg: {
		marginLeft: 30,
		marginRight: 10,
		width:35,
		resizeMode:'contain'
	}
})