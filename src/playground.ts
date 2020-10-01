import {GridPointer} from './grid-pointer';
import {Interactions} from './interactions.interface';
import {Shape} from './shape';
import {Line} from './shapes/line';

export class Playground implements Interactions {
    private playground: Array<GridPointer>;
    public shapePlayground: Array<GridPointer>;
    private shape: Shape;
    public rows: number;
    public cols: number;

    constructor(rows: number,
        cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.playground = new Array<GridPointer>();
        this.shapePlayground = new Array<GridPointer>();
        this.shape = new Line(this);
        this.shape.initPointer();
        this.shape.drawShape();
    }

    public getPlayground(): Array<GridPointer> {
        return Object.assign(this.playground, this.shapePlayground);
    }

    public getCurrentShapeOnPlayground() {
        return this.shapePlayground;
    }

    public getCurrentShape() {
        return this.shape;
    }

    rotateLeft(): void {
        throw new Error('Method not implemented.');
    }
    rotateRight(): void {
        throw new Error('Method not implemented.');
    }
    moveRight(): void {
        throw new Error('Method not implemented.');
    }
    moveLeft(): void {
        throw new Error('Method not implemented.');
    }
    moveDown(): void {
        throw new Error('Method not implemented.');
    }
}