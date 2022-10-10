import React from 'react';
import styled from 'styled-components'

import {ThemeColour} from '../../theme'

export enum ButtonColor {
    Green,
    Red,
    Base,
}

export type ButtonProp = {
    text: string
    type?: 'submit' | 'reset'
    colour?: ButtonColor
    onClick?: any
}

const StyledButton = styled.button<{colour?: ButtonColor}>`
    background-color: ${prop => prop.colour === ButtonColor.Green ? ThemeColour.baseGreen :
        prop.colour === ButtonColor.Red ? ThemeColour.crimsonRed :
        ThemeColour.blueDarker};
    border-radius: 6px;
    border-style: none;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    height: 40px;
    outline: none;
    padding: 10px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: color 100ms;
    vertical-align: baseline;
    user-select: none;
    touch-action: manipulation;
`

export const Button = (props: ButtonProp) => {
    return <StyledButton type="button" onClick={props.onClick} colour={props.colour}>{props.text}</StyledButton>
}