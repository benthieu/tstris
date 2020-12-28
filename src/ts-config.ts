import {GridPointer} from './grid-pointer';
import {Shape} from './shape';

export const tsConfig = {
    canvas: (document.getElementById('main') as HTMLCanvasElement).getContext('2d'),
    rows: 15,
    cols: 8,
    shapes: [
        {
            /*
            Block Shapes:
            1:  o  o
                o  o
            */
            rotations: [
                [
                    new GridPointer(0, 0),
                    new GridPointer(0, 1),
                    new GridPointer(1, 0),
                    new GridPointer(1, 1),
                ]
            ],
            size: 2,
            color: '#ff5722'
        },
        {
            /*
            LMirrorShape:
            1:  o  o  x     2:  x  x  o     3:  x  o  x     4:  x  x  x
                x  o  x         o  o  o         x  o  x         o  o  o
                x  o  x         x  x  x         x  o  o         o  x  x
            */
            rotations: [
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
            ],
            size: 3,
            color: '#ffc107'
        },
        {
            /*
            LShape:
            1:  x  o  o     2:  x  x  x     3:  x  o  x     4:  o  x  x
                x  o  x         o  o  o         x  o  x         o  o  o
                x  o  x         x  x  o         o  o  x         x  x  x
            */
            rotations: [
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
            ],
            size: 3,
            color: '#8bc34a'
        },
        {
            /*
            Line Shapes:
            1:  x  o  x  x      2:  x  x  x  x      3:  x  x  o  x      4:  x  x  x  x
                x  o  x  x          o  o  o  o          x  x  o  x          o  o  o  o
                x  o  x  x          x  x  x  x          x  x  o  x          x  x  x  x
                x  o  x  x          x  x  x  x          x  x  o  x          x  x  x  x
            */
            rotations: [
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
            ],
            size: 4,
            color: '#009688'
        },
        {
            /*
            SShape:
            1:  x  x  x     2:  o  x  x     3:  x  o  o     4:  x  o  x
                x  o  o         o  o  x         o  o  x         x  o  o
                o  o  x         x  o  x         x  x  x         x  x  o
            */
            rotations: [
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
            ],
            size: 3,
            color: '#03a9f4'
        },
        {
            /*
            TShape:
            1:  x  o  x     2:  x  o  x     3:  x  x  x     4:  x  o  x
                o  o  o         x  o  o         o  o  o         o  o  x
                x  x  x         x  o  x         x  o  x         x  o  x
            */
            rotations: [
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
            ],
            size: 3,
            color: '#673ab7'
        },
        {
            /*
            zShape:
            1:  x  x  x     2:  x  o  x     3:  o  o  x     4:  x  x  o
                o  o  x         o  o  x         x  o  o         x  o  o
                x  o  o         o  x  x         x  x  x         x  o  x
            */
            rotations: [
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
            ],
            size: 3,
            color: '#e91e63'
        },
    ] as Array<Shape>
}