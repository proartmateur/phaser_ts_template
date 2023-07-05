import * as Phaser from 'phaser';

export default class Nivel1 extends Phaser.Scene
{
    constructor ()
    {
        super('Nivel1');
    }

    preload ()
    {
        this.load.image('logo', 'assets/phaser3-logo.png');
    }

    create ()
    {
        const logo = this.add.image(400, 270, 'logo');
    }
}
