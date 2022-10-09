import React from 'react';
import styled from 'styled-components'

import PlaceHolderImage from '../assets/record_player.jpg'

export type CardProps = {
    image?: string
    content: JSX.Element
}

const CardContainer = styled.div`
    padding: 8px;
    width: 300px;
    height: 500px;
    border: 1px solid black;
    border-radius: 6px;
`

const CardImageContainer = styled.img`
    width: 100%;
    height: 320px;
`

export const Card = ({image, content}: CardProps) => {
    return (
        <CardContainer>
            <CardImageContainer src={PlaceHolderImage} />
            {content}
        </CardContainer>
    )
}