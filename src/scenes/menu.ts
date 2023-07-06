import * as Phaser from 'phaser';
import {SceneName} from '../Shared/constants/scenes';
import {ImageName} from "../Shared/constants";
import {currentPalette} from "../Shared/colorPalettes/currentPalette";
import {currentLanguage} from "../Shared/constants/texts";
import {levelSceneData} from "../Shared/types";
import {FontName} from "../Shared/constants/fonts";


export default class Menu extends Phaser.Scene {
    private width: number;
    private height: number;
    private newGameState: levelSceneData;

    constructor() {
        super(SceneName.MENU);
    }

    init() {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.newGameState = {
            lives: 3,
            score: 0,
            mainScene: SceneName.LEVEL1
        }
    }

    preload() {
        this.cameras.main.setBackgroundColor(currentPalette.black.oct);
    }

    create() {

        const logo = this.add.image(this.width / 2, 70, ImageName.LOGO);

        const jugarTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.width / 2 - Math.floor((
                32 * currentLanguage.menu.playBtn.length) / 2
            ),
            this.height / 2,
            FontName.PixelMayus.BITMAP,
            currentLanguage.menu.playBtn,
            32
            ).setInteractive()

        this.cambiarEscena(jugarTxt, SceneName.LEVEL1)
    }

    private cambiarEscena(button: Phaser.GameObjects.BitmapText, scene: string) {
        button.on('pointerdown', () => {
            this.scene.start(scene, this.newGameState);
            this.scene.start(SceneName.HUD, this.newGameState);
            this.scene.bringToTop(SceneName.HUD);
        });
    }
}
