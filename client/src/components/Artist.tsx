import React from 'react';
import styled from 'styled-components'

import { ThemeColour } from '../theme'

export type ArtistProps = {
    id: number
    first_name: string
    last_name: string
    tracks: {
        title: string
    }[] | undefined
}

const ArtistContainer = styled.div`
    h2 {
        color: ${ThemeColour.blueDarker};
    }
`

export const Artist = (artist: ArtistProps) => {
    const generateTracksConcat = () => {
        let concatTracks = ''
        artist.tracks?.forEach(track => {
            concatTracks += `${track.title}, `
        })
        return concatTracks
    }

    return (
        <ArtistContainer>
            <h2>{artist.first_name} {artist.last_name}</h2>
            <p>{artist.tracks && artist.tracks.length > 0 ? 'Track: ' + generateTracksConcat() :
            'There are currently no tracks'}</p>
        </ArtistContainer>
    )
}