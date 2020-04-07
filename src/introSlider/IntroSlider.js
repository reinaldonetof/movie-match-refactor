import React, { Component } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { View, Modal, StyleSheet, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import IntroModalBox from "./IntroModalBox";

import App from "../../App";
import { slides, initial } from "./slides";

export default class IntroSlider extends Component {
  renderItem = ({ item, dimensions }) => (
    <LinearGradient
      style={[styles.mainContent, dimensions]}
      colors={item.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
    >
      <View style={styles.containerElements}>
        <Text style={styles.title}>{item.title}</Text>
        {item.key === "init"
          ? this.initialScreen(item)
          : this.tutorialScreen(item)}
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </LinearGradient>
  );

  initialScreen = (item) => (
    <View>
      <Image style={styles.image} source={item.imagem} />
      <Image style={styles.image2} source={item.imagem2} />
    </View>
  );
  tutorialScreen = (item) => (
    <>
      {item.imagem2 ? (
        <View style={styles.tutorialImage}>
          <Image style={styles.imageTuto1} source={item.imagem} />
          <Image style={styles.imageTuto2} source={item.imagem2} />
        </View>
      ) : (
        <View style={styles.tutorialImage}>
          <Image style={styles.imageTutoOnly} source={item.imagem} />
        </View>
      )}
    </>
  );

  constructor(props) {
    super(props);
    this.state = {
      statusButton: true,
      modalVisible: false,
    };
    this.eachScreenFormat = this.eachScreenFormat.bind(this);
    this.eachScreenFormat();

    this.openModal = this.openModal.bind(this);
  }

  eachScreenFormat() {
    switch (this.props.fromWhoScreen.key) {
      case "App":
        break;
      case "Option":
        let state = this.state;
        state.statusButton = false;
        this.setState(state);
        break;
    }
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  setModalVisible(status) {
    this.setState({ modalVisible: status });
  }

  render() {
    if (this.state.showRealApp) {
      return <App />;
    } else {
      return (
        <View style={styles.container}>
          <AppIntroSlider
            slides={this.state.statusButton ? [...initial, ...slides] : slides}
            renderItem={this.renderItem}
            onDone={this.openModal}
            onSkip={this.openModal}
            showSkipButton={this.state.statusButton}
            showDoneButton={this.state.statusButton}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
          >
            <View style={styles.modalWindow}>
              <View style={styles.modalBody}>
                <IntroModalBox finalizar={this.props.closeSlider} />
              </View>
            </View>
          </Modal>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  containerElements: {
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    height: 50,
  },
  image2: {
    resizeMode: "center",
    height: 200,
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "transparent",
    textAlign: "center",
    paddingHorizontal: 20,
    fontSize: 22,

  },
  title: {
    fontSize: 26,
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
    marginBottom: 16,
    fontWeight: 'bold'
  },
  modalWindow: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBody: {
    height: "35%",
    width: "90%",
    backgroundColor: "#345577",
    borderRadius: 20,
  },
  tutorialImage: {
    flexDirection: "row",
    height: "65%",
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageTuto1: {
    flex: 2,
    height: 300,
    marginRight: 5,
  },
  imageTuto2: {
    flex: 2,
    height: 300,
  },
  imageTutoOnly: {
    resizeMode: "contain",
    height: 300,
  },
});
