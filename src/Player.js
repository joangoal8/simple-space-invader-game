import { Physics } from 'phaser'
import PlayerShoot from "./PlayerShoot";

export default class Player extends Physics.Arcade.Sprite
{
    constructor(scene,x,y,sprite) {
        super(scene, x, y, sprite);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.allowGravity = false;
        this.keys = this.scene.input.keyboard.createCursorKeys();

        this.coolDown = 50;
    }

    update(time,delta)
    {
        if (this.keys.left.isDown) {
            this.setVelocityX(-400);
        } else if (this.keys.right.isDown) {
            this.setVelocityX(400);
        } else {
            this.setVelocityX(0);
        }

        if(this.keys.space.isDown && this.coolDown === 50) {
            this.coolDown = 0;
            this.scene.addPlayerShootingPhysics(new PlayerShoot(this.scene, this.x, this.y));
        }

        if (this.coolDown < 50) {
            this.coolDown++;
        }
    }

    death(sprite1, sprite2) {
        sprite1.scene.gameOver();
    }
}