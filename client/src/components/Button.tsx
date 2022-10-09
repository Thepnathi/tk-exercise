import React from 'react';
import styled from 'styled-components'

import {ThemeColour} from '../theme'

export type ButtonTypes = 'small' | 'medium' | 'large'

export type ButtonProp = {
    text: string
    type?: 'submit' | 'reset'
    size?: ButtonTypes
    onClick?: any
}

const StyledButton = styled.button<{size?: ButtonTypes}>`
    background-color: ${ThemeColour.blueDarker};
    border-radius: 6px;
    border-style: none;
    color: #fff;
    cursor: pointer;
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    height: 40px;
    line-height: 20px;
    list-style: none;
    margin: 0;
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

    return (
        <React.Fragment>
            <StyledButton type="button" onClick={props.onClick}>{props.text}</StyledButton>
        </React.Fragment>
    )
}

// .button-1:hover,
// .button-1:focus {
//   background-color: #F082AC;
// }