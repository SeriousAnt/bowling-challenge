import { Frame } from "./frame";

export class Game {

    constructor(private playerName: string) {
        this.frames = [];
    }

    frames: Frame[];

    public start(): Frame[] {
        let index = 0;
        // iteratively creates 10 frames to play
        while (this.frames.length < 10) {
            const frame = this.playFrame(index, new Frame(), this.getMockResult);
            this.frames.push(frame);
            this.distributeBonus(index, frame);
            index++;
        }
        this.logTotals();
        return this.frames;
    }

    private logTotals(): void {
        let total = 0;
        this.frames.forEach((frame, index) => {
            console.debug('Frame no. ' + (index + 1).toString() + ': Total: ' + frame.getFrameTotal() + ' (Bonus: ' + frame.getBonus() + ') ' + frame.getRollResults().join(','))
            total += frame.getFrameTotal() + frame.getBonus();
        });
        console.debug(this.playerName + ' scored a total of ' + total);
    }

    playFrame(index: number, frame: Frame, userInput: (previous?: number) => number): Frame {
        const firstRoll = userInput()
        frame.setRollResult(firstRoll)
        // if first roll is not a strike roll again 
        if (!frame.isStrike()) {
            frame.setRollResult(userInput(firstRoll))
        }
        // if last frame and strike or spare (another roll)
        if ((frame.isStrike() || frame.isSpare()) && index === 9) {
            frame.setRollResult(userInput(firstRoll))
        }

        // if last roll is as strike allow another role
        if (frame.getRollResults()[0] === 10 && index === 9) {
            const previousResult = frame.getRollResults()[1] < 10 ? frame.getRollResults()[1] : 0;
            frame.setRollResult(userInput(previousResult))
        }

        return frame;
    }

    distributeBonus(index: number, frame: Frame): void {
        // check if previous frame is spare and set bonus
        if (index >= 1 && this.frames[index - 1].isSpare()) {
            this.frames[index - 1].setBonus(frame.getRollResults()[0])
        }

        // check if previous frame is strike
        if (index >= 1 && this.frames[index - 1].isStrike() && !this.frames[index].isStrike()) {
            this.frames[index - 1].setBonus(frame.getRollResults()[0] + frame.getRollResults()[1])
        }

        // check a further frame before if is strike
        if (index >= 2 && this.frames[index - 2].isStrike() && this.frames[index - 1].isStrike()) {
            this.frames[index - 2].setBonus(this.frames[index - 1].getRollResults()[0] + frame.getRollResults()[0])
        }

        // handle last roll
        if (index === 9 && this.frames[index].isStrike() || this.frames[index].isSpare()) {
            const bonus = this.frames[index].isStrike() ? this.frames[index].getRollResults()[1] + this.frames[index].getRollResults()[2] : this.frames[index].getRollResults()[1];
            this.frames[index].setBonus(bonus);
        }
    }

    // mocks a roll result
    getMockResult(previousResult = 0): number {
        const result = Math.random() * (previousResult > 0 ? 10 - previousResult : 10);
        return Math.round(result);
    }

}