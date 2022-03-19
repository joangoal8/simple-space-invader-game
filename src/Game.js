import {StartScene} from "./scenes/StartScene";
import {Level1} from "./scenes/Level1";
import {GameOver} from "./scenes/GameOver";
import {Win} from "./scenes/Win";

let windows = {width: 800, height: 480}
let config = {
    type: Phaser.AUTO,
    width: windows.width,
    height: windows.height,
    parent: "canvas",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scene: [StartScene,Level1,GameOver,Win],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug:true
        }
    }
};

let game = new Phaser.Game(config);

