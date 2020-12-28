import {Events} from './events';
import {Painter} from './painter';
import {Playground} from './playground';

export class Tstris {
    private playground: Playground;
    private painter: Painter;
    private events: Events;
    constructor() {
        this.playground = new Playground();
        this.painter = new Painter(this.playground);
        this.events = new Events(this.playground, this.painter);
        this.playground.startNewGame();
    }
}