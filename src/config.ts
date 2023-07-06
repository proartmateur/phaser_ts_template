import * as Phaser from 'phaser';
import {allScenes} from "./scenes";

export const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    width: 800,
    height: 600,
    scene: allScenes,
    pixelArt: true
};
