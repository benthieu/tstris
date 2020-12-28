import {Observable} from 'rxjs';
import {Events} from './events';
import {GridPointer} from './grid-pointer';
import {Interactions} from './interactions.interface';
import {ShapeContainer} from './shape-container';
import {tsConfig} from './ts-config';

export class Playground implements Interactions {
    private allPointers: Array<GridPointer>;
    private shape: ShapeContainer;
    private events: Events;

    constructor() {
        this.events = new Events(this);
    }

    public startNewGame(): void {
        this.allPointers = new Array<GridPointer>();
        this.insertNewShape();
    }

    public subscribeToChanges(): Observable<boolean> {
        return this.events.subscribeToChanges();
    }

    public insertNewShape(): void {
        this.shape = this.getRandomShape();
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

    private detectCollisionOrOutOfBounds(shape: ShapeContainer): boolean {
        const outOfBounds = shape.calculateCoordinates().find((pointer: GridPointer) => {
            return (
                (pointer.x < 0) ||
                (pointer.x >= tsConfig.cols) ||
                (pointer.y >= tsConfig.rows)
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
        for (let row = 0; row < tsConfig.rows; row++) {
            const foundPointers = this.allPointers.filter((playgroundPointer: GridPointer) => {
                return playgroundPointer.y === row;
            });
            if (foundPointers.length === tsConfig.cols) {
                fullLines.push(row);
            }
        }
        return fullLines;
    }

    private getRandomShape(): ShapeContainer {
        const shape = tsConfig.shapes[Math.round(Math.random() * 6)];
        return new ShapeContainer(shape.rotations, shape.size, shape.color);
    }
}