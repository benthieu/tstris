export class GridPointer {
    public x: number;
    public y: number;
    public color: string;
    public alpha: number;
    constructor(x: number, y: number, color: string = '', alpha: number = 1) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.alpha = alpha;
    }

    public moveRight(): void {
        this.x++;
    }

    public moveLeft(): void {
        this.x--;
    }

    public moveUp(): void {
        this.y--;
    }

    public moveDown(): void {
        this.y++;
    }

    public copy(): GridPointer {
        return new GridPointer(this.x, this.y, this.color, this.alpha);
    }
}