import {GridPointer} from './grid-pointer';
import {Shape} from './shape';
import {tsConfig} from './ts-config';

export class ShapePainter {
    private width: number;
    private height: number;
    private shape: Shape;

    constructor(private shapeIndex: number, private context: CanvasRenderingContext2D) {
        this.width = this.context.canvas.width;
        this.height = this.context.canvas.height;
        this.shape = tsConfig.shapes[this.shapeIndex];
        this.drawShape();
    }

    public drawShape(): void {
        const boxHeight = Math.floor(this.height / 5);
        const boxWidth = Math.floor(this.width / 5);
        let startX = this.width;
        let endX = 0;
        let startY = this.height;
        let endY = 0;
        this.context.resetTransform();

        this.context.clearRect(0, 0, this.width, this.height);

        this.shape.rotations[0].forEach((pointer: GridPointer) => {
            const positionX = boxWidth * pointer.x;
            const positionY = boxHeight * pointer.y;
            startX = positionX < startX ? positionX : startX;
            startY = positionY < startY ? positionY : startY;
            endX = positionX + boxWidth > endX ? positionX + boxWidth : endX;
            endY = positionY + boxHeight > endY ? positionY + boxHeight : endY;
        });
        this.context.translate((this.width - endX - startX) / 2, (this.height - endY - startY) / 2);

        this.shape.rotations[0].forEach((pointer: GridPointer) => {
            this.context.fillStyle = this.shape.color;
            this.context.fillRect(boxWidth * pointer.x, boxHeight * pointer.y, boxWidth, boxHeight);
        });
    }
}