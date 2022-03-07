
export class Level1 extends Phaser.Scene {

    constructor() {
        super({key: 'level1'});
    }

    preload() {
        this.load.image('background', 'images/background.png');
        this.load.image('gameOver', 'images/game-over.png');
        this.load.image('platform', 'images/cloud-platform.png');
        this.load.image('ball', 'images/ball.png');
    }

    create() {
        this.physics.world.setBoundsCollision(true, true, true, false);

        this.add.image(400, 250, 'background');

        this.gameOver = this.add.image(400,191, 'gameOver');
        this.gameOver.visible = false;

        this.platform = this.physics.add.image(400, 460, 'platform').setImmovable();
        this.platform.body.allowGravity = false;
        this.platform.setCollideWorldBounds(true);

        this.ball = this.physics.add.image(400, 30, 'ball');
        this.ball.setCollideWorldBounds(true);

        let velocity = 100 * Phaser.Math.Between(1.2, 2);
        if (Phaser.Math.Between(0, 10) > 5) {
            velocity = 0 - velocity;
        }
        this.ball.setVelocity(velocity, 10);
        this.ball.setBounce(1.02);

        this.physics.add.collider(this.platform, this.ball);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.score = 0;

        this.scoreText = this.add.text(16, 16, 'POINTS: '+ this.score, { font: "25px Arial Black", fill: "#fff" }).setScrollFactor(0);
        this.scoreText.setStroke('#00f', 5);
        this.scoreText.setShadow(2, 2, "#333333", 2, true, true);
        this.scoreText.depth=99;

        this.triggerTimer = this.time.addEvent({
            callback: this.timerEvent,
            callbackScope: this,
            delay: 100, // 1000 = 1 second
            loop: true
        });
    }

    update (time, delta)
    {
        if (this.cursors.left.isDown) {
            this.platform.setVelocityX(-400);
        } else if (this.cursors.right.isDown) {
            this.platform.setVelocityX(400);
        } else {
            this.platform.setVelocityX(0);
        }

        if (this.ball.y > 500) {
            this.gameOverMenu()
        }

    }

    timerEvent() {
        if (this.ball.y < 500) {
            this.score += 1;
            this.scoreText.setText('POINTS: ' + this.score);
        }
    }

    gameOverMenu() {
        this.gameOver.visible = true;
        this.reload_button = this.add.text(300, 321, 'Restart', {
            fontSize: '48px',
            fill: '#000',
            fontFamily: 'verdana, arial, sans-serif'
        }).setScrollFactor(0);

        this.reload_button.setInteractive()
            .on('pointerdown', () => this.restartScene());
    }

    restartScene() {
        this.scene.restart();
    }
}