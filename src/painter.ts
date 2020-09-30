import {Playground} from './playground';

export class Painter {
    private width: number;
    private height: number;
    constructor(private canvasRendering: CanvasRenderingContext2D) {
        this.width = canvasRendering.canvas.width;
        this.height = canvasRendering.canvas.height;
    }

    public drawPlayground(playground: Playground): void {
        const rows = playground.getPlayground().length;
        const cols = playground.getPlayground()[0].length;
        
        const boxHeight = Math.floor(this.height/rows);
        const boxWidth = Math.floor(this.width/cols);

        playground.getPlayground().map((row, rowIndex) => {
            row.map((isDrawn, colIndex) => {
                const positionX = boxWidth * colIndex;
                const positionY = boxHeight * rowIndex;
                if (isDrawn) {
                    this.canvasRendering.fillRect(positionX, positionY, boxWidth, boxHeight);
                } else {
                    this.canvasRendering.strokeRect(positionX, positionY, boxWidth, boxHeight);
                }
            });
        });
    }
}