import * as Phaser from 'phaser';
import {SceneName, ImageName, MapName, BackgroundName} from '../Shared/constants';
import {currentPalette} from "../Shared/colorPalettes/currentPalette";
import {FontName} from "../Shared/constants/fonts";

export default class Loading extends Phaser.Scene {
    //Barras de Carga
    private barraCarga: Phaser.GameObjects.Graphics;
    private barraProgreso: Phaser.GameObjects.Graphics;


    constructor () {
        super(SceneName.LOADING);
    }

    preload (): void {

        this.cameras.main.setBackgroundColor(currentPalette.black.oct);
        this.creaBarras();

        //Listener mientras se cargan los assets
        this.load.on(
            'progress',
            function (value: number) {
              this.barraProgreso.clear();
              this.barraProgreso.fillStyle(currentPalette.secondary.oct, 1);
              this.barraProgreso.fillRect(
                this.cameras.main.width / 4,
                this.cameras.main.height / 2 - 16,
                (this.cameras.main.width / 2) * value,
                16
              );
            },
            this
        );

        //Listener cuando se hayan cargado todos los Assets
        this.load.on(
            'complete',
            function () {
                const fuenteJSON = this.cache.json.get(FontName.PixelMayus.JSON)
                this.cache.bitmapFont.add(
                    FontName.PixelMayus.BITMAP,
                    Phaser.GameObjects.RetroFont.Parse(this, fuenteJSON)
                )
                this.scene.start(SceneName.MENU);
            },
            this
        );

        //Carga los assets del juego
        this.load.image(ImageName.LOGO, 'assets/phaser3-logo.png');


        // Mapas
        this.load.tilemapTiledJSON(MapName.NIVEL1.TILEMAPJSON, 'assets/niveles/nivel1.json')
        this.load.tilemapTiledJSON(MapName.NIVEL2.TILEMAPJSON, 'assets/niveles/level1_map.json')
        this.load.image(MapName.NIVEL1.TILESET, 'assets/niveles/nivelestileset.png')

        // Fondos
        this.load.image(BackgroundName.BROWN, 'assets/imagenes/fondos/Brown.png')

        // Fuentes
        this.load.json(FontName.PixelMayus.JSON, 'assets/fuentes/fuente.json')
        this.load.image(FontName.PixelMayus.IMAGEN, 'assets/fuentes/imagenFuente.png')
    }

    /**
     * Método que crea las barras de progreso
     */
    private creaBarras(): void {
        this.barraCarga = this.add.graphics();
        this.barraCarga.fillStyle(currentPalette.primary.oct, 1);
        this.barraCarga.fillRect(
          this.cameras.main.width / 4 - 2,
          this.cameras.main.height / 2 - 18,
          this.cameras.main.width / 2 + 4,
          20
        );
        this.barraProgreso = this.add.graphics();
      }


}
