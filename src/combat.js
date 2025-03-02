class Combat {
    static attack(player, enemy) {
        enemy.health -= 10;
        if (enemy.health <= 0) {
            player.experience += 20;
            if (player.experience >= 100) {
                player.levelUp();
            }
        }
    }
}

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.health = 50;
    }

    update() {
        // AI movement logic
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, 50, 50);
    }
}
