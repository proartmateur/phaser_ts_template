import * as Phaser from "phaser";
import Loading from "./loading";

import Menu from "./menu";
import HUD from "./HUD";
import GameOver from "./gameover";
import Nivel1 from "./nivel1/Nivel1";

export const allScenes = [
    Loading,
    Nivel1,
    Menu,
    HUD,
    GameOver
]
