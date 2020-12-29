export class GridPointer {
    public x: number;
    public y: number;
    public color: string;
    public onlyOutline = false;
    constructor(x: number, y: number, color: string = '', onlyOutline: boolean = false) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.onlyOutline = onlyOutline;
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
        return new GridPointer(this.x, this.y, this.color, this.onlyOutline);
    }
}