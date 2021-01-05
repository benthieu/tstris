import {CanvasPainter} from './output/canvas-painter';
import {Playground} from './controller/playground';
import {ShapePainter} from './output/shape-painter';
import {tsConfig} from './ts-config';

export class Tstris {
    constructor() {
        const playground = new Playground();
        const painter = new CanvasPainter();
        playground.tick().subscribe(() => {
            painter.drawPlayground(playground.getPlayground());
        });
        playground.score().subscribe((score: number) => {
            document.querySelector('.score-container h1 span').innerHTML = score.toString();
        })
        playground.nextShapes().subscribe((shapes: Array<number>) => {
            if (shapes.length >= 3) {
                new ShapePainter(shapes[0], tsConfig.nextShape0);
                new ShapePainter(shapes[1], tsConfig.nextShape1);
                new ShapePainter(shapes[2], tsConfig.nextShape2);
            }
        });
        playground.startNewGame();
        // initial paint
        painter.drawPlayground(playground.getPlayground());
    }
}