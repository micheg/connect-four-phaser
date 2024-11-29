import Phaser from "phaser";
import ConnectFourScene from "./scenes/ConnectFourScene.js";

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720,
  },
  scene: [ConnectFourScene],
  backgroundColor: 0xd3d3d3, // Grigio chiaro (hexadecimal: #D3D3D3)
  parent: "game-container",
};

new Phaser.Game(config);

function checkOrientation() {
  if (window.innerWidth < window.innerHeight) {
    // Dispositivo in modalità verticale
    document.getElementById("orientation-warning").style.display = "flex";
  } else {
    // Dispositivo in modalità orizzontale
    document.getElementById("orientation-warning").style.display = "none";
  }
}

// Controlla l'orientamento al caricamento e quando cambia
window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
