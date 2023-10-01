const canvas = document.querySelector('#js-canvas');
const ctx = canvas.getContext('2d');

class DrawingContext {
    constructor(context, canvas, backgroundColor = 'white') {
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

const startPoint = new Vector(270, 270);
const myContext = new DrawingContext(ctx, canvas);

// Fill drawing context with circles
for (let i = 0; i < 7; i++) {
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