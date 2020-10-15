import { Game } from "./game";

class App {

    constructor() {
        const playerName = "Mike";
        console.debug('Starting a round of bowling with ' + playerName);

        new Game("Mike").start();
    }
}

new App();