import {GridPointer} from '../grid-pointer';
import {Playground} from '../playground';
import {Shape} from '../shape';

export class ZShape extends Shape {

    /*
    zShape:
    1:  x  x  x     2:  x  o  x     3:  o  o  x     4:  x  x  o
        o  o  x         o  o  x         x  o  o         x  o  o
        x  o  o         o  x  x         x  x  x         x  o  x
    */
    constructor() {
        super([
            [
                new GridPointer(0, 1),
                new GridPointer(1, 1),
                new GridPointer(1, 2),
                new GridPointer(2, 2)
            ],
            [
                new GridPointer(0, 1),
                new GridPointer(0, 2),
                new GridPointer(1, 1),
                new GridPointer(1, 0)
            ],
            [
                new GridPointer(0, 0),
                new GridPointer(1, 0),
                new GridPointer(1, 1),
                new GridPointer(2, 1)
            ],
            [
                new GridPointer(2, 0),
                new GridPointer(1, 1),
                new GridPointer(1, 2),
                new GridPointer(2, 1)
            ]
        ], 3, '#e91e63');
    }
}