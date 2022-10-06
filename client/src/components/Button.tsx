import React from 'react';
import styled from 'styled-components'

import {ThemeColour} from '../theme'

export type ButtonTypes = 'small' | 'medium' | 'large'

export type ButtonProp = {
    text: string
    size?: ButtonTypes
    onClick: any
}

const StyledButton = styled.button<{size?: ButtonTypes}>`
    padding: 16px;
    background-color: ${ThemeColour.blueDarker};
    color: #FFF;
`

export const Button = (props: ButtonProp) => {

    return (
        <React.Fragment>
            <StyledButton type="button" onClick={props.onClick}>{props.text}</StyledButton>
        </React.Fragment>
    )
}