import { version } from "esbuild";
import { Vector } from "./objects";

const canvas: HTMLCanvasElement = document.querySelector('#js-canvas')!;
const ctx: CanvasRenderingContext2D = canvas?.getContext('2d')!;

interface Triangle {
    a: Vector,
    b: Vector,
    c: Vector
}

class Mesh {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    size: number;
    columns: number;
    lines: Vector[][];
    gap: number;
    constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, columns: number) {
        this.ctx = context;
        this.canvas = canvas;
        this.size = canvas.getBoundingClientRect().width;
        this.columns = columns;
        this.gap = this.size / this.columns;
        console.log(this.gap);
        this.lines = [];

        this.createGrid();
        this.drawGrid();
        this.connectDots();
    }

    createGrid() {
        let odd = false;
        for(let y = this.gap / 2; y <= this.size; y+= this.gap) {
            odd = !odd;
            const line: Vector[] = [];
            for (var x = this.gap / 2; x <= this.size; x+= this.gap) {
                const modX = x + (Math.random()*.8 - .4) * this.gap + (odd ? this.gap / 2 : 0);
                const modY = y + (Math.random()*.8 - .4) * this.gap
                line.push(new Vector(modX, modY));
            }
            this.lines.push(line);
          }
    }

    drawGrid() {
        this.lines.forEach((line: Vector[], row) => {
            line.forEach((vector: Vector, col) => {
                this.ctx.beginPath();
                this.ctx.arc(vector.x, vector.y, 3, 0, 2 * Math.PI, true);
                // this.ctx.fillText(`row:${row}, col:${col}`, vector.x, vector.y);
                this.ctx.fill();
            })
        })
    }

    connectDots() {
        for(let row = 0; row < this.lines.length - 1; row++) {
            const odd = (row + 1) % 2 !== 0;
            const dotLine: Vector[] = [];

            for(let col = 0; col < this.lines[row].length; col++) {
                if (odd) {
                    dotLine.push(this.lines[row + 1][col]);
                    dotLine.push(this.lines[row][col]);
                } else {
                    dotLine.push(this.lines[row][col]);
                    dotLine.push(this.lines[row+1][col]);
               }
            }

            for(let i = 0; i < dotLine.length - 2; i++) {
              this.drawTriangle(dotLine[i], dotLine[i+1], dotLine[i+2]);
            }
          }
    }

    drawTriangle(pointA, pointB, pointC) {
        this.ctx.save()
        const gray = Math.floor(Math.random()*16).toString(16);
        this.ctx.beginPath();
        this.ctx.moveTo(pointA.x, pointA.y);
        this.ctx.lineTo(pointB.x, pointB.y);
        this.ctx.lineTo(pointC.x, pointC.y);
        this.ctx.lineTo(pointA.x, pointA.y);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fillStyle = '#' + gray + gray + gray; 
        this.ctx.fill();
        this.ctx.restore();
      }


}

const mesh = new Mesh(ctx, canvas, 10);