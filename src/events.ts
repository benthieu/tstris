import {fromEvent, interval, merge, Observable} from 'rxjs';
import {distinctUntilChanged, share} from 'rxjs/operators';
import {Painter} from './painter';
import {Playground} from './playground';

export class Events {
    private keyDownInterval: NodeJS.Timeout;
    private keyDown = fromEvent<KeyboardEvent>(document, 'keydown');
    private keyUp = fromEvent<KeyboardEvent>(document, 'keyup');

    // All KeyboardEvents - emitted only when KeyboardEvent changes (key or type)
    private keyEvents: Observable<KeyboardEvent>;
    constructor(private playground: Playground, private painter: Painter) {
        this.keyEvents = merge(this.keyDown, this.keyUp).pipe(
            distinctUntilChanged((a, b) => a.code === b.code && a.type === b.type)
        );
        this.registerEvents();
    }

    private startEventAndInterval(event: any): void {
        event();
        this.painter.drawPlayground();
        this.keyDownInterval = setInterval(() => {
            event();
            this.painter.drawPlayground();
        }, 500);
    }

    private registerEvents() {
        this.keyEvents.subscribe((event: KeyboardEvent) => {
            if (event.type === "keydown" && !this.keyDownInterval) {
                switch (event.code) {
                    case 'ArrowUp':
                        this.startEventAndInterval(() => this.playground.rotate());
                        break;
                    case 'ArrowLeft':
                        this.startEventAndInterval(() => this.playground.moveLeft());
                        break;
                    case 'ArrowRight':
                        this.startEventAndInterval(() => this.playground.moveRight());
                        break;
                    case 'ArrowDown':
                        this.startEventAndInterval(() => this.playground.moveDown());
                        break;
                }
            } else if (event.type === "keyup") {
                clearInterval(this.keyDownInterval);
                this.keyDownInterval = null;
            }
        });
    }
}