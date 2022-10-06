import React from 'react';
import styled from 'styled-components'

export type CardProps = {
    image?: string
    content: JSX.Element
}

const CardContainer = styled.div`
    width: 300px;
    height: 200px;
    border: 1px solid black;
`

const CardImage = styled.div`
    width: 100%;
    height: 30%;
    background: pink;
`

export const Card = ({image, content}: CardProps) => {
    return (
        <CardContainer>
            {/* <CardImage /> */}
            {content}
        </CardContainer>
    )
}