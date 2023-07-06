import * as Phaser from 'phaser';
import {currentPalette} from "../../Shared/colorPalettes/currentPalette";

export enum LabelComponentPositions {
    TOP_LEFT,
    TOP_RIGHT,
    TOP_CENTER,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    BOTTOM_CENTER,
    CENTER,
    CENTER_LEFT,
    CENTETR_RIGHT
}

export interface LabelComponentProps {
    fontSizePx: number,
    text: string,
    x?: number,
    y?: number,
    position?: LabelComponentPositions,
    onClick: (button: Phaser.GameObjects.Text) => void | null,
    context: Phaser.Scene
}

export interface LabelComponentActions {
    update: (newProps: LabelComponentProps) => void,
    render: () => void
}

export const LabelComponent = (props: LabelComponentProps): LabelComponentActions => {

    // region Global Context
    const width = props.context.cameras.main.width
    const height = props.context.cameras.main.height

    let button: Phaser.GameObjects.Text;

    interface LabelPosition {
        x: number,
        y: number
    }

    // endregion

    // region Methods
    const calculatePosition = (propsRef: LabelComponentProps): LabelPosition => {
        const textWidth = propsRef.text.length * propsRef.fontSizePx
        if (propsRef.position === null || propsRef.position === undefined) {
            return {
                x: propsRef.x,
                y: propsRef.y
            }
        }
        let result = {
            x: 0,
            y: 0
        }
        switch (propsRef.position) {
            case LabelComponentPositions.TOP_LEFT:
                result.x = 10
                result.y = propsRef.fontSizePx + 5
                break
            case LabelComponentPositions.TOP_RIGHT:
                result.x = width - (textWidth + 10)
                result.y = propsRef.fontSizePx + 5
                break
            case LabelComponentPositions.TOP_CENTER:
                result.x = (width / 2) - Math.round(textWidth / 2)
                result.y = propsRef.fontSizePx + 5
                break

            case LabelComponentPositions.BOTTOM_LEFT:
                result.x = 10
                result.y = height - (propsRef.fontSizePx + 5)
                break
            case LabelComponentPositions.BOTTOM_RIGHT:
                result.x = width - (textWidth + 10)
                result.y = height - (propsRef.fontSizePx + 5)
                break
            case LabelComponentPositions.BOTTOM_CENTER:
                result.x = (width / 2) - Math.round(textWidth / 2)
                result.y = height - (props.fontSizePx + 5)
                break

            case LabelComponentPositions.CENTER:
                result.x = (width / 2) - Math.round(textWidth / 2)
                result.y = height / 2
                break
            case LabelComponentPositions.CENTER_LEFT:
                result.x = 10
                result.y = height / 2
                break
            case LabelComponentPositions.CENTETR_RIGHT:
                result.x = width - (textWidth + 10)
                result.y = height / 2
                break
        }
        return result
    }

    const render = () => {
        const initialPosition = calculatePosition(props)
        button = props.context.add.text(
            initialPosition.x,
            initialPosition.y,
            props.text,
            {
                fontSize: `${props.fontSizePx}px`,
                color: currentPalette.white.hex,
                align: 'center'
            })

        if (props.onClick !== null) {
            button.setInteractive()
            props.onClick(button)
        }

    }

    const applyChanges = (key: string, newVal: any) => {
        switch (key) {
            case 'text':
                button.text = newVal
                break
            case 'position':
                props.position = newVal
                const initialPosition = calculatePosition(props)
                button.x = initialPosition.x
                button.y = initialPosition.y
                break
            case 'x':
                props.x = newVal
                props.position = undefined
                const initialx = calculatePosition(props)
                button.x = initialx.x
                button.y = initialx.y
                break
            case 'y':
                props.y = newVal
                props.position = undefined
                const initialy = calculatePosition(props)
                button.x = initialy.x
                button.y = initialy.y
                break
            default:
                break
        }
    }

    const update = (newProps: unknown) => {
        let changedProps = []
        for (let key of Object.keys(newProps as Object)) {
            if (!(key in props)) {
                props[key] = newProps[key]
                changedProps.push(key)
            }
            //console.log(`${key} is in props value: ${props[key]} -> ${newProps[key]}`)
            if (newProps[key] !== props[key]) {
                changedProps.push(key)
            }
        }
        for( let key of changedProps) {
            //@ts-ignore
            if (changedProps.includes(key)) {
                applyChanges(key, newProps[key])
            }
        }
    }

    // region Run the function
    render()
    // endregion

    return {
        render,
        update
    }

}

