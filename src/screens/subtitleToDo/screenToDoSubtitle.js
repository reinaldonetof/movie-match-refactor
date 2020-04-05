import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import Toast, { DURATION } from 'react-native-easy-toast';
import { createFile } from './createFilePath';

import { styleGlobal } from '../StyleGlobal';
import { connect } from 'react-redux';
import { saveArray, saveTime, saveCompleteString, stateButtons, saveVideo } from '../../actions/saveAction';

import LetraInicio from '../../assets/letras/INICIO_APLICATIVO.png';
import LetraFim from '../../assets/letras/FIM_APLICATIVO.png';
import PlayIcon from '../../assets/icones/PLAY_APLICATIVO.png';
import LetsRock from '../../assets/letras/LETS_ROCK.png';

export class screenToDoSubtitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0.0,
      seekableDuration: 1.111,
      pausedVideo: false,
      buttonRock: true,
      controller: false,
      lyricsArray: [],
      alreadyAtt: false,
      stringComplete: '',
      valueOfLyric: 1,
      buttonIn: true,
      buttonEnd: false,
      endedVideo: false
    }
    this.cutLyrics = this.cutLyrics.bind(this);
  }

  componentDidMount() {
    let array = this.state.lyricsArray;
    array = this.props.lyrics;

    let s = this.state;
    s.lyricsArray = array;
    this.setState(s);
  }

  componentDidUpdate() {
    if ((this.state.lyricsArray.length === 0 || this.state.endedVideo) && !this.state.alreadyAtt) {
      this.setState({
        alreadyAtt: !this.state.alreadyAtt,
        buttonIn: false,
        buttonEnd: false,
      })
      createFile(
        this.props.uriVideoPath,
        this.state.stringComplete
      )
    }
  }

  convertMStoHHMM = (time) => {
    let cTime = '' + time
    cTime = cTime.split('.')
    let tMM = parseInt(cTime[0], 10)
    let tMS = cTime[1]

    let hour = Math.floor(tMM / 3600)
    hour = (hour < 10) ? '0' + hour : hour

    let minutes = Math.floor(tMM / 60) % 60
    minutes = (minutes < 10) ? '0' + minutes : minutes

    let seconds = tMM % 60
    seconds = (seconds < 10) ? '0' + seconds : seconds

    return (`${hour}:${minutes}:${seconds},${tMS}`)
  }

  initLyric = (initialTime, stringLyric) => {
    let time = this.convertMStoHHMM(initialTime)
    let stringComp = stringLyric + this.state.valueOfLyric + '\n' + time

    this.setState({
      stringComplete: stringComp,
      buttonIn: !this.state.buttonIn,
      buttonEnd: !this.state.buttonEnd
    })
  }

  endLyric = (endTime, stringLyric) => {
    let time = this.convertMStoHHMM(endTime)
    let stringComp = stringLyric + ' --> ' + time + '\n' + this.state.lyricsArray[0] + '\n\n'
    this.setState({
      stringComplete: stringComp,
      valueOfLyric: ++this.state.valueOfLyric,
      buttonIn: !this.state.buttonIn,
      buttonEnd: !this.state.buttonEnd
    })
    this.cutLyrics();
  }

  cutLyrics = () => {
    this.setState({
      lyricsArray: this.state.lyricsArray.filter((value, index) => {
        return index !== 0
      })
    });
  }

  saveTimeAndArray = (time, array, string) => {
    this.refs.toast.show('Progresso Salvo!', 500);
    this.props.saveTime(time);
    this.props.saveArray(array);
    this.props.saveCompleteString(string);
    this.props.stateButtons(this.state.buttonIn, this.state.buttonEnd);
    this.props.saveVideo(this.props.uriVideoPath)
  }

  saveToDo = () => {
    this.setState({
      pausedVideo: !this.state.pausedVideo,
      buttonRock: !this.state.buttonRock,
      lyricsArray: this.props.arraySaved,
      stringComplete: this.props.stringSaved,
      buttonIn: this.props.buttonInitial,
      buttonEnd: this.props.buttonFinal
    })
    this.player.seek(this.props.timeSaved)
  }

  InitialButtons = () => {
    return (
      <View>
        <TouchableOpacity style={styles.buttonRock} onPress={() => {
          this.setState({ pausedVideo: !this.state.pausedVideo, buttonRock: !this.state.buttonRock })
        }}>
          <View style={styles.viewButtonRock}>
            <Image style={styles.logoImg} source={PlayIcon} />
            <Image style={[styles.logoImg, { width: 80, marginLeft: 5 }]} source={LetsRock} />
          </View>
        </TouchableOpacity>
        {
          (this.props.uriVideoPath === this.props.uriVideoSaved && (this.props.arraySaved.length !== undefined && this.props.arraySaved.length > 0))
          &&
          <TouchableOpacity style={[styles.buttonRock, { marginTop: 35 }]} onPress={() => {
            this.saveToDo()
          }}>
            <View style={[styles.viewButtonRock, { backgroundColor: 'transparent' }]}>
              <Image style={styles.logoImg} source={PlayIcon} />
              <Text style={styles.textoSave}>Continue from Save</Text>
            </View>
          </TouchableOpacity>
        }
      </View>
    )
  }

  ButtonsToDo = () => {
    return (
      <View style={styles.areaButtonsInFIm}>
        <View style={{ flex: 2 }}>
          <TouchableOpacity disabled={!this.state.buttonIn} style={styles.areaButtons} onPress={() => { this.initLyric(this.state.currentTime, this.state.stringComplete) }}>
            <View style={(this.state.buttonIn) ? styles.buttonInFim : [styles.buttonInFim, { backgroundColor: '#ccc' }]}>
              <Image source={LetraInicio} resizeMode={'contain'} style={{ width: '90%' }} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.areaButtons}
            onPress={() => { this.player.seek(this.state.currentTime - 10) }}>
            <Icon name="replay-10" size={28} color={styleGlobal.colorIcon} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.areaButtons}
            onPress={() => { this.setState({ controller: !this.state.controller }) }}>
            <Icon name="videogame-asset" size={28} color={styleGlobal.colorIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.areaButtons}
            onPress={() => { this.setState({ pausedVideo: !this.state.pausedVideo }) }}>
            {
              (this.state.pausedVideo === false)
                ?
                <Icon name="pause-circle-outline" size={36} color={styleGlobal.colorIcon} />
                :
                <Icon name="play-circle-outline" size={36} color={styleGlobal.colorIcon} />
            }
          </TouchableOpacity>

          {(!this.state.alreadyAtt) &&
            <TouchableOpacity style={styles.areaButtons}
              onPress={() => { this.saveTimeAndArray(this.state.currentTime, this.state.lyricsArray, this.state.stringComplete) }}>
              <Icon name="save" size={28} color={styleGlobal.colorIcon} />
            </TouchableOpacity>
          }
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.areaButtons}
            onPress={() => { this.player.seek(this.state.currentTime + 10) }}>
            <Icon name="forward-10" size={28} color={styleGlobal.colorIcon} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 2 }}>
          <TouchableOpacity disabled={!this.state.buttonEnd} style={styles.areaButtons} onPress={() => { this.endLyric(this.state.currentTime, this.state.stringComplete) }}>
            <View style={(this.state.buttonEnd) ? styles.buttonInFim : [styles.buttonInFim, { backgroundColor: '#ccc' }]}>
              <Image source={LetraFim} resizeMode={'contain'} style={{ width: '75%' }} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    return (
      <LinearGradient colors={styleGlobal.backgroundGlobal} style={styles.lgcontainer}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 3, backgroundColor: 'transparent' }}>
            <Video
              source={{ uri: this.props.uriVideoPath }}
              ref={(ref) => {
                this.player = ref
              }}                                      // Store reference
              style={styles.backgroundVideo}
              onProgress={({ currentTime, seekableDuration }) => { this.setState({ ...this.state, currentTime, seekableDuration }) }}
              onLoad={() => {
                this.setState({ pausedVideo: true })
              }}
              onEnd={() => {
                this.setState({ endedVideo: true })
              }}
              controls={this.state.controller}
              paused={this.state.pausedVideo}
            />
          </View>

          {
            (this.state.buttonRock === false)
            &&
            <View style={styles.areaLegenda}>
              {(this.state.lyricsArray.length > 0) && <Text style={styles.textoPrimeiro}>{this.state.lyricsArray[0]}</Text>}
              {(this.state.lyricsArray.length > 1) && <Text style={styles.textoSecundario}>{this.state.lyricsArray[1]}</Text>}
            </View>
          }

          <View style={{ flex: 2, marginBottom: 40 }}>
            {
              (this.state.buttonRock === true)
                ?
                <this.InitialButtons />
                :
                <this.ButtonsToDo />
            }
          </View>
          <Toast ref="toast" />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  lgcontainer: {
    flex: 1
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  },
  touchDrawer: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    alignItems: 'center'
  },
  buttonRock: {
    width: '50%',
    height: 50,
    marginHorizontal: '25%'
  },
  viewButtonRock: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#a3bd95',
    backgroundColor: '#9ab68b'
  },
  logoImg: {
    marginLeft: 10,
    marginRight: 10,
    width: 35,
    resizeMode: 'contain'
  },
  areaButtonsInFIm: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  areaButtons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonInFim: {
    height: 70,
    width: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#431',
    justifyContent: 'center',
    alignItems: 'center'
  },
  areaLegenda: {
    flex: 1,
    marginTop: -10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  textoPrimeiro: {
    textAlign: 'center',
    fontSize: 18,
    color: '#DDD',
    backgroundColor: 'rgba(0,0,255,0.2)',
    width: '100%'
  },
  textoSecundario: {
    textAlign: 'center',
    fontSize: 12,
    color: '#AAA',
  },
  textoSave: {
    fontSize: 14,
    marginLeft: -10,
    color: '#DDD',
    width: '100%'
  }
})

const mapStateToProps = (state) => {
  return {
    lyrics: state.lyrics.inputLyric,
    uriVideoPath: state.video.uriVideoPath,
    timeSaved: state.save.saveTime,
    arraySaved: state.save.saveArray,
    stringSaved: state.save.saveCompleteString,
    buttonInitial: state.save.savedButtonIn,
    buttonFinal: state.save.savedButtonEnd,
    uriVideoSaved: state.save.uriVideoSaved
  }
}

const screenToDoSubtitleConnect = connect(mapStateToProps, { saveArray, saveTime, saveCompleteString, stateButtons, saveVideo })(screenToDoSubtitle);
export default screenToDoSubtitleConnect;
