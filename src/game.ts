import * as Phaser from 'phaser';
import {config, GameConfig} from "./config";

class Game extends Phaser.Game {
    constructor(configuration: GameConfig) {
        super(configuration);
    }
}

window.addEventListener('load', ()=>{
    const game = new Game(config);
})

