import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';


import { Button, ButtonColor } from '../Button';
import { PlatformMessage } from '../PlatformMessage';

const FormContainer = styled.div`
    padding: 5px 20px;

    fieldset {
        margin: 20px 0;
    }
`

type FormType = 'create' | 'edit'

export type FormFields = {
    first_name: string
    last_name: string
    tracks: {
        title: string
    }[]
}

export const ArtistForm = () => {
    const { artistId } = useParams()
    const [formType, setFormType] = React.useState<FormType>('create')
    const [formFields, setFormFields] = React.useState<FormFields>({ first_name: '', last_name: '', tracks: [{ title: '' }] })
    const [showPlatformMessage, setShowPlatformMessage] = React.useState(false)

    React.useEffect(() => {
        console.log(formFields)
    }, [formFields])

    React.useEffect(() => {
        if (artistId) {
            setFormType('edit')
            fetch(`http://localhost:8000/api/artist/artist/${artistId}`)
                .then((response) => response.json())
                .then((data) => {
                    setFormFields(data)
                });
        }
    }, [artistId])

    const handleCreateNewArtist = () => {
        fetch("http://localhost:8000/api/artist/artist/", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formFields)
        }).then(_ => {
            setShowPlatformMessage(true)
        });
    }

    const handleEditArtist = () => {
        if (formType === 'edit') {
            fetch(`http://localhost:8000/api/artist/artist/${artistId}/`, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formFields)
            }).then(_ => {
                setShowPlatformMessage(true)
            });
        }
    }

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedFormFields = { ...formFields }
        // @ts-ignore: Having some type issue here and having issue to bybass
        updatedFormFields[event.target.name] = event.target.value
        setFormFields(updatedFormFields)
    }

    const handleTracksChange = (trackIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedFormFields = { ...formFields }
        // @ts-ignore: Having some type issue here and having issue to bybass
        updatedFormFields['tracks'][trackIndex]['title'] = event.target.value
        setFormFields(updatedFormFields)
    }

    const handleAddTrack = (event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedFormFields = { ...formFields }
        updatedFormFields.tracks.push({ title: '' })
        setFormFields(updatedFormFields)
    }

    const handleRemoveTrack = (trackIndex: number) => {
        let updatedFormFields = { ...formFields }
        updatedFormFields.tracks.splice(trackIndex, 1);
        setFormFields(updatedFormFields)
     }

    return (
        <FormContainer>
            <h1>{formType === 'create' ? 'New Artist' : 'Edit Artist'}</h1>
            <form onSubmit={formType === 'create' ? handleCreateNewArtist : handleEditArtist}>
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
                        {formFields.tracks.length > 0 && formFields.tracks.map((_, index) => {
                            const trackKey = `track-${index}`
                            return (
                                <label key={trackKey}>
                                    <input name='track' placeholder='Track' value={formFields.tracks[index].title}
                                        onChange={event => handleTracksChange(index, event)} />
                                    <Button text="Remove" onClick={() => handleRemoveTrack(index)}  colour={ButtonColor.Red} />
                                </label>
                            )
                        })}
                    </div>
                    <Button text="Add Track" onClick={handleAddTrack} />
                </fieldset>
                {showPlatformMessage &&
                    <PlatformMessage
                    type='Success'
                    messageContent={(<p>{formType === 'create' ? 'Added New Artist' : 'Updated Artist!'}</p>)} />}
                <div>
                    <Button type="submit" text={`${formType === 'create' ? 'Submit New Artist' : 'Update Artist'}`}
                        onClick={formType === 'create' ? handleCreateNewArtist : handleEditArtist} />
                    <a href="/">
                        <Button text="Back" />
                    </a>
                </div>
            </form>
        </FormContainer>
    )
}