import * as Phaser from 'phaser';

import {currentPalette} from "../../Shared/colorPalettes/currentPalette";
import {BackgroundName, EventName, ImageName, MapName, SceneName} from "../../Shared/constants";
import {levelSceneData} from "../../Shared/types";
import {currentLanguage} from "../../Shared/constants/texts";
import {businessLogicOfPoints} from "./domain/points";
import {
    LabelComponent,
    LabelComponentActions,
    LabelComponentPositions, LabelComponentProps
} from "../../components/atoms/LabelComponent/LabelComponent";

export default class Nivel1 extends Phaser.Scene {

    // region Attributes
    private width: number;
    private height: number;
    private vidas: number;
    private score: number;

    private txtExit: LabelComponentActions;
    private deadBtn: LabelComponentActions;
    private winPontsBtn: LabelComponentActions;

    private mapaNivel: Phaser.Tilemaps.Tilemap;
    private conjuntoPatrones: Phaser.Tilemaps.Tileset;
    private capaMapaNivel: Phaser.Tilemaps.TilemapLayer;
    // endregion
    private imagenFondo: Phaser.GameObjects.TileSprite;

    constructor() {
        super(SceneName.LEVEL1);
    }

    // region Phaser Hooks
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

        this.mapaNivel = this.make.tilemap({
            key: MapName.NIVEL1.TILEMAPJSON,
            tileWidth: 16,
            tileHeight: 16
        })
        this.conjuntoPatrones = this.mapaNivel.addTilesetImage(MapName.NIVEL1.TILESET)
        this.capaMapaNivel = this.mapaNivel.createLayer(MapName.NIVEL1.CAPA, this.conjuntoPatrones)

        this.imagenFondo = this.add.tileSprite(
            0, 0,
            this.mapaNivel.widthInPixels, this.mapaNivel.heightInPixels,
            BackgroundName.BROWN
        )
            .setOrigin(0, 0)
            .setDepth(-1)


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

    update() {
        // mover fondo
        this.imagenFondo.tilePositionY -= 0.4
    }

    // endregion

    // region Level Methods
    private winPoints(button: Phaser.GameObjects.Text) {
        button.on('pointerdown', () => {
            this.score += 1;
            this.registry.set('score', this.score);
            this.events.emit(EventName.ON_WIN_POINTS);
            const txtExitData = businessLogicOfPoints(this.score)
            this.txtExit.update(txtExitData as unknown as LabelComponentProps)
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

    // endregion
}
