import * as Phaser from 'phaser';
import {SceneName, ImageName} from '../Shared/constants';
import {currentPalette} from "../Shared/colorPalettes/currentPalette";
import {currentLanguage} from "../Shared/constants/texts";
import {levelSceneData} from "../Shared/types";

export default class Nivel1 extends Phaser.Scene {

    private width: number;
    private height: number;
    private vidas: number;

    constructor() {
        super(SceneName.LEVEL1);
    }

    init(data: levelSceneData) {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.vidas = data.lives;
    }

    preload() {
        this.cameras.main.setBackgroundColor(currentPalette.bgDark.oct);
    }

    create() {
        const logo = this.add.image(400, 270, ImageName.LOGO);

        const jugarTxt: Phaser.GameObjects.Text = this.add.text(
            this.width / 2 - Math.floor((
                32 * currentLanguage.level1.exit.length) / 2
            ),
            this.height - 50,
            currentLanguage.level1.exit,
            {
                fontSize: '32px',
                color: currentPalette.white.hex,
                align: 'center'
            }).setInteractive()

        this.cambiarEscena(jugarTxt, SceneName.MENU)

        const vidasTxt: Phaser.GameObjects.Text = this.add.text(
            (this.width / 2) + 50,
            this.height / 2 + 150,
            'Vidas:' + String(this.vidas),
            {
                fontSize: '32px',
                color: currentPalette.white.hex,
                align: 'center'
            }
        ).setInteractive()
        console.log('Created')
        this.deadByBtn(vidasTxt);
    }

    private deadByBtn(button: Phaser.GameObjects.Text) {
        button.on('pointerdown', () => {
            console.log('Muerto')
            this.vidas -= 1;
            this.registry.set('vidas', this.vidas);
            this.events.emit('onDead');
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
