import * as Phaser from 'phaser';
import Loading from "./scenes/loading";
import Nivel1 from "./scenes/Nivel1";
import Menu from "./scenes/menu";
import HUD from "./scenes/HUD";
import GameOver from "./scenes/gameover";




export const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    width: 800,
    height: 600,
    scene: [
        Loading,
        Nivel1,
        Menu,
        HUD,
        GameOver
    ],
};
