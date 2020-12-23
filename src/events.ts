import {fromEvent, interval, merge, Observable} from 'rxjs';
import {distinctUntilChanged, share} from 'rxjs/operators';
import {Painter} from './painter';
import {Playground} from './playground';

export class Events {
    private keyDownInterval: NodeJS.Timeout;
    private moveDownInterval: NodeJS.Timeout;
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

    private setMoveDownInterval(): void {
        this.moveDownInterval = setInterval(() => {
            this.playground.moveDown();
            this.painter.drawPlayground();
        }, 750);
    }

    private registerEvents() {
        this.setMoveDownInterval();
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
                        clearInterval(this.moveDownInterval);
                        this.startEventAndInterval(() => this.playground.moveDown());
                        break;
                }
            } else if (event.type === "keyup") {
                if (event.code === 'ArrowDown') {
                    this.setMoveDownInterval();
                }
                clearInterval(this.keyDownInterval);
                this.keyDownInterval = null;
            }
        });
    }
}