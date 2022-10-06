import React from 'react';
import styled from 'styled-components'

import {ThemeColour} from '../theme'

export type ArtistProps = {
    id: number
    name: string
    website: string
    tracks: string[] | []
}

const ArtistContainer = styled.div`
    h2 {
        color: ${ThemeColour.blueDarker};
    }
`

export const Artist = (artist: ArtistProps) => {
    const allTracks = artist.tracks.join(', ')

    return (
        <ArtistContainer>
            <h2>{artist.name}</h2>
            <p>Website: {artist.website}</p>
            <p>Tracks: {allTracks}</p>
        </ArtistContainer>
    )
}