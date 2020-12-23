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
    private allPointers: Array<GridPointer>;
    private shape: Shape;
    public rows: number;
    public cols: number;

    constructor(rows: number,
        cols: number) {
        this.rows = rows;
        this.cols = cols;
    }

    public startNewGame(): void {
        this.allPointers = new Array<GridPointer>();
        this.insertNewShape();
    }

    public insertNewShape(): void {
        this.shape = this.getRandomShape();
        this.shape.setPlayground(this);
        this.shape.initPointer();
        if (this.detectCollisionOrOutOfBounds(this.shape)) {
            this.startNewGame();
        }
    }

    public getPlayground(): Array<GridPointer> {
        return [
            ...this.allPointers,
            ...this.shape.calculateCoordinates()
        ];
    }

    public getCurrentShape() {
        return this.shape;
    }
    public moveRight(): void {
        if (!this.detectCollisionOrOutOfBounds(this.shape.copy().moveRight())) {
            this.shape.moveRight();
        }
    }
    public moveLeft(): void {
        if (!this.detectCollisionOrOutOfBounds(this.shape.copy().moveLeft())) {
            this.shape.moveLeft();
        }
    }
    public moveDown(): void {
        if (!this.detectCollisionOrOutOfBounds(this.shape.copy().moveDown())) {
            this.shape.moveDown();
        } else {
            this.allPointers.push(...this.shape.calculateCoordinates());
            this.detectAndRemoveFullLine();
            this.insertNewShape();
        }
    }

    public rotate(): void {
        const tempShape = this.shape.copy();
        tempShape.rotate();
        if (!this.detectCollisionOrOutOfBounds(tempShape)) {
            this.shape.rotate();
        }
        else if (!this.detectCollisionOrOutOfBounds(tempShape.copy().moveRight())) {
            this.shape.moveRight();
            this.shape.rotate();
        }
        else if (!this.detectCollisionOrOutOfBounds(tempShape.copy().moveLeft())) {
            this.shape.moveLeft();
            this.shape.rotate();
        }
        else if (!this.detectCollisionOrOutOfBounds(tempShape.copy().moveRight().moveRight())) {
            this.shape.moveRight();
            this.shape.moveRight();
            this.shape.rotate();
        }
        else if (!this.detectCollisionOrOutOfBounds(tempShape.copy().moveLeft().moveLeft())) {
            this.shape.moveLeft();
            this.shape.moveLeft();
            this.shape.rotate();
        }
    }

    private detectCollisionOrOutOfBounds(shape: Shape): boolean {
        const outOfBounds = shape.calculateCoordinates().find((pointer: GridPointer) => {
            return (
                (pointer.x < 0) ||
                (pointer.x >= this.cols) ||
                (pointer.y >= this.rows)
            );
        });
        const collision = shape.calculateCoordinates().find((pointer: GridPointer) => {
            return !!this.allPointers.find((playgroundPointer: GridPointer) => {
                return playgroundPointer.x === pointer.x && playgroundPointer.y === pointer.y;
            })
        });
        return !!outOfBounds || !!collision;
    }

    private detectAndRemoveFullLine(): void {
        this.detectFullLine().forEach((fullRow: number) => {
            this.allPointers = this.allPointers.filter((playgroundPointer: GridPointer) => {
                return playgroundPointer.y !== fullRow;
            });
            this.allPointers = this.allPointers.map((playgroundPointer: GridPointer) => {
                if (playgroundPointer.y < fullRow) {
                    playgroundPointer.y++;
                }
                return playgroundPointer;
            });
        });
    }

    private detectFullLine(): Array<number> {
        const fullLines = new Array<number>();
        for (let row = 0; row < this.rows; row++) {
            const foundPointers = this.allPointers.filter((playgroundPointer: GridPointer) => {
                return playgroundPointer.y === row;
            });
            if (foundPointers.length === this.cols) {
                fullLines.push(row);
            }
        }
        return fullLines;
    }

    private getRandomShape(): Shape {
        switch (Math.round(Math.random() * 6)) {
            case 0: return new Block();
            case 1: return new LMirrorShape();
            case 2: return new LShape();
            case 3: return new Line();
            case 4: return new SShape();
            case 5: return new TShape();
            case 6: return new ZShape();
        }
    }
}