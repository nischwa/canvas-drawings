function randomMinMax(min, max) {
    return Math.random() * (max - min) + min;
}

class Circle {
    constructor(x, y, radius, ctx, boundaries) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.ctx = ctx;
        this.borders = boundaries;

        this.draw();
        this.velocity = new RandomVector(4);
    }

    update() {
        this.collisionDetection();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw();
        this.lineTo();
    }

    collisionDetection() {
        // bounce from left or right border
        if ((this.x < this.radius) || (this.x > this.borders.width - this.radius)) {
            this.velocity.x *= -1;
        }

        // bounce from upper or bottom border
        if ((this.y < this.radius) || (this.y > this.borders.height - this.radius)) {
            this.velocity.y *= -1;
        }
    }

    lineTo() {
        this.ctx.save();
        ctx.strokeStyle = "lightgray";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.borders.width / 2, this.borders.height / 2);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(0, 0);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.borders.width, 0);
        ctx.stroke();
        this.ctx.restore();
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    clear() {
        this.ctx.clearRect(this.x - this.radius - 1, this.y - this.radius - 1, (this.radius + 1) * 2, (this.radius + 1) * 2);
    }
}

class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

class RandomVector {
    constructor(range = 1) {
        this.x = randomMinMax(0, range) * (Math.random() > 0.5 ? 1 : -1);
        this.y = randomMinMax(0, range) * (Math.random() > 0.5 ? 1 : -1);
    }
}