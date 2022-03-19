import { Physics } from 'phaser'

export default class PlayerShoot extends Physics.Arcade.Sprite
{
    constructor(scene,x,y) {
        super(scene, x, y, 'green_ball');
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.allowGravity = false;

        this.setVelocityY(-100);
    }

    reachTarget(sprite1, sprite2) {
        sprite1.visible = false;
        sprite1.destroy();
    }

    update(time,delta)
    {

    }

}