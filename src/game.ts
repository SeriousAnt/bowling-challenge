import { Frame } from "./frame";

export class Game {

    constructor(private playerName: string) {
        this.frames = [];
    }

    private frames: Frame[];

    public start(): void {
        let index = 0;
        console.debug('Starting game with ' + this.playerName);
        while (this.frames.length <= 10) {
            const frame = this.playFrame(new Frame());
            this.distributeBonus(index, frame)
            this.frames.push(frame);
            index++;
        }
    }

    public playFrame(frame: Frame): Frame {
        const firstRoll = this.getMockResult()
        frame.setRollResult(firstRoll)
        if (!frame.isStrike()) {
            frame.setRollResult(this.getMockResult(firstRoll))
        }
        return frame;
    }

    public distributeBonus(index: number, frame: Frame): void {
        // check if previous frame is spare and set bonus
        if (index >= 1 && this.frames[index - 1].isSpare()) {
            this.frames[index - 1].setBonus(frame.getRollResults()[0])
        }
        // check if frame before is strike
        if (index >= 2 && this.frames[index - 2].isStrike()) {
            if (!this.frames[index - 1].isStrike()) {
                this.frames[index - 2].setBonus(this.frames[index - 1].getFrameTotal())
            } else {
                this.frames[index - 2].setBonus(this.frames[index - 1].getRollResults()[0] + frame.getRollResults()[0])
            }
        }
    }

    public getMockResult(previousResult = 0): number {
        const result = Math.random() * (previousResult > 0 ? 10 - previousResult : 10);
        console.debug("Mocked roll result: " + Math.round(result));
        return Math.round(result);
    }

}