import {GridPointer} from '../grid-pointer';
import {Playground} from '../playground';
import {Shape} from '../shape';

export class Block extends Shape {

    /*
    Block Shapes:
    1:  o  o
        o  o
    */
    constructor(playground: Playground) {
        super(playground, [
            [
                new GridPointer(0, 0),
                new GridPointer(0, 1),
                new GridPointer(1, 0),
                new GridPointer(1, 1),
            ]
        ], 2);
    }
}