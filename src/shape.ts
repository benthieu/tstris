import {GridPointer} from './grid-pointer';
import {Interactions} from './interactions.interface';
import {Playground} from './playground';

export class Shape implements Interactions {
    public currentRotation = 0;
    public pointer: GridPointer;
    private playground: Playground;

    constructor(
        private rotations: Array<Array<GridPointer>>,
        private size: number,
        private color: string = "#FFF") { }

    public initPointer(): void {
        const fromLeft = Math.floor((this.playground.cols - (this.size)) / 2);
        this.pointer = new GridPointer(fromLeft, - (this.size - 2));
    }

    public setPlayground(playground: Playground): void {
        this.playground = playground;
    }

    public rotate(): Shape {
        this.currentRotation = this.currentRotation + 1 >= this.rotations.length ? 0 : this.currentRotation + 1;
        return this;
    }

    public moveRight(): Shape {
        this.pointer.moveRight();
        return this;
    }

    public moveLeft(): Shape {
        this.pointer.moveLeft();
        return this;
    }

    public moveDown(): Shape {
        this.pointer.moveDown();
        return this;
    }

    public copy(): Shape {
        const newShape = new Shape(this.rotations, this.size);
        newShape.currentRotation = this.currentRotation;
        newShape.pointer = this.pointer.copy();
        return newShape;
    }

    public calculateCoordinates(calculationPointer: GridPointer = this.pointer): Array<GridPointer> {
        const currentRotation = this.getCurrentRotation();
        return currentRotation.map((currentField: GridPointer) => {
            return {
                x: calculationPointer.x + currentField.x,
                y: calculationPointer.y + currentField.y,
                color: this.color
            } as GridPointer;
        });
    }

    private getCurrentRotation(): Array<GridPointer> {
        return this.rotations[this.currentRotation];
    }
}
