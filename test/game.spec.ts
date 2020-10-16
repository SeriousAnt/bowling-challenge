import { expect } from "chai"
import { describe, it } from "mocha";
import { Frame } from "../src/frame";
import { Game } from "../src/game";

describe("Score keeping methods", () => {
    it('Should accumulate the total score of a perfect game correctly', () => {
        const game = new Game('Mathias');
        for (let i = 0; i < 10; i++) {
            const frame = new Frame();
            game.playFrame(i, frame, () => 10);
            game.frames.push(frame);
            game.distributeBonus(i, frame);
        }
        const total = game.frames.map(frame => frame.getBonus() + frame.getFrameTotal()).reduce((p, c) => p + c, 0)
        expect(total).to.be.eq(300);
    });

    it('Should accumulate the total score of a game of spares correctly', () => {
        const game = new Game('Marina');
        for (let i = 0; i < 10; i++) {
            const frame = new Frame();
            game.playFrame(i, frame, () => 5);
            game.frames.push(frame);
            game.distributeBonus(i, frame);
        }
        const total = game.frames.map(frame => frame.getBonus() + frame.getFrameTotal()).reduce((p, c) => p + c, 0)
        expect(total).to.be.eq(150);
    });
});

describe("Testing frame methods", () => {

    it('Should calulate the frame total', () => {
        const frame = new Frame();
        frame.setRollResult(4);
        frame.setRollResult(5);
        expect(frame.getFrameTotal()).to.be.eq(9);
    });

    it('Should not be be a spare or a strike', () => {
        const frame = new Frame();
        frame.setRollResult(4);
        frame.setRollResult(5);
        expect(frame.isSpare()).to.be.false;
        expect(frame.isStrike()).to.be.false;
    });

    it('Should be a spare but not a strike', () => {
        const frame = new Frame();
        frame.setRollResult(5);
        frame.setRollResult(5);
        expect(frame.isSpare()).to.be.true;
        expect(frame.isStrike()).to.be.false;
    });

    it('Should be a strike but not a spare', () => {
        const frame = new Frame();
        frame.setRollResult(10);
        expect(frame.isSpare()).to.be.false;
        expect(frame.isStrike()).to.be.true;
    });

});