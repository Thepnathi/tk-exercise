import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import styled from 'styled-components'


import travelPerkLogo from './assets/tk_logo_full.png';
import { ThemeColour } from './theme'

import { Artist, ArtistProps, EditArtist, Card, Button, Form } from './components'

const AppContainer = styled.div`
  width: 80%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Nunito Sans', sans-serif;

  h1 {
    font-weight: 400;
    color: ${ThemeColour.blueDarker};
  }

  h2 {
    font-weight: 600;
  }

  p {
    font-weight: 500;
  }
`

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

const CardContentButtonsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 10px;
`

const Home = () => {
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
    .catch(err => console.log)
  }

  const artistCards = artists && artists.map(artist => {

    const cardContent = (
      <React.Fragment>
        <Artist {...artist} />
        <CardContentButtonsContainer>
          <Button text='Update' onClick={() => {}} />
          <Button text='Delete' onClick={() => deleteArtist(artist.id)}/>
        </CardContentButtonsContainer>
      </React.Fragment>
    )

    return <StyledCard key={artist.id} content={cardContent} />
  })

  return (
    <AppContainer>
      <img src={travelPerkLogo} alt="TravelPerk logo"
        height="30%" width="30%"
      />
      <h1>Jordi's Records Admin Page</h1>
      <p>See what is in store today. The best record store in Barcelona!
         I will be pet i will be pet and then i will hiss leave dead animals
          as gifts love blinks and purr purr purr purr yawn. Love catch mouse and gave it as a present paw your face to wake you up in the morning. Chase mice go into a room to decide you didn't want to be in there anyway for walk on a keyboard litter box is life sit in window and stare oooh, a bird, yum but eats owners hair then claws head. While happily ignoring when being called kitty kitty pussy cat doll human clearly uses close to one life a night no one naps that long so i revive by standing on chestawaken!. Who's the baby lick yarn hanging out of own butt scratch me now! stop scratching me! so meow loudly just to annoy owners so sit on the laptop, eat prawns daintily with a claw then lick paws clean wash down prawns with a lap of carnation milk then retire to the warmest spot on the couch to claw at the fabric before taking a catnap. </p>
      <h1>Records</h1>
      {loading ? <div>Loading...</div> : artists && artists.length > 0 ? (
        <ArtistCardContainer>
          {artistCards}
        </ArtistCardContainer>
        ) : (<div>There are currently no records</div>)
      }
    </AppContainer>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artist/new" element={<Form />} />
        <Route path="artist">
          <Route path=":artistId" element={<EditArtist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
