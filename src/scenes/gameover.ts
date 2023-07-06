import * as Phaser from "phaser";
import {SceneName} from "../Shared/constants";
import {currentLanguage} from "../Shared/constants/texts";
import {currentPalette} from "../Shared/colorPalettes/currentPalette";

export default class GameOver extends Phaser.Scene{
    private width: number;
    private height: number;

    constructor() {
        super(SceneName.GAME_OVER)
    }

    init() {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    preload() {
        this.cameras.main.setBackgroundColor(currentPalette.black.oct);
    }

    create() {
        const gameOverTxt = this.add.text(
            this.width / 2 - (Math.round((currentLanguage.gameOver.title.length * 32) / 2)),
            this.height / 2,
            currentLanguage.gameOver.title,
            {
                fontSize: '32px',
                color: currentPalette.secondary.hex,
                align: 'center'
            }
        )

        this.goToMenu()
    }

    private goToMenu() {
        setTimeout(() => {
            this.scene.stop(SceneName.GAME_OVER)
            this.scene.start(SceneName.MENU)
        }, 2000)
    }
}
