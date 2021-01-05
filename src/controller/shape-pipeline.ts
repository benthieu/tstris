import {BehaviorSubject, Observable} from 'rxjs';

export class ShapePipeline {
    private nextShapes$ = new BehaviorSubject<Array<number>>([]);

    public reset() {
        this.nextShapes$.next([
            this.getRandomNumber(6),
            this.getRandomNumber(6),
            this.getRandomNumber(6)
        ]);
    }

    public getNextShape(): number {
        const nextShapes = this.nextShapes$.getValue();
        const getNextShape = nextShapes.splice(0, 1)[0];
        nextShapes.push(this.getRandomNumber(6));
        this.nextShapes$.next(nextShapes);
        return getNextShape;
    }

    public get(): Observable<Array<number>> {
        return this.nextShapes$.asObservable();
    }

    private getRandomNumber(max: number): number {
        return Math.round(Math.random() * max);
    }
}