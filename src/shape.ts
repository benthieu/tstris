import {GridPointer} from './grid-pointer';

export interface Shape {
    rotations: Array<Array<GridPointer>>;
    size: number;
    color: string;
}