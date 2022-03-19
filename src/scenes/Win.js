import {Scene} from 'phaser'

export class Win extends Scene
{
    constructor()
    {
        super('Win');
    }

    preload ()
    {
        this.load.image('background', 'images/background.png');
    }

    create ()
    {
        this.add.image(400, 250, 'background');

        let winTitleText  = this.add.text(200, 150, "You Win");
        winTitleText.setFontSize(82);
        winTitleText.setFill('#000');
        winTitleText.setScrollFactor(0);

        let restartGameText  = this.add.text(100, 300, "Press enter to play again");
        restartGameText.setFontSize(35);
        restartGameText.setFill('#000');
        restartGameText.setScrollFactor(0);

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