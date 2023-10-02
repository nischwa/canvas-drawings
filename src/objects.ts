import { IBasicDrawingObject } from "./interfaces";
import { randomMinMax } from "./utils";

export class DrawingContext {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    backgroundColor: string;
    objects: any[];
    constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, backgroundColor: string = 'white') {
        this.ctx = context;
        this.width = canvas.getBoundingClientRect().width;
        this.height = canvas.getBoundingClientRect().height;
        this.backgroundColor = backgroundColor;
        this.objects = [];
        // Bind this to methods
        this.animate = this.animate.bind(this);
    }

    addObject(obj) {
        this.objects.push(obj);
    }

    clear() {
        this.ctx.save();
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.restore();
    }

    animate() {
        this.clear();
        this.objects?.forEach((obj) => {
            // Assuming each of our canvas objects has an update method
            obj?.update();
        })
    }
}

export class Circle {
    x: number;
    y: number;
    radius: number;
    ctx: CanvasRenderingContext2D;
    borders: any;
    velocity: RandomVector;
    
    constructor(x: number, y: number, radius, ctx, boundaries) {
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

    lineTo(x: number, y: number) {
        this.ctx.save();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "lightgray";
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.ctx.restore();
    }

    draw() {
        this.ctx.save()
        this.ctx.strokeStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.restore()
    }

    clear() {
        this.ctx.clearRect(this.x - this.radius - 1, this.y - this.radius - 1, (this.radius + 1) * 2, (this.radius + 1) * 2);
    }
}

export class InterConnectionObserver {
    objects: IBasicDrawingObject[];

    constructor(objects?: IBasicDrawingObject[]) {
        this.objects = objects || [];
    }

    addObject(obj: any) {
        this.objects.push(obj);
    }

    getDistance(a: IBasicDrawingObject, b: IBasicDrawingObject): number {
        const vectorA = new Vector(a.x, a.y);
        const vectorB = new Vector(b.x, b.y);
        const deltaX = Math.abs(vectorA.x - vectorB.x);
        const deltaY = Math.abs(vectorA.y - vectorB.y);
        
        return Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
    }

    update() {
        this.objects.forEach((obj, index) => {
            const current: IBasicDrawingObject = obj;
            const others: IBasicDrawingObject[] = this.objects.slice(index + 1, this.objects.length);
            others.forEach(other => {
                const distance = this.getDistance(current, other);
                if (distance < 100) {
                    current.lineTo(other.x, other.y);
                }
            })
        })
    }
}

export class Vector {
    x: number;
    y: number;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

export class RandomVector {
    x: number;
    y: number;
    constructor(range = 1) {
        this.x = randomMinMax(0, range) * (Math.random() > 0.5 ? 1 : -1);
        this.y = randomMinMax(0, range) * (Math.random() > 0.5 ? 1 : -1);
    }
}