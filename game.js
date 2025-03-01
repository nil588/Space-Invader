let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let player;
let cursors;
let bullets;
let enemies;
let score = 0;
let level = 1;
let gameOver = false;
let bulletSound;
let enemyDeathSound;
let music;

let game = new Phaser.Game(config);

function preload() {
    // Load assets
    this.load.image('player', 'assets/player.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.audio('bulletSound', 'assets/bulletSound.mp3');
    this.load.audio('enemyDeathSound', 'assets/enemyDeathSound.mp3');
    this.load.audio('backgroundMusic', 'assets/backgroundMusic.mp3');
    this.load.spritesheet('explosion', 'assets/explosion.png', { frameWidth: 64, frameHeight: 64 });
}

function create() {
    // Music
    music = this.sound.add('backgroundMusic');
    music.play({ loop: true });

    // Player Setup
    player = this.physics.add.image(400, 500, 'player');
    player.setCollideWorldBounds(true);

    // Bullet Setup
    bullets = this.physics.add.group({
        defaultKey: 'bullet',
        maxSize: 10
    });

    // Enemies Setup
    enemies = this.physics.add.group();
    spawnEnemies(this);

    // Input Controls
    cursors = this.input.keyboard.createCursorKeys();

    // Sound Effects
    bulletSound = this.sound.add('bulletSound');
    enemyDeathSound = this.sound.add('enemyDeathSound');

    // Animation
    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 0
    });

    // Collision Detection
    this.physics.add.overlap(bullets, enemies, hitEnemy, null, this);
}

function update() {
    if (gameOver) return;

    // Player Movement
    if (cursors.left.isDown) {
        player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
        player.setVelocityX(200);
    } else {
        player.setVelocityX(0);
    }

    // Shooting
    if (cursors.space.isDown && bullets.getLength() < 10) {
        let bullet = bullets.getFirstDead();
        if (!bullet) return;

        bullet.setActive(true).setVisible(true);
        bullet.setPosition(player.x, player.y - 20);
        bullet.setVelocityY(-400);

        bulletSound.play();
    }

    // Update Score and Level UI
    updateUI();

    // Check Game Over (if all enemies are destroyed)
    if (enemies.countActive() === 0) {
        level++;
        spawnEnemies(this);
    }
}

function spawnEnemies(scene) {
    for (let i = 0; i < level * 3; i++) {
        let enemy = scene.physics.add.image(Phaser.Math.Between(50, 750), Phaser.Math.Between(50, 150), 'enemy');
        enemy.setVelocity(Phaser.Math.Between(-50, 50), 50);
        enemies.add(enemy);
    }
}

function hitEnemy(bullet, enemy) {
    bullet.setActive(false).setVisible(false);
    enemy.setActive(false).setVisible(false);

    // Explosion Animation
    let explosion = this.physics.add.sprite(enemy.x, enemy.y, 'explosion');
    explosion.play('explode');
    explosion.on('animationcomplete', () => {
        explosion.destroy();
    });

    enemyDeathSound.play();

    // Increase Score
    score += 10;
    if (score % 100 === 0) {
        level++;
    }
}

function updateUI() {
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('level').textContent = `Level: ${level}`;
}
