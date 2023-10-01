export interface IBasicDrawingObject {
    x: number;
    y: number;
    update(): void;
    lineTo(x: number, y: number): void;
}