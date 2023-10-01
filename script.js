const canvas = document.querySelector('#js-canvas');
const ctx = canvas.getContext('2d');

// Rectangles
// ctx.fillStyle = "rgb(200, 0, 0)";
// ctx.fillRect(10, 10, 50, 50);

// ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
// ctx.fillRect(30, 30, 50, 50);
// console.log(ctx.width);

// const x = 100;
// const y = 10;

// ctx.fillRect(x, y, 100, 100);
// ctx.clearRect(x + 20, y + 20, 60, 60);
// ctx.strokeRect(x + 25, y + 25, 50, 50);

const pointOne = new Vector(270, 270);
const objects = [];

for (let i = 0; i < 7; i++) {
    const circle = new Circle(pointOne.x, pointOne.y, randomMinMax(0, 25), ctx, canvas.getBoundingClientRect());
    objects.push(circle);
}

const animation = () => {
    ctx.clearRect(0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
    objects.forEach(obj => {
        obj.update();
    });
    window.requestAnimationFrame(animation);
}

window.requestAnimationFrame(animation);