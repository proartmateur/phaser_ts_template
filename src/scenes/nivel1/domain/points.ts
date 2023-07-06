
import {currentPalette} from "../../../Shared/colorPalettes/currentPalette";
import {LabelComponentPositions} from "../../../components/atoms/LabelComponent/LabelComponent";

export const businessLogicOfPoints = (newScore: number): any => {
        let result = {}
        switch (newScore) {
            case 1:
                result = {
                    text: 'EXIT',
                    position: LabelComponentPositions.BOTTOM_RIGHT,
                    color: currentPalette.black
                }
                break
            case 2:
                result = {
                    text: 'SALIR',
                    position: LabelComponentPositions.CENTER,
                }
                break
            case 3:
                result = {
                    x: 10,
                    y: 89
                }
                break
            case 4:
                result = {
                    color: currentPalette.white.hex,
                    text: 'SALIR YA!',
                    position: LabelComponentPositions.BOTTOM_CENTER,
                }
                break
            default:
                break
        }

        return result
    }

