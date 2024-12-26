import React from 'react'

function Forecast() {
  return (
    <div className='forecastContainer'>
        <div>
            <h1>Oujda, Morocco</h1>
            <p>Thursday, December 26, 2024</p>

            <div>
                15 C | F
                <p>clear sky</p>
            </div>

            <div>
                <div>Wind speed</div>
                <div>humidity</div>
            </div>
        </div>

        <div>
            <p>5-Day Forecast</p>
            <div>
                <div>Thu</div>
                <div>Thu</div>
                <div>Thu</div>
                <div>Thu</div>
                <div>Thu</div>
            </div>
        </div>

    </div>
  )
}

export default Forecast