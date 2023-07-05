import * as Phaser from 'phaser';
import Nivel1 from './scenes/Nivel1';

export interface GameConfig {
    type: number,
    backgroundColor: string,
    width: number,
    height: number,
    scene: Class
}

export const config: GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    width: 800,
    height: 600,
    scene: Nivel1
};
