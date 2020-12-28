import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';
import {Events} from './events';
import {GridPointer} from './grid-pointer';
import {Interactions} from './interactions.interface';
import {ShapeContainer} from './shape-container';
import {tsConfig} from './ts-config';

export class Playground implements Interactions {
    private allPointers: Array<GridPointer>;
    private shape: ShapeContainer;
    private events: Events;
    private score$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private nextShapes$: BehaviorSubject<Array<number>> = new BehaviorSubject<Array<number>>([]);

    constructor() {
        this.events = new Events(this);
    }

    public startNewGame(): void {
        this.allPointers = new Array<GridPointer>();
        this.nextShapes$.next([
            this.getRandomNumber(6),
            this.getRandomNumber(6),
            this.getRandomNumber(6)
        ]);
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
        return this.nextShapes$.asObservable();
    }

    public insertNewShape(): void {
        const nextShapes = this.nextShapes$.getValue();
        this.shape = this.getShapeByIndex(nextShapes.splice(0, 1)[0]);
        nextShapes.push(this.getRandomNumber(6));
        this.nextShapes$.next(nextShapes);
        this.shape.initPointer();
        if (this.detectCollisionOrOutOfBounds(this.shape)) {
            this.startNewGame();
        }
    }

    public getPlayground(): Array<GridPointer> {
        return [
            ...this.allPointers,
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
            this.allPointers.push(...this.shape.calculateCoordinates());
            this.detectAndRemoveFullLine();
            this.insertNewShape();
        }
    }
    public moveAllTheWayDown(): void {
        while (!this.detectCollisionOrOutOfBounds(this.shape.copy().moveDown())) {
            this.shape.moveDown();
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
        const fullLines = this.detectFullLine();
        this.score$.next(this.score$.getValue() + fullLines.length * tsConfig.cols);
        fullLines.forEach((fullRow: number) => {
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

    private getShapeByIndex(index: number): ShapeContainer {
        const shape = tsConfig.shapes[index];
        return new ShapeContainer(shape.rotations, shape.size, shape.color);
    }

    private getRandomNumber(max: number): number {
        return Math.round(Math.random() * max);
    }

    private getRandomShape(): ShapeContainer {
        return this.getShapeByIndex(this.getRandomNumber(6));
    }

    private getPrediction(): Array<GridPointer> {
        const prediction = this.shape.copy();
        while (!this.detectCollisionOrOutOfBounds(prediction.copy().moveDown())) {
            prediction.moveDown();
        }
        return prediction.calculateCoordinates().map((pointer: GridPointer) => {
            pointer.onlyOutline = true;
            return pointer;
        });
    }
}