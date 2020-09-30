import {Tstris} from './tstris';

var canvas = document.getElementById('main') as HTMLCanvasElement;
var ctx = canvas.getContext('2d');

let test = new Tstris(ctx);