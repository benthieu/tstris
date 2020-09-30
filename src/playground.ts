export class Playground {
    private playground: Array<Array<boolean>>;
    private activeShape: Array<Array<boolean>>;

    constructor(private rows: number,
        private cols: number) {
        this.playground = this.createEmptyPlayground();
        this.activeShape = this.createEmptyPlayground();
        console.log(this.playground);
    }

    private createEmptyPlayground(): Array<Array<boolean>> {
        const emptyPlayground = new Array<Array<boolean>>();
        for (let r = 0; r < this.rows; r++) {
            emptyPlayground[r] = new Array<boolean>();
            for (let c = 0; c < this.cols; c++) {
                emptyPlayground[r][c] = false;
            }
        }
        emptyPlayground[1][1] = true;
        return emptyPlayground;
    }

    public getPlayground(): Array<Array<boolean>> {
        return this.playground.map((r, r_index) => {
            return r.map((c, c_index) => {
                return this.playground[r_index][c_index] || this.activeShape[r_index][c_index];
            });
        })
    }
}