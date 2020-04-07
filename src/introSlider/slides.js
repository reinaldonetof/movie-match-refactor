import nomeApp from "../assets/logo/NOME_APLICATIVO.png";
import logoApp from "../assets/logo/LOGO_SEMFUNDO_APLICATIVO.png";

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
import screen13 from "./assets/screen13.png";

const slides = [
  {
    key: "tela-inicial",
    title: "Tela Inicial",
    imagem: init,
    imagem2: screen2,
    text: "Na tela inicial, você poderá começar um “Novo Projeto” e aparecerá a aba lateral",
    colors:["#A3A1FF", "#3A3897"],
  },
  {
    key: "adicionando-video",
    title: "Adicionando o vídeo",
    imagem: screen3,
    imagem2: screen4,
    text: "Você será levado para a área de procurar o vídeo na galeria, selecioná-lo e confirmar",
    colors:["#A3A1FF", "#3A3897"],
  },
  {
    key: "video-confirmado",
    title: "Após confirmar o vídeo",
    imagem: screen5,
    text: "Na tela inicial, a aba lateral sinaliza como concluída a busca de vídeo, agora precisa adicionar a legenda do vídeo",
    colors:["#A3A1FF", "#3A3897"],
  },
  {
    key: "adicionando-legenda",
    title: "Menu da Letra",
    imagem: screen6,
    text: "Aqui, há dois botões: “Inserir a letra” e “Buscar na internet”.",
    colors:["#A3A1FF", "#3A3897"],
  },
  {
    key: "buscando-internet",
    title: "Buscando na internet",
    imagem: screen7,
    imagem2: screen8,
    text: "Você terá acesso aos principais sites de letras de música. Ao selecionar o site, basta buscar pela música que deseja legendar, selecioná-la e copiar",
    colors:["#A3A1FF", "#3A3897"],
  },
  {
    key: "inserindo_legenda",
    title: "Inserindo a legenda",
    imagem: screen6,
    imagem2: screen9,
    text: "Após copiar a letra, basta voltar para o Menu da Letra e pressionar em “Inserir a Letra”. Aqui você irá pressionar “Cole aqui” e caso queira, poderá manipular o texto.",
    colors:["#A3A1FF", "#3A3897"],
  },
  {
    key: "tudo_pronto",
    title: "Tudo pronto",
    imagem: screen10,
    text: "Após confirmar o vídeo e a letra, na aba lateral você irá ver que ambos estão sinalizados e verificados. Ao pressionar “Ação”, você irá para a área de sincronização.",
    colors:["#A3A1FF", "#3A3897"],
  },
  {
    key: "tela_sincronizacao",
    title: "Tela de Sincronização",
    imagem: screen11,
    imagem2: screen12,
    text: "Pressionando “Let's Rock” o vídeo será iniciado e novos botões irão aparecer.",
    colors:["#A3A1FF", "#3A3897"],
  },
  {
    key: "tela_sincronizacao",
    title: "Botões da Tela de Sincronização",
    imagem: screen13,
    text: "",
    colors:["#A3A1FF", "#3A3897"],
  },
];

const initial = [
  {
    key: "init",
    title: "",
    imagem: nomeApp,
    imagem2: logoApp,
    text: "",
    colors:["#A3A1FF", "#3A3897"],
  },
];

export {
  slides,
  initial,
};