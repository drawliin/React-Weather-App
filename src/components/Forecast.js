import React, {useState} from 'react'
import ReactAnimatedWeather from 'react-animated-weather'

function Forecast({data}) {

    const FiveDaysWeatherInfo = retrieveFiveDaysWeatherInfo(data);
    const {main, weather, wind} = FiveDaysWeatherInfo[0];
    const [isCelsius, setIsCelsius] = useState(true);

    function retrieveFiveDaysWeatherInfo(data){
        let dates = [];
        let tempData = [];
        for(let i of data.list){
            const date = new Date(`${i.dt_txt}`).getDate();
            if(!dates.includes(date)){
                tempData.push(i);
                dates.push(date)
            }
            if(dates.length >= 5){
                break;
            }
        }
        return tempData;
    }
    
    const weatherIconMap = {
        "01d": "CLEAR_DAY",      // Clear sky - Day
        "01n": "CLEAR_NIGHT",    // Clear sky - Night
        "02d": "PARTLY_CLOUDY_DAY",  // Few clouds - Day
        "02n": "PARTLY_CLOUDY_NIGHT", // Few clouds - Night
        "03d": "CLOUDY",         // Scattered clouds - Day
        "03n": "CLOUDY",         // Scattered clouds - Night
        "04d": "CLOUDY",         // Broken clouds - Day
        "04n": "CLOUDY",         // Broken clouds - Night
        "09d": "RAIN",           // Shower rain - Day
        "09n": "RAIN",           // Shower rain - Night
        "10d": "RAIN",           // Rain - Day
        "10n": "RAIN",           // Rain - Night
        "11d": "WIND",           // Thunderstorm - Day
        "11n": "WIND",           // Thunderstorm - Night
        "13d": "SNOW",           // Snow - Day
        "13n": "SNOW",           // Snow - Night
        "50d": "FOG",            // Mist - Day
        "50n": "FOG"             // Mist - Night
      };


    

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
            

            <div className='thisDayData'>
                <h1>{data.city.name}, {data.city.country}</h1>
                <p className='currentDate'>{getCurrentDate()}</p>

                <div className='temp'>
                    <ReactAnimatedWeather 
                        icon={weatherIconMap[weather[0].icon]}
                        size={90}
                        animate={true}
                    />
                    <span>
                        {toCelsius(main.temp)}
                        <sup onClick={() => {setIsCelsius(prvState => !prvState)}}>{isCelsius ? '°C | °F' : '°F | °C'}</sup>
                    </span>

                </div>

                <p className='weatherDescription'>{weather[0].description}</p>

                <div className='generalInfoContainer'>
                    <div className='generalInfo'>
                        <ReactAnimatedWeather icon="WIND" size={40} animate={true}/>
                        <div>
                            <span>{wind.speed} m/s</span>
                            <span>Wind speed</span>
                        </div>
                    </div>

                    <div className='generalInfo'>
                        <ReactAnimatedWeather icon="RAIN" size={40} animate={true} />
                        <div>
                            <span>{main.humidity} %</span>
                            <span>humidity</span>
                        </div>
                    </div>    
                </div>
            </div>



            <div className='FFContainer'>
                <h1>5-Day Forecast</h1>
                <div className='fiveDaysForecast'>
                    {FiveDaysWeatherInfo.map((element, index) => {
                        return(
                            <div key={index}>
                                <p>{new Date(element.dt * 1000).toLocaleDateString('en-US', {weekday: "short"})}</p>
                                <ReactAnimatedWeather 
                                    icon={weatherIconMap[element.weather[0].icon]}
                                    size={30}
                                    animate={true}
                                />
                                <p>{toCelsius(element.main.temp_min)} °/ {toCelsius(element.main.temp_max)}°</p>
                            </div>      
                        )
                    })}
                    
                    
                </div>
            </div>

        </div>
    )
}

export default Forecast