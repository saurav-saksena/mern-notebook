import React, { useContext } from 'react'


import NoteContext from '../Context/Note/NoteContext'
export default function DisplayNotes(props) {
    const { deleteNote } = useContext(NoteContext)
    const { noteItem, updateNote } = props

    return (

        <div className='display--notes'>

            <h2 className='display--tag' title='tag'>{noteItem.tag.toUpperCase()}</h2>

            <div className='title--container'>
                <h3 className='title--heading'>Title :</h3>
                <h3 className='display--title'>{noteItem.title}</h3>
            </div>
            <div className='title--container'>
                <h3 className='description--heading'>description :</h3>

                <p className='display--description'>{noteItem.description}</p>
            </div>
            <p className='display--time'>Created at : {new Date(noteItem.date).toLocaleDateString() + " || " + new Date(noteItem.date).getHours() + " : " + new Date(noteItem.date).getMinutes()}</p>
            <div className='icon--container d-flex justify-content-between'>

                <i
                    className="fa-solid fa-trash-can display--icon"
                    title='delete-note'
                    onClick={() => deleteNote(noteItem._id)}>
                </i>



                <i
                    className="fa-regular fa-pen-to-square display--icon"
                    title='edit-note'
                    onClick={() => updateNote(noteItem)}>
                </i>


            </div>

        </div>

    )
}
