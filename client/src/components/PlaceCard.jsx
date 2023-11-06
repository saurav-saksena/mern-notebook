import React from 'react'

export default function PlaceCard() {
    return (
        <>
            <div className="card my--placeholder" aria-hidden="true">
                <img src="https://garden.spoonflower.com/c/12586920/p/f/m/b8R68RYIJUkUsZg3OPTze7TTMXza4deo8jkGD9cGAcZWf-isXQSC/Light%20Grey%20Solid%20Color.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                    </p>
                    <a className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                </div>
            </div>

        </>
    )
}
