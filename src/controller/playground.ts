import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';
import {Events} from '../interactions/events';
import {GridPointer} from './grid-pointer';
import {Interactions} from '../interactions/interactions.interface';
import {ShapeContainer} from './shape-container';
import {tsConfig} from '../ts-config';
import {ShapePipeline} from './shape-pipeline';

export class Playground implements Interactions {
    private grid: Array<GridPointer>;
    private shape: ShapeContainer;
    private events: Events;
    private score$ = new BehaviorSubject<number>(0);
    private shapePipeLine = new ShapePipeline();

    constructor() {
        this.events = new Events(this);
    }

    public startNewGame(): void {
        this.grid = new Array<GridPointer>();
        this.shapePipeLine.reset();
        this.score$.next(0);
        this.insertNewShape();
    }

    public tick(): Observable<boolean> {
        return this.events.tick();
    }

    public score(): Observable<number> {
        return this.score$.asObservable().pipe(
            distinctUntilChanged()
        );
    }

    public nextShapes(): Observable<Array<number>> {
        return this.shapePipeLine.get();
    }

    public insertNewShape(): void {
        this.shape = this.getShapeByIndex(this.shapePipeLine.getNextShape());
        if (this.detectCollisionOrOutOfBounds(this.shape)) {
            this.startNewGame();
        }
    }

    public getPlayground(): Array<GridPointer> {
        return [
            ...this.grid,
            ...this.shape.calculateCoordinates(),
            ...this.getPrediction()
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
            this.grid.push(...this.shape.calculateCoordinates());
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
            return !!this.grid.find((playgroundPointer: GridPointer) => {
                return playgroundPointer.x === pointer.x && playgroundPointer.y === pointer.y;
            })
        });
        return !!outOfBounds || !!collision;
    }

    private detectAndRemoveFullLine(): void {
        const fullLines = this.detectFullLine();
        this.score$.next(this.score$.getValue() + fullLines.length * tsConfig.cols);
        fullLines.forEach((fullRow: number) => {
            this.grid = this.grid.filter((playgroundPointer: GridPointer) => {
                return playgroundPointer.y !== fullRow;
            });
            this.grid = this.grid.map((playgroundPointer: GridPointer) => {
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
            const foundPointers = this.grid.filter((playgroundPointer: GridPointer) => {
                return playgroundPointer.y === row;
            });
            if (foundPointers.length === tsConfig.cols) {
                fullLines.push(row);
            }
        }
        return fullLines;
    }

    private getShapeByIndex(index: number): ShapeContainer {
        const shape = tsConfig.shapes[index];
        return new ShapeContainer(shape.rotations, shape.size, shape.color);
    }

    private getPrediction(): Array<GridPointer> {
        const prediction = this.shape.copy();
        while (!this.detectCollisionOrOutOfBounds(prediction.copy().moveDown())) {
            prediction.moveDown();
        }
        return prediction.calculateCoordinates().map((pointer: GridPointer) => {
            pointer.alpha = 0.3;
            return pointer;
        });
    }
}