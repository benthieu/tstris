import {Painter} from './painter';
import {Playground} from './playground';

export class Tstris {
    private playground: Playground;
    private painter: Painter;
    private cols = 8;
    private rows = 15;
    constructor(private canvas: CanvasRenderingContext2D) {
        this.playground = new Playground(this.rows, this.cols);
        this.painter = new Painter(canvas);
        this.painter.drawPlayground(this.playground);
    }
}