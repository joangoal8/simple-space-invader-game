import Phaser from 'phaser'

import { Level1 } from './scenes/Level1'

class GameController {

    constructor(windows)
    {
        this.levelIndex = 0;
        this.configs = [
            {
                type: Phaser.AUTO,
                width: windows.width,
                height: windows.height,
                parent: "canvas",
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                scene: [Level1],
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y : 400},
                        debug: false
                    }
                },
            }
        ];
        this.game = new Phaser.Game(this.configs[this.levelIndex]);
    }

    getLevel() {
        return this.game;
    }

}

const gameControllerInstance = new GameController({width: 800, height: 480});
export default gameControllerInstance;

