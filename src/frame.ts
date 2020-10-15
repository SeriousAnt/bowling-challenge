export class Frame {

    constructor() {
        this.rollResults = [];
        this.bonus = 0;
    }

    private rollResults: number[];
    private bonus: number;

    public isStrike(): boolean {
        return this.rollResults.length === 1 && this.rollResults[0] === 10;
    }

    public isSpare(): boolean {
        return this.rollResults.length === 2 && this.getFrameTotal() === 10;
    }

    public setRollResult(result: number): void {
        this.rollResults.push(result);
    }

    public getRollResults(): number[] {
        return this.rollResults;
    }

    public setBonus(bonus: number): void {
        this.bonus = bonus;
    }

    public getBonus(): number {
        return this.bonus;
    }

    public getFrameTotal(): number {
        return this.rollResults.reduce((p, c) => c + p, 0);
    }



}