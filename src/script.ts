import { DrawingContext, Vector, Circle } from './objects';
import { randomMinMax } from './utils';

const canvas: HTMLCanvasElement = document.querySelector('#js-canvas')!;
const ctx: CanvasRenderingContext2D = canvas?.getContext('2d')!;


const startPoint = new Vector(270, 270);
const myContext = new DrawingContext(ctx, canvas);

// Fill drawing context with circles
for (let i = 0; i < 5; i++) {
    const circle = new Circle(
        startPoint.x, 
        startPoint.y, 
        randomMinMax(0, 25), 
        ctx, 
        canvas.getBoundingClientRect()
    );
    myContext.addObject(circle);
}

const animation = () => {
    myContext.animate()
    window.requestAnimationFrame(animation);
}

// start the animation
window.requestAnimationFrame(animation);