import React, { useState, useContext, useRef } from 'react'
import NoteContext from '../Context/Note/NoteContext'
import { toast } from "react-toastify";

export default function AddNotes() {
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const closeModal = useRef(null)
    const { addNote } = useContext(NoteContext)
    const handleChange = (e) => {
        setNote(preData => {
            return {
                ...preData,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleSubmit = () => {

        if (note.title && note.description) {
            addNote(note.title, note.description, note.tag)
            setNote({ title: "", description: "", tag: "" })
            closeModal.current.click()
        } else {
            toast.error("title and description reqiured !", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
                className: "toast--message"
            });
        }

    }
    return (
        <>
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="add--new--note" data-bs-toggle="modal" data-bs-target="#exampleModa2">
                add new note
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModa2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => e.preventDefault()} style={{}}>

                                <div className='input--container'>
                                    <label htmlFor='title'>
                                        Title
                                    </label>
                                    <input type='text' name='title' onChange={handleChange} placeholder='add title' value={note.title} id='title' />
                                </div>
                                <div className='input--container'>
                                    <label htmlFor='description'>
                                        description
                                    </label>
                                    <textarea name='description' onChange={handleChange} placeholder='add description' value={note.description} id='description' />
                                </div>
                                <div className='input--container'>
                                    <label htmlFor='tag'>
                                        tag
                                    </label>

                                    <select
                                        id="tag"
                                        name="tag"
                                        value={note.tag}
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
                            <button type="button" ref={closeModal} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save Note</button>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}
