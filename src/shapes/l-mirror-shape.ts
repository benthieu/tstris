import {GridPointer} from '../grid-pointer';
import {Playground} from '../playground';
import {Shape} from '../shape';

export class LMirrorShape extends Shape {

    /*
    LMirrorShape:
    1:  o  o  x     2:  x  x  o     3:  x  o  x     4:  x  x  x
        x  o  x         o  o  o         x  o  x         o  o  o
        x  o  x         x  x  x         x  o  o         o  x  x
    */
    constructor(playground: Playground) {
        super(playground, [
            [
                new GridPointer(0, 0),
                new GridPointer(1, 0),
                new GridPointer(1, 1),
                new GridPointer(1, 2)
            ],
            [
                new GridPointer(0, 1),
                new GridPointer(1, 1),
                new GridPointer(2, 1),
                new GridPointer(2, 0)
            ],
            [
                new GridPointer(1, 0),
                new GridPointer(1, 1),
                new GridPointer(1, 2),
                new GridPointer(2, 2)
            ],
            [
                new GridPointer(0, 1),
                new GridPointer(1, 1),
                new GridPointer(2, 1),
                new GridPointer(0, 2)
            ]
        ], 3);
    }
}