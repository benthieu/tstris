import {CanvasPainter} from './canvas-painter';
import {Playground} from './playground';

export class Tstris {
    private playground: Playground;
    private painter: CanvasPainter;
    constructor() {
        this.playground = new Playground();
        this.painter = new CanvasPainter();
        this.playground.subscribeToChanges().subscribe(() => {
            this.painter.drawPlayground(this.playground.getPlayground());
        });
        this.playground.startNewGame();
    }
}