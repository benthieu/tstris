import {fromEvent, merge, Observable} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';
import {Painter} from './painter';
import {Playground} from './playground';

export class Events {
    private keyPressedInterval: NodeJS.Timeout;
    private moveDownInterval: NodeJS.Timeout;
    private keyDown = fromEvent<KeyboardEvent>(document, 'keydown');
    private keyUp = fromEvent<KeyboardEvent>(document, 'keyup');
    private keyEvents: Observable<KeyboardEvent>;

    constructor(private playground: Playground, private painter: Painter) {
        this.keyEvents = merge(this.keyDown, this.keyUp).pipe(
            distinctUntilChanged((a, b) => a.code === b.code && a.type === b.type)
        );
        this.registerEvents();
    }

    private registerEvents() {
        this.setMoveDownInterval();
        this.keyEvents.subscribe((event: KeyboardEvent) => {
            if (event.type === "keydown" && !this.keyPressedInterval) {
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
                        this.moveDownInterval = null;
                        this.startEventAndInterval(() => this.playground.moveDown());
                        break;
                }
            } else if (event.type === "keyup") {
                if (event.code === 'ArrowDown') {
                    this.setMoveDownInterval();
                }
                clearInterval(this.keyPressedInterval);
                this.keyPressedInterval = null;
            }
        });
    }

    private startEventAndInterval(event: any): void {
        event();
        this.painter.drawPlayground();
        this.keyPressedInterval = setInterval(() => {
            event();
            this.painter.drawPlayground();
        }, 500);
    }

    private setMoveDownInterval(): void {
        this.moveDownInterval = this.moveDownInterval ? this.moveDownInterval : setInterval(() => {
            this.playground.moveDown();
            this.painter.drawPlayground();
        }, 750);
    }
}