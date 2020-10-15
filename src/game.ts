import { Frame } from "./frame";

export class Game {

    constructor(private playerName: string) {
        this.frames = [];
    }

    private frames: Frame[];

    public start(): void {
        let index = 0;
        console.debug('Starting game with ' + this.playerName);
        // iteratively creates 10 frames to play
        while (this.frames.length < 10) {
            const frame = this.playFrame(index, new Frame());
            this.distributeBonus(index, frame)
            this.frames.push(frame);
            index++;
        }
        this.logTotals();
    }

    private logTotals(): void {
        let total = 0;
        this.frames.forEach((frame, index) => {
            console.debug('Frame no. ' + (index + 1).toString() + ': Total: ' + frame.getFrameTotal() + ' (Bonus: ' + frame.getBonus() + ') ' + frame.getRollResults().join(','))
            total += frame.getFrameTotal() + frame.getBonus();
        });
        console.debug(this.playerName + ' Total: ' + total);
    }

    private playFrame(index: number, frame: Frame): Frame {
        const firstRoll = this.getMockResult()
        frame.setRollResult(firstRoll)
        // if first roll is not a strike roll again 
        if (!frame.isStrike()) {
            frame.setRollResult(this.getMockResult(firstRoll))
        }
        // if last frame and strike or spare (another roll)
        if ((frame.isStrike() || frame.isSpare()) && index === 9) {
            frame.setRollResult(this.getMockResult(firstRoll))
        }
        return frame;
    }

    private distributeBonus(index: number, frame: Frame): void {
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

    // mocks a roll result
    private getMockResult(previousResult = 0): number {
        const result = Math.random() * (previousResult > 0 ? 10 - previousResult : 10);
        return Math.round(result);
    }

}