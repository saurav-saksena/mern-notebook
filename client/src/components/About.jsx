
import React from 'react'
import developer from "../developer.png"
import Footer from './Footer'
export default function About() {

    return (
        <>
            <div className='about--container'>
                <h4 className='about--modal--tag'>Frequently asked questions !</h4>
                <div className=' m-2 d-flex justify-content-center'>
                    <div className="accordion accordion-flush col-lg-4 about--modal" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                    How does this application work ?
                                </button>
                            </h2>
                            <div id="flush-collapseThree" className="accordion-collapse collapse fw-bold" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    This application is developed on mern-stack technology so this works really fast. When a user logged in with credentials they can create a note and edit that note whenever they want and delete that note if required.
                                    User can see their notes anytime without compromising with their privacy.
                                    This application is 100% free to use.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    Is this application safe to use ?
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body fw-bold">This application is 100% secure and safe and constantly maintains security parameters.</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                    can others see my notes ?
                                </button>
                            </h2>
                            <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body fw-bold">Privacy is our first priority. So other user can not see your private notes.</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className='developer--container'>
                <img src={developer} alt='developer' className='developer--pic' />
                <h1 className='developer--name'>KUMAR SAURAV SAKSENA</h1>
                <p className='developer--work'>MERN-STACK WEB DEVELOPER</p>

            </div>
            <Footer />
        </>
    )
}
