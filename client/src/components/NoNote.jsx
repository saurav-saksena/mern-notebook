import React, { useContext, useEffect, useState } from 'react'
import NoteContext from '../Context/Note/NoteContext'
import notFound from "../no-record-found.png"
import PlaceCard from './PlaceCard'

export default function NoNote() {
    const [hideCard, setHideCard] = useState("flex")
    const { userDetails, } = useContext(NoteContext)
    useEffect(() => {
        setTimeout(() => {
            setHideCard("none")
        }, 500)
    })

    return (
        <>
            <div className='loading--placeholder'>
                <div className="placecard--none" style={{ display: hideCard }}>
                    <PlaceCard />
                    <PlaceCard />
                    <PlaceCard />
                </div>
                <div className="my--product--notfound">
                    <p>{userDetails.name} , We do not have any note to display...</p>
                    <img src={notFound} alt="data not found..." />
                </div>
            </div>


        </>

    )
}
