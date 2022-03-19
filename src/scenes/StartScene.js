import {Scene} from 'phaser'

export class StartScene extends Scene
{
    constructor()
    {
        super('StartScene');
    }

    preload ()
    {
        this.load.image('background', 'images/background.png');
        this.load.image('enemy', 'images/enemy.png');
        this.load.image('green_enemy', 'images/green_enemy.png');
    }

    create ()
    {
        let welcomeTxt  = this.add.text(150, 180, "Space Invaders");
        welcomeTxt.setFontSize(60);
        welcomeTxt.setFill('#ff0000');
        welcomeTxt.setScrollFactor(0);

        let startTxt  = this.add.text(150, 280, "Press enter to start the game");
        startTxt.setFontSize(20);
        startTxt.setFill('#fff');
        startTxt.setScrollFactor(0);

        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(time,delta)
    {

        if(this.enter.isDown)
        {
            this.scene.start("Level1");
        }
    }

}