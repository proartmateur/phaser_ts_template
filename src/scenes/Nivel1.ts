import * as Phaser from 'phaser';
import {EventName, ImageName, SceneName} from '../Shared/constants';
import {currentPalette} from "../Shared/colorPalettes/currentPalette";
import {currentLanguage} from "../Shared/constants/texts";
import {levelSceneData} from "../Shared/types";
import {
    LabelComponent,
    LabelComponentActions,
    LabelComponentPositions,
    LabelComponentProps
} from "../components/atoms/LabelComponent";


export default class Nivel1 extends Phaser.Scene {

    private width: number;
    private height: number;
    private vidas: number;
    private score: number;

    private txtExit: LabelComponentActions;
    private deadBtn: LabelComponentActions;
    private winPontsBtn: LabelComponentActions;

    constructor() {
        super(SceneName.LEVEL1);
    }

    init(data: levelSceneData) {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.vidas = data.lives;
        this.score = data.score;
    }

    preload() {
        this.cameras.main.setBackgroundColor(currentPalette.bgDark.oct);
    }

    create() {

        // region Draw Components
        const logo = this.add.image(400, 270, ImageName.LOGO);

        this.txtExit = LabelComponent({
            position: LabelComponentPositions.BOTTOM_CENTER,
            text: currentLanguage.level1.exit,
            onClick: (button: Phaser.GameObjects.Text) => {
                this.cambiarEscena(button, SceneName.MENU)
            },
            color: currentPalette.secondary.hex,
            context: this
        })

        this.deadBtn = LabelComponent({
            position: LabelComponentPositions.CENTER_LEFT,
            text: 'MORIR',
            fontSizePx: 24,
            context: this,
            onClick: (button: Phaser.GameObjects.Text) => {
                this.deadByBtn(button)
            }
        })

        this.winPontsBtn = LabelComponent({
            position: LabelComponentPositions.CENTETR_RIGHT,
            text: 'GANAR',
            fontSizePx: 16,
            context: this,
            onClick: (button: Phaser.GameObjects.Text) => {
                this.winPoints(button)
            }
        })
        // endregion
    }

    private winPoints(button: Phaser.GameObjects.Text) {
        button.on('pointerdown', () => {
            this.score += 1;
            this.registry.set('score', this.score);
            this.events.emit(EventName.ON_WIN_POINTS);
            console.log(`Score: ${this.score}`)
            if (this.score === 1) {
                this.txtExit.update({
                    text: 'EXIT',
                    position: LabelComponentPositions.BOTTOM_RIGHT,
                    color: currentPalette.black
                } as unknown as LabelComponentProps)
            }

            if (this.score === 2) {
                this.txtExit.update({
                    text: 'SALIR',
                    position: LabelComponentPositions.CENTER,
                } as unknown as LabelComponentProps)
            }

            if (this.score === 3) {
                this.txtExit.update({
                    x: 10,
                    y: 89
                } as unknown as LabelComponentProps)
            }

            if (this.score === 4) {
                this.txtExit.update({
                    color: currentPalette.white.hex,
                    text: 'SALIR YA!',
                    position: LabelComponentPositions.BOTTOM_CENTER,
                } as unknown as LabelComponentProps)
            }
        })
    }

    private deadByBtn(button: Phaser.GameObjects.Text) {
        button.on('pointerdown', () => {
            this.vidas -= 1;
            this.registry.set('vidas', this.vidas);
            this.events.emit(EventName.ON_DEAD);
        })
    }

    private cambiarEscena(button: Phaser.GameObjects.Text, scene: string) {
        button.on('pointerdown', () => {
            console.log('saliendo...')
            this.scene.start(scene)
            this.scene.stop(SceneName.HUD);
        });
    }
}
