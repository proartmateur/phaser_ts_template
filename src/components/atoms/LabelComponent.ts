import * as Phaser from 'phaser';
import {currentPalette} from "../../Shared/colorPalettes/currentPalette";

export enum LabelComponentPositions {
    TOP_LEFT,
    TOP_RIGHT,
    TOP_CENTER,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    BOTTOM_CENTER,
    CENTER
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

    const width = props.context.cameras.main.width
    const height = props.context.cameras.main.height

    interface LabelPosition {
        x: number,
        y: number
    }

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
        }
        return result
    }

    let button: Phaser.GameObjects.Text;


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

    // region Run the function
    render()
    // endregion
    return {
        render,
        update: (newProps: unknown) => {
            //const initialPosition = calculatePosition(newProps)
            let changedProps = []

            for(let key of Object.keys(newProps as Object)) {
                console.log(key)
                if(key in props) {
                    console.log(`${key} is in props value: ${props[key]} -> ${newProps[key]}`)
                    if (newProps[key] !== props[key]) {
                        changedProps.push(key)
                    }
                } else {
                    props[key] = newProps[key]
                    changedProps.push(key)
                }
            }
            console.log('changed: ')
            console.log(changedProps)



            //@ts-ignore
            if(changedProps.includes('text')) {
                //@ts-ignore
                button.text = newProps['text']
                console.log('button.text', button.text, '   ', newProps['text'])
            }

            //@ts-ignore
            if(changedProps.includes('position')) {
                //@ts-ignore
                props.position = newProps['position']
                const initialPosition = calculatePosition(props)
                button.x = initialPosition.x
                button.y = initialPosition.y
            }

            //@ts-ignore
            if(changedProps.includes('x')) {
                console.log("X calculating...")
                //@ts-ignore
                props.x = newProps['x']
                props.position = undefined
                const initialPosition = calculatePosition(props)
                console.log("initialPosition")
                console.log(initialPosition)
                button.x = initialPosition.x
                button.y = initialPosition.y
            }

            //@ts-ignore
            if(changedProps.includes('y')) {
                //@ts-ignore
                props.y = newProps['y']
                props.position = undefined
                const initialPosition = calculatePosition(props)
                console.log("initialPosition")
                console.log(initialPosition)
                button.x = initialPosition.x
                button.y = initialPosition.y
            }
        }
    }

}

