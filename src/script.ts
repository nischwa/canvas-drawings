import { DrawingContext, Vector, Circle, RandomVector, InterConnectionObserver } from './objects';
import { randomMinMax } from './utils';

const canvas: HTMLCanvasElement = document.querySelector('#js-canvas')!;
const ctx: CanvasRenderingContext2D = canvas?.getContext('2d')!;
const {width, height} = canvas.getBoundingClientRect();

const myContext = new DrawingContext(ctx, canvas);
const connector = new InterConnectionObserver();

// Fill drawing context with circles
for (let i = 0; i < 15; i++) {
    // const start = new Vector(randomMinMax(100, 500), randomMinMax(100, 500));
    const start = new Vector(width * 0.5, height * 0.5);
    const circle = new Circle(
        start.x, 
        start.y, 
        randomMinMax(1, 25), 
        ctx, 
        canvas.getBoundingClientRect()
    );
    myContext.addObject(circle);
    connector.addObject(circle);
}

connector.update();
const animation = () => {
    myContext.animate();
    connector.update();
    window.requestAnimationFrame(animation);
}

// start the animation
window.requestAnimationFrame(animation);