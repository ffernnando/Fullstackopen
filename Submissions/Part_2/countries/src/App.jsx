import { useState, useEffect } from 'react'
import axios from "axios"
import api from "./assets/api.json"

const CountryDetails = ({shownCountry, visibility}) => {
  if(!visibility){
    return;
  }
  const languages = Object.values(shownCountry.languages);
  const flag = shownCountry.flags.png
  const apiURL = `http://api.weatherapi.com/v1/current.json?key=${api.key}&q=${shownCountry.capital}`
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    axios
    .get(apiURL)
    .then(response => {
      setWeatherData(response.data)
    })
  }, [])
  
  return(
    <div>
      <h1>{ shownCountry.name.common }</h1>
      Capital: {shownCountry.capital} <br />
      Area: {shownCountry.area}
      <h2>Languages</h2>
      <ul>
        {languages.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={flag} />
      <h2>Weather in {shownCountry.capital}</h2>
      {weatherData !== null ? `Temperature: ${weatherData.current.temp_c}` : "Fetching weather data"} <br />
      <img src={weatherData?.current.condition.icon} alt='Image showing current weather' /> <br />
      {weatherData !== null ? `Wind: ${weatherData.current.wind_kph / 3.6} m/s` : "Fetching weather data"}
    </div>
    
  )
}

const Country = ({country}) => {
  const [visibility, setVisibility] = useState(false)
  
  return(
    <div>
      <li>{country.name.common}</li> <button onClick={() => setVisibility(!visibility)}>{visibility ? "Hide" : "Show"}</button>
      { <CountryDetails shownCountry={country} visibility={visibility}/> }
    </div>
    
  )
}

const CountriesList = ({shownList}) => {
  console.log("SHOWN LIST: ", shownList)
  return(
    <div>
      {shownList === "Too many matches, specify another filter" ? shownList : shownList.map(country => <Country key={country.id} country={country} />)}
    </div>
  )
}

function App() {
  const [newInput, setNewInput] = useState("")
  const [allCountries, setAllCountries] = useState([])
  const [newResult, setNewResult] = useState([])
  

  const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/"
  const shownList = newResult.length > 10 
    ? "Too many matches, specify another filter"
    : newResult 

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllCountries(response.data);
      }) 
  }, []);

  //Event handlers
  const handleChange = (event) => {
    setNewInput(event.target.value)
    event.target.value != "" ? setNewResult(() => allCountries.filter(country => (country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))) ) : setNewResult([])
    console.log(shownList);
  }

  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <label>find countries </label><input value={newInput} onChange={handleChange}/>
        {shownList.length !== 1 ? <CountriesList shownList={shownList}/> : <CountryDetails shownCountry={shownList[0]} visibility={true} /> }
      </form>
    </div>
  )
}

export default App
