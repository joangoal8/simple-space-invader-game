import { Physics } from 'phaser'

export default class EnemyShoot extends Physics.Arcade.Sprite
{
    constructor(scene,x,y) {
        super(scene, x, y, 'ball');
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.allowGravity = false;

        this.setVelocityY(60);
    }

    update(time,delta)
    {

    }

}