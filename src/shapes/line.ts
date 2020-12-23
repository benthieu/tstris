import {GridPointer} from '../grid-pointer';
import {Playground} from '../playground';
import {Shape} from '../shape';

export class Line extends Shape {

    /*
    Line Shapes:
    1:  x  o  x  x      2:  x  x  x  x      3:  x  x  o  x      4:  x  x  x  x
        x  o  x  x          o  o  o  o          x  x  o  x          o  o  o  o
        x  o  x  x          x  x  x  x          x  x  o  x          x  x  x  x
        x  o  x  x          x  x  x  x          x  x  o  x          x  x  x  x
    */
    constructor() {
        super([
            [
                new GridPointer(1, 0),
                new GridPointer(1, 1),
                new GridPointer(1, 2),
                new GridPointer(1, 3)
            ],
            [
                new GridPointer(0, 1),
                new GridPointer(1, 1),
                new GridPointer(2, 1),
                new GridPointer(3, 1)
            ],
            [
                new GridPointer(2, 0),
                new GridPointer(2, 1),
                new GridPointer(2, 2),
                new GridPointer(2, 3)
            ],
            [
                new GridPointer(0, 1),
                new GridPointer(1, 1),
                new GridPointer(2, 1),
                new GridPointer(3, 1)
            ]
        ], 4, '#009688');
    }
}