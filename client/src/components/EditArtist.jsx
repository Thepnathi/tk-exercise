import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'

import { ThemeColour } from '../theme'


export const EditArtist = () => {
    const { artistId } = useParams()
    const [artists, setArtists] = React.useState<ArtistProps | undefined>(undefined)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        fetch(`http://localhost:8000/api/artist/artist/${artistId}`)
          .then((response) => response.json())
          .then((data) => {
            setArtists(data)
            setLoading(false)
          });
      }, [artistId])

    return (
        <div>
            {loading ? <h1>Loading artist...</h1> : (
                <div>
                    {/* <h1>{artist.fi</h1> */}
                </div>
            )}
        </div>
    )
}