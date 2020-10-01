import {from} from '../node_modules/rxjs/index';
import {GridPointer} from './grid-pointer';
import {Interactions} from './interactions.interface';
import {Playground} from './playground';

export class Shape implements Interactions {
    private currentRotation = 0;
    private pointer: GridPointer;

    constructor(private playground: Playground, private rotations: Array<Array<GridPointer>>, private size: number) {}

    public initPointer(): void {
        const playgroundCols = this.playground.cols;
        const fromLeft = Math.ceil((playgroundCols - (this.size)) / 2);
        this.pointer = new GridPointer(fromLeft, -(this.size - 1));
        console.log('this.pointer', this.pointer);
        console.log('this', this);
    }

    public rotateLeft(): void {

    }

    public rotateRight(): void {

    }

    public moveRight(): void {
        this.pointer.x++;
    }

    public moveLeft(): void {
        this.pointer.x--;
    }

    public moveDown(): void {
        this.pointer.y++;
    }

    public calculateCoordinatesFromRotation(): Array<GridPointer> {
        const currentRotation = this.getCurrentRotation();
        return currentRotation.map((currentField: GridPointer) => {
            return {
                x: this.pointer.x + currentField.x,
                y: this.pointer.y + currentField.y
            } as GridPointer;
        });
    }

    public drawShape(): void {
        this.playground.shapePlayground = this.calculateCoordinatesFromRotation();
        console.log('this.playground.shapePlayground', this.playground.shapePlayground);
    }

    private getCurrentRotation(): Array<GridPointer> {
        return this.rotations[this.currentRotation];
    }

    private detectCollision(): boolean {
        return false;
    }
}