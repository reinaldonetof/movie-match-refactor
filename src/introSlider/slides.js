import nomeApp from "../assets/logo/NOME_APLICATIVO.png";
import logoApp from "../assets/logo/LOGO_APLICATIVO.png";

import init from "./assets/init.jpg";
import screen2 from "./assets/screen2.jpg";
import screen3 from "./assets/screen3.jpg";
import screen4 from "./assets/screen4.jpg";
import screen5 from "./assets/screen5.jpg";
import screen6 from "./assets/screen6.jpg";
import screen7 from "./assets/screen7.jpg";
import screen8 from "./assets/screen8.jpg";
import screen9 from "./assets/screen9.jpg";
import screen10 from "./assets/screen10.jpg";
import screen11 from "./assets/screen11.jpg";
import screen12 from "./assets/screen12.jpg";

const slides = [
  {
    key: "tela-inicial",
    title: "Tela Inicial",
    imagem: init,
    imagem2: screen2,
    text: "Na tela inicial, você poderá começar um Novo Projeto e aparecerá a aba lateral",
    colors: ["#A3A1FF", "#3A3897"],
  },
  {
    key: "adicionando-video",
    title: "Adicionando o vídeo",
    imagem: screen3,
    imagem2: screen4,
    text: "Você será levado para a área de procurar o vídeo na galeria, selecioná-lo e confirmar",
    colors: ["#29ABE2", "#4F00BC"],
  },
];

const initial = [
  {
    key: "init",
    title: "Seja bem-vindo ao",
    imagem: nomeApp,
    imagem2: logoApp,
    text: "",
    colors: ["#63E2FF", "#B066FE"],
  },
];

export {
  slides,
  initial,
};
