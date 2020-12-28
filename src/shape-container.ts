import {GridPointer} from './grid-pointer';
import {Interactions} from './interactions.interface';
import {tsConfig} from './ts-config';

export class ShapeContainer implements Interactions {
    public currentRotation = 0;
    public pointer: GridPointer;

    constructor(
        private rotations: Array<Array<GridPointer>>,
        private size: number,
        private color: string = "#FFF") { }

    public initPointer(): void {
        const fromLeft = Math.floor((tsConfig.cols - (this.size)) / 2);
        this.pointer = new GridPointer(fromLeft, - (this.size - 2));
    }

    public rotate(): ShapeContainer {
        this.currentRotation = this.currentRotation + 1 >= this.rotations.length ? 0 : this.currentRotation + 1;
        return this;
    }

    public moveRight(): ShapeContainer {
        this.pointer.moveRight();
        return this;
    }

    public moveLeft(): ShapeContainer {
        this.pointer.moveLeft();
        return this;
    }

    public moveDown(): ShapeContainer {
        this.pointer.moveDown();
        return this;
    }

    public copy(): ShapeContainer {
        const newShape = new ShapeContainer(this.rotations, this.size);
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
