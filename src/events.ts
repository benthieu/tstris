import {fromEvent, interval, merge, Observable} from 'rxjs';
import {distinctUntilChanged, share} from 'rxjs/operators';
import {Painter} from './painter';
import {Playground} from './playground';

export class Events {
    private tick = interval(750);
    private keyDown = fromEvent<KeyboardEvent>(document, 'keydown');
    private keyUp = fromEvent<KeyboardEvent>(document, 'keyup');

    // All KeyboardEvents - emitted only when KeyboardEvent changes (key or type)
    private keyEvents: Observable<KeyboardEvent>;
    constructor(private playground: Playground, private painter: Painter) {
        this.keyEvents = merge(this.keyDown, this.keyUp).pipe(
            distinctUntilChanged((a, b) => a.code === b.code && a.type === b.type),
            share()
        );
        this.registerEvents();
    }

    private registerEvents() {
        // this.tick.subscribe(() => {
        //     this.painter.drawPlayground();
        //     this.playground.moveDown();
        // });
        this.keyEvents.subscribe((event: KeyboardEvent) => {
            this.painter.drawPlayground();
            if (event.type === "keydown") {
                if (event.code === "ArrowUp") {
                    this.playground.rotate();
                }
                if (event.code === "ArrowLeft") {
                    this.playground.moveLeft();
                }
                if (event.code === "ArrowRight") {
                    this.playground.moveRight();
                }
                if (event.code === "ArrowDown") {
                    this.playground.moveDown();
                }
            }
        });
    }
}