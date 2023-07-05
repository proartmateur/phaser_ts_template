import * as Phaser from 'phaser';
import Nivel1 from './scenes/Nivel1';



export const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    width: 800,
    height: 600,
    scene: Nivel1
};
