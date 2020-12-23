import {GridPointer} from '../grid-pointer';
import {Playground} from '../playground';
import {Shape} from '../shape';

export class LShape extends Shape {

    /*
    LShape:
    1:  x  o  o     2:  x  x  x     3:  x  o  x     4:  o  x  x
        x  o  x         o  o  o         x  o  x         o  o  o
        x  o  x         x  x  o         o  o  x         x  x  x
    */
    constructor() {
        super([
            [
                new GridPointer(1, 0),
                new GridPointer(2, 0),
                new GridPointer(1, 1),
                new GridPointer(1, 2)
            ],
            [
                new GridPointer(0, 1),
                new GridPointer(1, 1),
                new GridPointer(2, 1),
                new GridPointer(2, 2)
            ],
            [
                new GridPointer(1, 0),
                new GridPointer(1, 1),
                new GridPointer(1, 2),
                new GridPointer(0, 2)
            ],
            [
                new GridPointer(0, 0),
                new GridPointer(0, 1),
                new GridPointer(1, 1),
                new GridPointer(2, 1)
            ]
        ], 3, '#8bc34a');
    }
}