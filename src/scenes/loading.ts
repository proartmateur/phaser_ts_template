import * as Phaser from 'phaser';
import {SceneName, ImageName} from '../Shared/constants';
import {currentPalette} from "../Shared/colorPalettes/currentPalette";

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
                this.scene.start(SceneName.MENU);
            },
            this
        );

        //Carga los assets del juego
        this.load.image(ImageName.LOGO, 'assets/phaser3-logo.png');
        //for (let i = 0; i <= 1000; i++) this.load.image(ImageName.LOGO + i, 'assets/phaser3-logo.png');
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
