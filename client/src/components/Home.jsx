import React, { useContext, useEffect, useState, useRef } from 'react'
import NoteContext from '../Context/Note/NoteContext'
import DisplayNotes from './DisplayNotes'
import AddNotes from './AddNotes'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import NoNote from './NoNote'

export default function Home() {
    const { notes, editNote, getMyNotes, loggedUser } = useContext(NoteContext)
    const [note, setNote] = useState({
        id: "",
        ntitle: "",
        ndescription: "",
        ntag: ""
    })
    const navigate = useNavigate()
    const ref = useRef(null)


    useEffect(() => {
        if (localStorage.getItem("tokenNotebook")) {
            getMyNotes();
            loggedUser()
        } else {
            navigate("/login")
        }
        // eslint-disable-next-line
    }, []);
    const handleChange = (e) => {
        setNote(preData => {
            return {
                ...preData,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleSubmit = () => {
        console.log(note)
        editNote(note.id, note.ntitle, note.ndescription, note.ntag)

    }
    const updateNote = (initialNote) => {
        ref.current.click()
        setNote({ id: initialNote._id, ntitle: initialNote.title, ndescription: initialNote.description, ntag: initialNote.tag })
    }

    return (
        <>
            <ToastContainer />
            <AddNotes />

            {/* get all notes with map function and display notes in DisplayNotes Component */}
            <div className='display--notes--contaier'>
                {notes.length !== 0 ?
                    notes.map((noteItem) => (
                        <DisplayNotes key={noteItem._id} noteItem={noteItem} updateNote={updateNote} />
                    )) : <NoNote />
                }
            </div>


            {/* edit modal for notes  */}
            <button
                type="button"
                ref={ref}
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel"> edit note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className='input--container'>
                                    <label htmlFor='ntitle'>
                                        Title
                                    </label>
                                    <input
                                        type='text'
                                        name='ntitle'
                                        onChange={handleChange}
                                        placeholder='add title'
                                        value={note.ntitle}
                                        id='ntitle'
                                    />
                                </div>

                                <div className='input--container'>
                                    <label htmlFor='ndescription'>
                                        description
                                    </label>
                                    <textarea

                                        name='ndescription'
                                        onChange={handleChange}
                                        placeholder='add description'
                                        value={note.ndescription}
                                        id='ndescription'
                                    />
                                </div>
                                <div className='input--container'>
                                    <label htmlFor='ntag'>
                                        tag
                                    </label>
                                    {/* <input
                                        type='text'
                                        name='ntag'
                                        onChange={handleChange}
                                        placeholder='add tag'
                                        value={note.ntag}
                                        id='n-tag'
                                    /> */}
                                    <select
                                        id="ntag"
                                        name="ntag"
                                        value={note.ntag}
                                        onChange={handleChange}
                                        className='input--tag--select'
                                    >
                                        <option value="">--select-a-tag-- </option>
                                        <option value="general">general</option>
                                        <option value="personal"> personal</option>
                                        <option value="professional">Professional </option>



                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal">
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={handleSubmit}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
