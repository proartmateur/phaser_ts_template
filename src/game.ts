import * as Phaser from 'phaser';
import {config} from "./config";

class Game extends Phaser.Game {
    constructor(configuration: Phaser.Types.Core.GameConfig) {
        super(configuration);
    }
}

window.addEventListener('load', ()=>{
    const game = new Game(config);
})

