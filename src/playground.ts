import {GridPointer} from './grid-pointer';
import {Interactions} from './interactions.interface';
import {Shape} from './shape';
import {Block} from './shapes/block';
import {LMirrorShape} from './shapes/l-mirror-shape';
import {LShape} from './shapes/l-shape';
import {Line} from './shapes/line';
import {SShape} from './shapes/s-shape';
import {TShape} from './shapes/t-shape';
import {ZShape} from './shapes/z-shape';

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
        this.insertNewShape();
    }

    public insertNewShape(): void {
        this.shape = this.getRandomShape();
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
    public rotate(): void {
        this.shape.rotate();
        this.shape.drawShape();
    }
    public moveRight(): void {
        this.shape.moveRight();
        this.shape.drawShape();
    }
    public moveLeft(): void {
        this.shape.moveLeft();
        this.shape.drawShape();
    }
    public moveDown(): void {
        this.shape.moveDown();
        this.shape.drawShape();
    }

    private getRandomShape(): Shape {
        switch(Math.round(Math.random()*6)) {
            case 0:
                return new Block(this);
            break;
            case 1:
                return new LMirrorShape(this);
            break;
            case 2:
                return new LShape(this);
            break;
            case 3:
                return new Line(this);
            break;
            case 4:
                return new SShape(this);
            break;
            case 5:
                return new TShape(this);
            break;
            case 6:
                return new ZShape(this);
            break;
        }
    }
}