import { Physics } from 'phaser'
import EnemyShoot from "./EnemyShoot";

export default class Enemy extends Physics.Arcade.Sprite
{
    constructor(scene,x,y, counterX, counterY, commonVelocity, type) {
        super(scene, x, y, type);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.allowGravity = false;

        this.counterX = counterX;
        this.counterY = counterY;
        this.velocity = commonVelocity;
        this.setVelocityX(this.velocity);

        this.type = type;
        this.coolDown = this.getCoolDown();

        this.life = 1;
    }

    getCoolDown() {
        let coolDown = 0;
        if (this.type === "enemy") {
            coolDown = Phaser.Math.Between(800, 1400);
        } else {
            coolDown = Phaser.Math.Between(400, 700);
        }
        return coolDown;
    }

    update(time,delta)
    {
        if (this.counterX === 0) {
            this.counterX = 100;
            this.velocity = -this.velocity;
            this.setVelocityX(this.velocity);
        } else {
            this.counterX--;
        }

        if (this.counterY > 0) {
            this.counterY--;
        } else {
            this.y += 25;
            this.counterY = 600;
        }

        if (this.coolDown === 0) {
            this.scene.addEnemyShootingPhysics(new EnemyShoot(this.scene, this.x, this.y))
            this.coolDown = this.getCoolDown();
        } else {
            this.coolDown--;
        }

        if (this.y >= 375) {
            this.scene.gameOver();
        }
    }

    isHit(sprite1, sprite2) {
        sprite2.life--;
        if (sprite2.life <= 0){
            sprite2.destroy();
        }
    }

    isDeath() {
        return this.life <= 0 ;
    }

    getEnemyPoints() {
        return (this.type === 'enemy') ? 5 : 10;
    }

}