import {levelSceneData} from "../Shared/types";
import * as Phaser from "phaser";
import {currentPalette} from "../Shared/colorPalettes/currentPalette";
import {SceneName} from "../Shared/constants";

export default class HUD extends Phaser.Scene {
    private width: number;
    private height: number;
    private vidas: number;
    private score: number;
    private currentScene: string;

    private vidasTxt: Phaser.GameObjects.Text;

    constructor() {
        super(SceneName.HUD);
    }
    init(data: levelSceneData) {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.vidas = data.lives;
        this.score = data.score;
        this.currentScene = data.mainScene;
    }

    create() {
        const currentLevel: Phaser.Scene = this.scene.get(this.currentScene);
        currentLevel.events.on('onDead', this.updateVidas, this);
        this.vidasTxt = this.add.text(
            10,
            10,
            'Vidas:' + String(this.vidas),
            {
                fontSize: '32px',
                color: currentPalette.white.hex,
                align: 'center'
            }
        )
    }

    updateVidas() : void {
        console.log('OnDead:')
        const vidas = this.registry.get('vidas')
        console.log(`Vidas: ${vidas}`)
        if(vidas === 0) {
            this.scene.stop(SceneName.HUD)
            this.scene.stop(this.currentScene)
            this.scene.start(SceneName.GAME_OVER)
        }
        this.vidasTxt.text = 'Vidas:' + vidas;
    }
}
