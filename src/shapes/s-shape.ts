import {GridPointer} from '../grid-pointer';
import {Playground} from '../playground';
import {Shape} from '../shape';

export class SShape extends Shape {

    /*
    LShape:
    1:  x  x  x     2:  o  x  x     3:  x  o  o     4:  x  o  x
        x  o  o         o  o  x         o  o  x         x  o  o
        o  o  x         x  o  x         x  x  x         x  x  o
    */
    constructor(playground: Playground) {
        super(playground, [
            [
                new GridPointer(1, 1),
                new GridPointer(2, 1),
                new GridPointer(0, 2),
                new GridPointer(1, 2)
            ],
            [
                new GridPointer(0, 0),
                new GridPointer(0, 1),
                new GridPointer(1, 1),
                new GridPointer(1, 2)
            ],
            [
                new GridPointer(0, 1),
                new GridPointer(1, 1),
                new GridPointer(1, 0),
                new GridPointer(2, 0)
            ],
            [
                new GridPointer(1, 0),
                new GridPointer(1, 1),
                new GridPointer(2, 1),
                new GridPointer(2, 2)
            ]
        ], 3);
    }
}