import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Drawer from 'react-native-drawer';

import { NewButton, ContinueButton } from './ButtonsHome';
import BackgroundSide from '../assets/fundo/background.jpeg';
import NameLogo from '../assets/logo/NOME_APLICATIVO.png';
import LogoSemFundo from '../assets/logo/LOGO_SEMFUNDO_APLICATIVO.png';
import { styleGlobal } from './StyleGlobal';

import { connect } from 'react-redux';
import { lyricsArray } from '../actions/lyricsAction';
import { uriVideo } from '../actions/videoActions';
import { saveReset } from '../actions/saveAction';



export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projeto: 'novo'
    }
    this.newProject = this.newProject.bind(this);
  }

  newProject() {
    this._drawer.open();
    let s = this.state;
    s.projeto = 'continue';
    this.setState(s);
    this.props.uriVideo('');
    this.props.lyricsArray(['']);
    this.props.saveReset();
  }

  contentDrawer = () => {
    return (
      <View style={styles.sideDrawer}>
        <ImageBackground source={BackgroundSide} style={{ height: '100%', opacity: 0.9 }}>
          <View style={styles.logo}>
            <TouchableOpacity onPress={() => { this._drawer.close() }}>
              <Image source={LogoSemFundo} resizeMode={'contain'} style={{ width: 120 }} />
            </TouchableOpacity>
          </View>

          <View>

            {
              (this.props.uriVideoPath !== '') ?
                <TouchableOpacity style={styles.touchDrawer} onPress={() => { this.props.navigation.navigate('searchVideo') }}>
                  <Icon name="video-library" size={28} color={'#0F0'} />
                  <Text style={[styles.textButton, { color: '#0F0' }]}>Buscar Vídeo</Text>
                  <Icon name="done-all" size={28} color={'#0F0'} />
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.touchDrawer} onPress={() => { this.props.navigation.navigate('searchVideo') }}>
                  <Icon name="video-library" size={28} color={styleGlobal.colorIcon} />
                  <Text style={styles.textButton}>Buscar Vídeo</Text>
                </TouchableOpacity>
            }

            {
              (this.props.lyrics.length > 1) ?
                <TouchableOpacity style={styles.touchDrawer} onPress={() => { this.props.navigation.navigate('homeToLyrics') }}>
                  <Icon name="library-books" size={28} color={'#0F0'} />
                  <Text style={[styles.textButton, { color: '#0F0' }]}>Adicionar a Legenda</Text>
                  <Icon name="done-all" size={28} color={'#0F0'} />
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.touchDrawer} onPress={() => { this.props.navigation.navigate('homeToLyrics') }}>
                  <Icon name="library-books" size={28} color={styleGlobal.colorIcon} />
                  <Text style={styles.textButton}>Adicionar a Legenda</Text>
                </TouchableOpacity>
            }

            <View style={{ justifyContent: 'center', marginTop: 20, backgroundColor: 'transparent', height: '50%' }}>
            </View>

            {
              (this.props.lyrics.length > 1 && this.props.uriVideo !== '') &&
              <TouchableOpacity style={styles.touchDrawer} onPress={() => { this.props.navigation.navigate('screenToDoSubtitle') }}>
                <Icon name="movie" size={50} color={'rgba(138,207,217,1)'} />
                <Icon name="play-circle-outline" size={26} color={'rgba(255,255,0,1)'} style={{ marginLeft: -15, marginTop: 5 }} />
                <Text style={[styles.textButton, { fontSize: 20 }]}>Action</Text>
              </TouchableOpacity>
            }

          </View>
        </ImageBackground>
      </View>
    )
  }

  continueButton = () => {
    return (
      <View style={styles.continueLayout}>
        <TouchableOpacity style={styles.button} onPress={() => { this._drawer.open(); }}>
          <ContinueButton />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { this.newProject() }}>
          <NewButton params={{ props: 'continue' }} />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <Drawer
        type="overlay"
        ref={(ref) => this._drawer = ref}
        content={<this.contentDrawer />}
        openDrawerOffset={0.3}
        styles={styles.drawer}
      >
        <LinearGradient colors={styleGlobal.backgroundGlobal} style={styles.lgcontainer}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.iconHeader} onPress={() => { this.props.navigation.navigate('optionHome') }}>
                <Icon name="settings" size={28} color={styleGlobal.colorIcon} />
              </TouchableOpacity>
              <Image resizeMode={'contain'} style={styles.imageHeader} source={NameLogo} />
            </View>

            <View style={styles.areaButton}>
              {
                (this.state.projeto === 'novo' && this.props.lyrics.length <= 1 && this.props.uriVideoPath === '') ?
                  (
                    <TouchableOpacity style={styles.button} onPress={() => { this.newProject() }}>
                      <NewButton params={{ props: 'novo' }} />
                    </TouchableOpacity>
                  )
                  : (
                    <this.continueButton />
                  )
              }
            </View>
          </View>
        </LinearGradient>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3
  },
  container: {
    flex: 1
  },
  lgcontainer: {
    flex: 1
  },
  header: {
    alignItems: 'center',
    height: '20%',
  },
  imageHeader: {
    color: '#D8BFD8',
    width: '90%',
    marginTop: 15,
  },
  iconHeader: {
    padding: 10,
    marginHorizontal: 10,
    alignSelf: 'flex-end'
  },
  areaButton: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    paddingTop: '30%',
  },
  button: {
    width: '100%',
    height: 50,
  },
  sideDrawer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  logo: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%'
  },
  touchDrawer: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    alignItems: 'center'
  },
  continueLayout: {
    flex: 1,
    alignItems: 'center',
    width: '100%'
  },
  textButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f6e7f9',
    marginHorizontal: 10
  },
})

const mapStateToProps = (state) => {
  return {
    lyrics: state.lyrics.inputLyric,
    uriVideoPath: state.video.uriVideoPath,
  }
}

const homeConnect = connect(mapStateToProps, { lyricsArray, uriVideo, saveReset })(Home);
export default homeConnect;