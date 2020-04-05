import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import { styleGlobal } from '../StyleGlobal';

import { uriVideo } from '../../actions/videoActions';
import { connect } from 'react-redux';

export class searchVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: '',
      uriOrig: this.props.uriVideoPath,
      colorBgSearch: '#9ab68b',
      fileName:''
    }

    this.searchVideoRequest = this.searchVideoRequest.bind(this);
    this.searchVideoPicker = this.searchVideoPicker.bind(this);
    this.pathDirectoryOs = this.pathDirectoryOs.bind(this);
    this.fileName = this.fileName.bind(this);
    this.confirmAndSave = this.confirmAndSave.bind(this);
  }

  searchVideoRequest = async () => {
    if (await this.requestPermission()) {
      this.searchVideoPicker();
    } else {
      alert('Erro no request')
    }
  }
  
  searchVideoPicker() {
    const options = {
      title: 'Selecionar Video:',
      mediaType: 'video',
      takePhotoButtonTitle: null,
      chooseFromLibraryButtonTitle: 'Acessar a Galeria...',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      this.pathDirectoryOs(response);
    });
  }

  pathDirectoryOs(response) {
    if(response.uri === undefined) {
      alert('Selecione um item válido')
    } else {
      let state = this.state;
    switch (Platform.OS) {
      case 'ios':
        state.colorBgSearch = '';
        state.uri = response.origUrl;
        this.setState(state);
        break;
      case 'android':
        state.colorBgSearch = '';
        state.uri = response.path;
        this.setState(state);
        break;
    }
    this.fileName();
    }
  };

  fileName() {
    let s = this.state;
    let fileName = (s.uri).split('/');
    s.fileName = fileName[fileName.length-1];
    this.setState(s);
  }

  confirmAndSave() {
    this.props.uriVideo(this.state.uri);
    this.props.navigation.navigate('Home');
  }


  async requestPermission() {
    if (Platform.OS == 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            'title': 'Acessar a Galeria',
            'message': 'Este aplicativo precisar acessar a sua galeria' +
              'para procurar o vídeo.'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Read External Storage permission accepted");
          return true;
        } else {
          console.log("Read External permission denied");
          return false;
        }
      } catch (err) {
        console.warn(err)
      }
    }
    else {
      return true;
    }
  }

  render() {
    return (
      <LinearGradient colors={styleGlobal.backgroundGlobal} style={styles.lgcontainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.buttons}>
              {
                (this.state.colorBgSearch === '') ?
                  <TouchableOpacity style={styles.searchVideoButton} onPress={this.searchVideoRequest} >
                    <View style={[styles.testeView, { backgroundColor: null }]}>
                      <Icon name="local-movies" size={26} color={styleGlobal.colorIcon} />
                      <Icon style={{ marginLeft: -13, marginTop: 10 }} name="add" size={14} color={styleGlobal.colorIcon} />
                      <Text style={[styles.textButton, {fontSize:10}]}>Procurar video</Text>
                    </View>
                  </TouchableOpacity>

                  :
                  <TouchableOpacity style={styles.searchVideoButton} onPress={this.searchVideoRequest} >
                    <View style={[styles.testeView, { backgroundColor: this.state.colorBgSearch }]}>
                      <Icon name="local-movies" size={32} color={styleGlobal.colorIcon} />
                      <Icon style={{ marginLeft: -13, marginTop: 10 }} name="add" size={20} color={styleGlobal.colorIcon} />
                      <Text style={styles.textButton}>Procurar video</Text>
                    </View>
                  </TouchableOpacity>
              }
            </View>
            <Text style={{ color: '#FFFFFF', fontSize:10 }}></Text>
            <Text style={{ color: '#FFFFFF', fontSize:10 }}></Text>
          </View>
          <View style={styles.returnVideo}>
            {(this.state.uri == '' || this.state.uri === undefined) ?
              <Text style={{ color: '#FFFFFF', fontSize: 10 }}>Selecione um Vídeo</Text>
              :
              (
                <Video source={{ uri: this.state.uri }}
                  ref={(ref) => {
                    this.player = ref
                  }}                                      // Store reference
                  style={styles.backgroundVideo}
                  muted={true}
                />
              )
            }
          </View>
          {
            !(this.state.uri == '' || this.state.uri === undefined) &&
            <View style={styles.viewConfirm} >
              <TouchableOpacity style={[styles.searchVideoButton, styles.confirmButton]}
                onPress={() => this.confirmAndSave()}>
                <Text style={styles.textButton}>Confirma o arquivo?</Text>
                <Text style={styles.textUriConfirm} >{this.state.fileName}</Text>
              </TouchableOpacity>
            </View>
          }
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
    padding: 10,
    flex: 1
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  buttons: {
    flexDirection: 'row',
    width: '50%',
    height: 50,
    borderRadius: 25
  },
  searchVideoButton: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    width: '100%',
    borderRadius: 25,
    borderColor: '#a3bd95',
    borderWidth: 1
  },
  testeView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50,
    width: '100%',
    borderRadius: 25,
    borderColor: '#a3bd95',
    borderWidth: 1
  },
  returnVideo: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
    width: '100%',
    borderRadius: 10
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  },
  viewConfirm: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#9ab68b',
    marginTop: 30,
    height: 80,
    width: '75%',
    borderRadius: 40,
    borderColor: '#a3bd95',
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
  },
  textButton: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#f6e7f9'
  },
  textUriConfirm: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#f6e7f9',
    textAlign:'center'
  },
})

const mapStateToProps = (state) => {
  return {
    uriVideoPath:state.video.uriVideoPath,
  }
}

const searchVideoConnect = connect(mapStateToProps, { uriVideo })(searchVideo);
export default searchVideoConnect;