import {Scene} from 'phaser'
import Player from '../Player'
import Enemy from "../Enemy";

export class Level1 extends Scene {

    constructor() {
        super('Level1');
    }

    preload() {
        this.load.image('background', 'images/background.png');
        this.load.image('spaceship','images/spaceship.png');
        this.load.image('green_enemy','images/green_enemy.png');
        this.load.image('green_ball','images/green_ball.png');
        this.load.image('ball','images/ball.png');
    }

    create() {
        this.physics.world.setBoundsCollision(true, true, false, false);

        this.add.image(400, 250, 'background');

        this.score = 0;

        this.scoreText = this.add.text(16, 16, 'POINTS: '+ this.score, { font: "25px Arial Black", fill: "#fff" }).setScrollFactor(0);
        this.scoreText.setStroke('#00f', 5);
        this.scoreText.setShadow(2, 2, "#333333", 2, true, true);
        this.scoreText.depth=99;

        this.player = new Player(this,400,400, 'spaceship');

        this.player.setCollideWorldBounds(true);

        this.enemies = [];

        let columns = Phaser.Math.Between(4, 6);
        let rows = Phaser.Math.Between(2, 3);
        for(let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                let type = (Phaser.Math.Between(1, 2) === 1) ? 'enemy' : 'green_enemy';
                let enemy = new Enemy(this, 100 * (i+1), 75 * (j+1), 100, 1000, 50, type);
                this.physics.add.overlap(this.player, enemy, this.player.death,null,this);
                enemy.setCollideWorldBounds(true);
                this.enemies.push(enemy);
            }
        }
        
    }

    update (time, delta)
    {
        this.player.update(time,delta);
        this.updateEnemies(time, delta);
    }

    addPlayerShootingPhysics(playerShoot) {
        for(let index = 0; index < this.enemies.length; index++) {
            this.physics.add.overlap(playerShoot, this.enemies[index], this.enemies[index].isHit, null, this);
        }
    }

    addEnemyShootingPhysics(enemyShoot) {
        this.physics.add.overlap(this.player, enemyShoot, this.player.death, null, this);
    }

    updateEnemies(time, delta) {
        for(let index = 0; index < this.enemies.length; index++) {
            if (this.enemies[index].isDeath()) {
                this.score += this.enemies[index].getEnemyPoints();
                this.scoreText.text = 'POINTS: ' + this.score;
                this.enemies.splice(index, 1);
            } else {
                this.enemies[index].update(time,delta);
            }
        }
        if (this.enemies.length === 0) {
            this.scene.start("Win");
        }
    }

    gameOver() {
        this.scene.start("GameOver");
    }

    restartScene() {
        this.scene.restart();
    }
}