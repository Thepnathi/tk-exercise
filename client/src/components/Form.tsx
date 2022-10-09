import React, { ReactElement } from 'react';
import styled from 'styled-components'

import { Button } from './Button'
import { PlatformMessage } from './PlatformMessage';

const FormContainer = styled.div`
    padding: 5px 20px;

    fieldset {
        margin: 20px 0;
    }
`

const AddTrackButton = styled(Button)`
    margin-top: 20px;
`

type FormFields = {
    first_name: string
    last_name: string
    tracks: {
        title: string
    }[]
}

export const Form = () => {
    const [formFields, setFormFields] = React.useState<FormFields>({ first_name: '', last_name: '', tracks: [{ title: '' }] })
    const [showPlatformMessage, setShowPlatformMessage] = React.useState(false)

    const handleSubmit = () => {
        fetch("http://localhost:8000/api/artist/artist/", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formFields)
          }).then(_ => {
            setShowPlatformMessage(true)
          });
    }

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedFormFields = {...formFields}
        // @ts-ignore: Having some type issue here and having issue to bybass
        updatedFormFields[event.target.name] = event.target.value
        setFormFields(updatedFormFields)
    }

    const handleTracksChange = (trackIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedFormFields = {...formFields}
        // @ts-ignore: Having some type issue here and having issue to bybass
        updatedFormFields['tracks'][trackIndex]['title'] = event.target.value
        setFormFields(updatedFormFields)
    }

    const handleAddTrack = (event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedFormFields = { ...formFields }
        updatedFormFields.tracks.push({ title: '' })
        setFormFields(updatedFormFields)
    }

    React.useEffect(() => {
        console.log(formFields)
    }, [formFields])

    return (
        <FormContainer>
            <h2>New Artist</h2>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label>
                        <p>First Name</p>
                        <input name='first_name' value={formFields.first_name} onChange={handleFieldChange} />
                    </label>
                    <label>
                        <p>Last Name</p>
                        <input name="last_name" value={formFields.last_name} onChange={handleFieldChange} />
                    </label>
                    <div>
                        {formFields.tracks.length > 0 && <p>Tracks</p>}
                        {formFields.tracks.length > 0 && formFields.tracks.map((track, index) => {
                            const trackKey = `track-${index}`
                            return (
                                <label key={trackKey}>
                                    <input name='track' placeholder='Track' value={formFields.tracks[index].title} onChange={event => handleTracksChange(index, event)}/>
                                </label>
                            )
                        })}
                    </div>
                    <AddTrackButton text="Add Track" onClick={handleAddTrack} />
                </fieldset>
                {showPlatformMessage && <PlatformMessage type='Success' messageContent={(<p>Added New Artist!</p>)} />}
                <Button type="submit" text="Submit" onClick={handleSubmit} />
            </form>
        </FormContainer>
    )
}