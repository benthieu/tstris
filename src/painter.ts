import {GridPointer} from './grid-pointer';
import {Playground} from './playground';

export class Painter {
    private width: number;
    private height: number;
    constructor(private canvasRendering: CanvasRenderingContext2D, private playground: Playground) {
        this.width = canvasRendering.canvas.width;
        this.height = canvasRendering.canvas.height;
    }

    public drawPlayground(): void {
        
        const boxHeight = Math.floor(this.height/this.playground.rows);
        const boxWidth = Math.floor(this.width/this.playground.cols);

        this.canvasRendering.clearRect(0, 0, this.width, this.height);

        for (let r = 0; r < this.playground.rows; r++) {
            for (let c = 0; c < this.playground.cols; c++) {
                const positionX = boxWidth * c;
                const positionY = boxHeight * r;
                const isDrawn = this.playground.getPlayground().find((pointer: GridPointer) => {
                    return pointer.x === c && pointer.y === r;
                });
                if (isDrawn) {
                    this.canvasRendering.fillRect(positionX, positionY, boxWidth, boxHeight);
                } else {
                    this.canvasRendering.strokeRect(positionX, positionY, boxWidth, boxHeight);
                }
            }
        }
    }
}