import {CanvasPainter} from './canvas-painter';
import {Playground} from './playground';

export class Tstris {
    constructor() {
        const playground = new Playground();
        const painter = new CanvasPainter();
        playground.subscribeToChanges().subscribe(() => {
            painter.drawPlayground(playground.getPlayground());
        });
        playground.startNewGame();
    }
}