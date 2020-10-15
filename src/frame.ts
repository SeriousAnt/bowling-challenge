export class Frame {

    constructor() {
        this.rollResult = [];
        this.bonus = 0;
    }

    private rollResult: number[];
    private bonus: number;

    public isStrike(): boolean {
        return this.rollResult.length === 1 && this.rollResult[0] === 10;
    }

    public isSpare(): boolean {
        return this.rollResult.length === 2 && this.rollResult.reduce((p, c) => c + p, 0) === 10;
    }

    public setRollResult(result: number): void {
        this.rollResult.push(result);
    }

    public setBonus(bonus: number): void {
        this.bonus = bonus;
    }

    public getFrameTotal(): number {
        return this.rollResult.reduce((p, c) => c + p, 0) + this.bonus;
    }



}