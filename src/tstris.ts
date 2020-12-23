import {Events} from './events';
import {Painter} from './painter';
import {Playground} from './playground';

export class Tstris {
    private playground: Playground;
    private painter: Painter;
    private events: Events;
    private cols = 8;
    private rows = 15;
    constructor(canvas: CanvasRenderingContext2D) {
        this.playground = new Playground(this.rows, this.cols);
        this.painter = new Painter(canvas, this.playground);
        this.events = new Events(this.playground, this.painter);
        this.playground.startNewGame();
        this.painter.drawPlayground();
    }
}