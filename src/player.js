class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = 5;
        this.jumpPower = 10;
        this.gravity = 0.5;
        this.velocityY = 0;
        this.onGround = false;
        this.health = 100;
        this.level = 1;
        this.experience = 0;
        this.inventory = [];
    }

    update() {
        if (keys["ArrowRight"]) this.x += this.speed;
        if (keys["ArrowLeft"]) this.x -= this.speed;
        if (keys[" "]) this.jump();
        this.applyGravity();
    }

    jump() {
        if (this.onGround) {
            this.velocityY = -this.jumpPower;
            this.onGround = false;
        }
    }

    applyGravity() {
        this.y += this.velocityY;
        this.velocityY += this.gravity;
        if (this.y >= window.innerHeight - this.height) {
            this.y = window.innerHeight - this.height;
            this.onGround = true;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const keys = {};
window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);
