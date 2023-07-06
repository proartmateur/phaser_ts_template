import * as Phaser from 'phaser';
import {SceneName, ImageName, EventName} from '../Shared/constants';
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
            fontSizePx: 32,
            context: this
        })

        const vidasTxt: Phaser.GameObjects.Text = this.add.text(
            (this.width / 2) - 100,
            this.height / 2 + 150,
            'Morir',
            {
                fontSize: '32px',
                color: currentPalette.white.hex,
                align: 'center'
            }
        ).setInteractive()

        const getPoints = this.add.text(
            this.width - ('Ganar Puntos'.length * 32) - 10,
            this.height / 2 + 150,
            'Ganar Puntos',
            {
                fontSize: '32px',
                color: currentPalette.white.hex,
                align: 'center'
            }
        ).setInteractive()
        // endregion

        // region Adding interactivity
        this.winPoints(getPoints)
        this.deadByBtn(vidasTxt)
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
                    text: 'SALIR..7',
                    position: LabelComponentPositions.BOTTOM_RIGHT,
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
