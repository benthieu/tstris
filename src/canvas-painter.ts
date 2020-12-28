import {GridPointer} from './grid-pointer';
import {tsConfig} from './ts-config';

export class CanvasPainter {
    private width: number;
    private height: number;
    private context: CanvasRenderingContext2D;
    constructor() {
        this.context = tsConfig.canvas;
        this.width = this.context.canvas.width;
        this.height = this.context.canvas.height;
    }

    public drawPlayground(pointers: Array<GridPointer>): void {
        const boxHeight = Math.floor(this.height / tsConfig.rows);
        const boxWidth = Math.floor(this.width / tsConfig.cols);

        this.context.clearRect(0, 0, this.width, this.height);

        for (let r = 0; r < tsConfig.rows; r++) {
            for (let c = 0; c < tsConfig.cols; c++) {

                this.context.fillStyle = tsConfig.defaultFillStyle;
                this.context.strokeStyle = tsConfig.defaultStrokeStyle;
                this.context.globalAlpha = 1;

                const positionX = boxWidth * c;
                const positionY = boxHeight * r;
                this.context.strokeRect(positionX, positionY, boxWidth, boxHeight);

                const isDrawn = pointers.find((pointer: GridPointer) => {
                    return pointer.x === c && pointer.y === r;
                });
                if (isDrawn) {
                    this.context.globalAlpha = isDrawn.onlyOutline ? 0.3 : 1;
                    this.context.fillStyle = isDrawn.color ? isDrawn.color : tsConfig.defaultFillStyle;
                    this.context.fillRect(positionX, positionY, boxWidth, boxHeight);
                }
            }
        }
    }
}