import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Modal } from 'react-native';
import WebView from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { styleGlobal } from '../StyleGlobal';

import vagalume from '../../assets/logoSearch/vagalume.png';
import letras from '../../assets/logoSearch/letras.png';
import metrolyrics from '../../assets/logoSearch/metrolyrics.png';
import genius from '../../assets/logoSearch/genius.jpg';

export default class searchText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sitesArray: [
        { key: '00', name: 'Vagalume', logo: vagalume, uri: 'https://www.vagalume.com.br/' },
        { key: '01', name: 'Letras', logo: letras, uri: 'https://www.letras.mus.br/' },
        { key: '02', name: 'Genius', logo: genius, uri: 'https://genius.com/' },
        { key: '03', name: 'MetroLyrics', logo: metrolyrics, uri: 'http://www.metrolyrics.com/' }
      ],
      modalVisible: false,
      uriModal: ''
    }

    this.modalWebVisible = this.modalWebVisible.bind(this);
  }

  modalWebVisible(uri) {
    this.setState({ modalVisible: true, uriModal: uri })
  }

  modalWebView = () => {
    webview = null
    return (
      <View style={styles.viewGeralModal}>
        <View style={styles.viewModal}>
          <View style={styles.headerModal}>
            <TouchableOpacity style={{ height: 35, width: 35, marginHorizontal: 15 }} onPress={() => this.webView.goBack()}>
              <Icon name="arrow-back" size={35} color={styleGlobal.colorIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={{ height: 35, width: 35, marginHorizontal: 15 }} onPress={() => this.setState({ modalVisible: false })}>
              <Icon name="close" size={35} color={styleGlobal.colorIcon} />
            </TouchableOpacity>
          </View>
          <WebView
            source={{ uri: this.state.uriModal }}
            ref={ref => (this.webView = ref)}
          />
        </View>
      </View>
    )
  }

  render() {
    const columns = 2;
    return (
      <LinearGradient style={{ flex: 1 }} colors={styleGlobal.backgroundGlobal}>
        <View style={{ justifyContent: 'center', flex:1 }}>
          <FlatList
            style={{ marginVertical: '15%' }}
            data={this.state.sitesArray}
            numColumns={columns}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              if (item.empty) {
                return <View style={[styles.item, styles.itemEmpty]} />
              }
              return (
                <View style={styles.item}>
                  <TouchableOpacity style={[styles.item, { justifyContent: 'center', borderWidth: 1 }]} onPress={() => {
                    this.modalWebVisible(item.uri)
                  }}>
                    <Image source={item.logo} resizeMode={'contain'} style={{ width: 150, height: 100 }} />
                    <Text style={styles.text}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              )
            }}
          />
          <Modal transparent={true} animationType="slide" onRequestClose={() => { }} visible={this.state.modalVisible}>
            <this.modalWebView />
          </Modal>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    backgroundColor: null,
    flexGrow: 1,
    margin: 4,
    flexBasis: 0,
    width: 150,
    height: 200,
    borderRadius: 20,
    borderColor: '#ccc'
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f6e7f9',
  },
  itemEmpty: {
    backgroundColor: 'transparent'
  },
  viewGeralModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  viewModal: {
    marginTop: 55,
    flex:1
  },
  headerModal: {
    backgroundColor: '#4f1234',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})