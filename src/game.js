class Game {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.player = SaveSystem.loadGame() || new Player(100, 100);
        this.enemies = [new Enemy(300, 200), new Enemy(500, 400)];
        this.running = false;
    }

    start() {
        document.getElementById("ui").style.display = "none";
        this.canvas.style.display = "block";
        this.running = true;
        this.loop();
    }

    loop() {
        if (!this.running) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.update();
        this.player.draw(this.ctx);
        this.enemies.forEach(enemy => {
            enemy.update();
            enemy.draw(this.ctx);
        });
        SaveSystem.saveGame(this.player);
        requestAnimationFrame(() => this.loop());
    }
}

const game = new Game();
document.getElementById("startGame").addEventListener("click", () => game.start());
