import {GridPointer} from './grid-pointer';
import {tsConfig} from './ts-config';

export class CanvasPainter {
    private width: number;
    private height: number;
    private defaultFillStyle = '#FFF';
    private defaultStrokeStyle = '#FFF';
    private canvasRendering: CanvasRenderingContext2D;
    constructor() {
        this.canvasRendering = tsConfig.canvas;
        this.width = this.canvasRendering.canvas.width;
        this.height = this.canvasRendering.canvas.height;
    }

    public drawPlayground(pointers: Array<GridPointer>): void {
        const boxHeight = Math.floor(this.height / tsConfig.rows);
        const boxWidth = Math.floor(this.width / tsConfig.cols);
        this.canvasRendering.fillStyle = this.defaultFillStyle;
        this.canvasRendering.strokeStyle = this.defaultStrokeStyle;

        this.canvasRendering.clearRect(0, 0, this.width, this.height);

        for (let r = 0; r < tsConfig.rows; r++) {
            for (let c = 0; c < tsConfig.cols; c++) {
                const positionX = boxWidth * c;
                const positionY = boxHeight * r;
                const isDrawn = pointers.find((pointer: GridPointer) => {
                    return pointer.x === c && pointer.y === r;
                });
                if (isDrawn) {
                    this.canvasRendering.fillStyle = isDrawn.color ? isDrawn.color : this.defaultFillStyle;
                    this.canvasRendering.fillRect(positionX, positionY, boxWidth, boxHeight);
                } else {
                    this.canvasRendering.strokeRect(positionX, positionY, boxWidth, boxHeight);
                }
            }
        }
    }
}