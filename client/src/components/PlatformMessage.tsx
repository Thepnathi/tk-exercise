import React from 'react'
import styled from 'styled-components'

import { ThemeColour } from '../theme/Theme'

type PlatformType = 'Success' | 'Failure'

export type PlatformMessageProps = {
    messageContent: string | JSX.Element
    type: PlatformType
}

const PlatformMessageContainer = styled.div<{type: PlatformType}>`
    height: 50px;
    width: 300px;
    border-radius: 6px;
    border-style: none;
    padding: 2px 4px;
    position: relative;
    text-align: center;
    background-color: ${props => props.type === 'Success' ? ThemeColour.baseGreen : ThemeColour.crimsonRed};
    color: #fff;
`

export const PlatformMessage = ({messageContent, type}: PlatformMessageProps) => {

    return (
        <PlatformMessageContainer type={type}>
            {messageContent}
        </PlatformMessageContainer>
    )
}