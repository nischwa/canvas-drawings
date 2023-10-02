import { IBasicDrawingObject } from "./interfaces";

export function randomMinMax(min, max) {
    return Math.random() * (max - min) + min;
}