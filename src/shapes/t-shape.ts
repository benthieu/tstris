import {GridPointer} from '../grid-pointer';
import {Playground} from '../playground';
import {Shape} from '../shape';

export class TShape extends Shape {

    /*
    TShape:
    1:  x  o  x     2:  x  o  x     3:  x  x  x     4:  x  o  x
        o  o  o         x  o  o         o  o  o         o  o  x
        x  x  x         x  o  x         x  o  x         x  o  x
    */
    constructor() {
        super([
            [
                new GridPointer(0, 1),
                new GridPointer(1, 0),
                new GridPointer(1, 1),
                new GridPointer(1, 2)
            ],
            [
                new GridPointer(1, 0),
                new GridPointer(0, 1),
                new GridPointer(1, 1),
                new GridPointer(2, 1)
            ],
            [
                new GridPointer(1, 0),
                new GridPointer(1, 1),
                new GridPointer(1, 2),
                new GridPointer(2, 1)
            ],
            [
                new GridPointer(0, 1),
                new GridPointer(1, 1),
                new GridPointer(2, 1),
                new GridPointer(1, 2)
            ]
        ], 3, '#673ab7');
    }
}