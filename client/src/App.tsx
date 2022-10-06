import React from 'react';
import styled from 'styled-components'

import travelPerkLogo from './assets/tk_logo_full.png';

import { Artist, ArtistProps, Card, Button, ButtonTypes } from './components'

const StyledCard = styled(Card)`
  margin-bottom: 50px;
`

const ArtistCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-gap: 10px;
  height: 100%;
  width: 100%;
  margin-right: 20px;
`

function App() {
  const [artists, setArtists] = React.useState<ArtistProps[] | undefined>(undefined)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch('http://localhost:8000/api/artist/artist/')
      .then((response) => response.json())
      .then((data) => {
        setArtists(data)
        setLoading(false)
      });
  }, [])

  const deleteArtist = (id: number) => {
    fetch('http://localhost:8000/api/artist/artist/' + id, {
      method: 'DELETE',
    })
    .then(res => res.json()) // or res.json()
    .then(res => console.log(res))
  }

  const artistCards = artists && artists.map(artist => {

    const cardContent = (
      <React.Fragment>
        <Artist {...artist} />
        <Button text='delete' onClick={() => deleteArtist(artist.id)}/>
      </React.Fragment>
    )

    return <StyledCard key={artist.id} content={cardContent} />
  })

  return (
    <div>
      <img src={travelPerkLogo} alt="TravelPerk logo"
        height="30%" width="30%"
      />
      <h1>Jordi's Record Store</h1>
      <h2>Part of TravelPerk</h2>
      <Button text='delete' onClick={() => deleteArtist(1)}/>
      <p>See what is in store today. The best record store in Barcelona!</p>
      {loading ? <div>Loading...</div> : artists && artists.length > 0 ? (
        <ArtistCardContainer>
          {artistCards}
        </ArtistCardContainer>
        ) : (<div>There are currently no records</div>)
      }
    </div>
  )
}

export default App;
