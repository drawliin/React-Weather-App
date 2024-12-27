import React, {useState, useEffect} from 'react';
import SearchEngine from "./components/SearchEngine";
import Forecast from './components/Forecast';

function App() {

    const [weather, setWeather] = useState({
      data: '',
      loading: true,
      error: false
    })

    const apiKey = '6affb41c9f8c4d092f5f95da7be6227c'

    useEffect(() => {
      const url = `http://api.openweathermap.org/data/2.5/forecast?q=Rabat&appid=${apiKey}`;

      fetch(url)
      .then(res => {
        if(!res.ok){
          throw new Error('Sorry.. Enter a Valid City')
        }
        return res.json()
      }
      )
      .then(data => {
        setWeather({
          data: data,
          loading: false,
          error: false
        });
        console.log(data)
      })
      .catch(error => {
        console.error(error);
        setWeather({...weather, data:{}, error: true, loading: false})
      })
    }, [])

    
  


    return (
      <div className="App">

        <SearchEngine/>

        {weather.loading && (
          <>
            <br/>
            <br/>
            <p>Loading...</p>
          </>
        )}

        {weather.error && (
          <p>Sorry... Enter a valid city name</p>
        )}

        {weather.data && !weather.error && !weather.loading && (

          <Forecast data={weather.data}/>

        )}  

      </div>
    );
}

export default App;
