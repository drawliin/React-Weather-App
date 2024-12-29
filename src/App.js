import React, {useState, useEffect} from 'react';
import SearchEngine from "./components/SearchEngine";
import Forecast from './components/Forecast';

function App() {

    const [query, setQuery]= useState('');
    const [weather, setWeather] = useState({
      data: '',
      loading: true,
      error: false
    })

    const apiKey = '6affb41c9f8c4d092f5f95da7be6227c'

    const search = (e) => {
      if((query && e.type === 'click') || (query && e.type==='keypress' && e.key==="Enter")){
        e.preventDefault();
        setWeather({...weather, loading: true, error: false})

        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}`;

        fetch(url)
        .then(res => {
          if (!res.ok){
            throw new Error('Sorry... Enter a valid city')
          }
          return res.json()
        })
        .then(data => {
          setWeather({data: data, loading: false, error: false})
        })
        .catch(error => {
          console.log(error);
          setWeather({data:{}, error: true, loading: false})
        })
        setQuery('')
      }
    }

    useEffect(() => {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=Oujda&appid=${apiKey}`;

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
        setWeather({data:{}, error: true, loading: false})
      })
    }, [])

    
  


    return (
      <div className="App">

        <SearchEngine query={query} setQuery={setQuery} search={search}/>

        {weather.loading && (
          <>
            <br/>
            <br/>
            <p className='loadingMessage'>Loading...</p>
          </>
        )}

        {weather.error && (
          <p className='errorMessage'>Sorry... Enter a valid city name</p>
        )}

        {weather.data && !weather.error && !weather.loading && (

          <Forecast data={weather.data}/>

        )}  

      </div>
    );
}

export default App;
