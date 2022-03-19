import {Scene} from 'phaser'

export class GameOver extends Scene
{
    constructor()
    {
        super('GameOver');
    }

    preload ()
    {
        this.load.image('background', 'images/background.png');
        this.load.image('gameOver', 'images/game-over.png');
    }

    create ()
    {
        this.add.image(400, 250, 'background');
        this.gameOver = this.add.image(400,191, 'gameOver');

        this.reload_button = this.add.text(300, 321, 'Restart', {
            fontSize: '48px',
            fill: '#000',
            fontFamily: 'verdana, arial, sans-serif'
        }).setScrollFactor(0);

        this.reload_button.setInteractive()
            .on('pointerdown', () => this.scene.start("Level1"));
    }

    update(time,delta)
    {

    }

}