import React, {useState} from 'react'

function Forecast({data}) {

    const FiveDaysWeatherInfo = data.list.slice(0,5);
    const {main, weather, wind} = FiveDaysWeatherInfo[0];
    const [isCelsius, setIsCelsius] = useState(true);

    /**/
    console.log(FiveDaysWeatherInfo)
    console.log(data)
    /**/

    const getCurrentDate = () => {
        const options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };

        const date = new Date().toLocaleDateString('en-US', options);

        return date
    }

    const toCelsius = (val) => {
        if(!isCelsius){
            return Math.round((val - 273.15) * 9/5 + 32)
        }
        return Math.round(val - 273.15)
    }


    return (
        <div className='forecastContainer'>
            
            <div>
                <h1>{data.city.name}, {data.city.country}</h1>
                <p>{getCurrentDate()}</p>

                <div>
                    <span>{toCelsius(main.temp)}</span>
                    <span onClick={() => {setIsCelsius(prvState => !prvState)}}>{isCelsius ? 'C | F' : 'F | C'}</span>
                    
                </div>
                <p>{weather[0].description}</p>

                <div>
                    <div>
                        <span>icon</span>
                        <div>
                            <span>{wind.speed} m/s</span>
                            <span>Wind speed</span>
                        </div>
                    </div>

                    <div>
                        <span>icon</span>
                        <div>
                            <span>{main.humidity} %</span>
                            <span>humidity</span>
                        </div>
                    </div>    
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