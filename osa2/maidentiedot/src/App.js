import { useEffect, useState } from 'react'
import axios from 'axios'

console.log('API KEY', process.env.REACT_APP_WEATHER_API_KEY)

const Search = ({ search, handleSearch }) => {
  return (
    <div>
      <form>
        <div>
          find countries <input value={search} onChange={handleSearch} />
        </div>
      </form>
    </div>
  )
}

const Countries = ({ countries, search, setInputValue }) => {
  let filtered = countries

  if (search.length > 0) {
    filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (filtered.length > 10) {
    return 'Too many matches, specify another filter'
  } else if (filtered.length === 1) {
    return <Country country={filtered[0]} />
  } else {
    return (
      <div>
        <ul>
          {filtered.map(country => (
            <li key={country.name.common}>
              {country.name.common}{' '}
              <button onClick={() => setInputValue(country.name.common)}>
                show
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const Country = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <p>Capital: {country.capital.join(', ')}</p>
    <p>Population: {country.population}</p>
    <h2>Languages</h2>
    <ul>
      {Object.keys(country.languages).map(languageKey => (
        <li key={languageKey}>{country.languages[languageKey]}</li>
      ))}
    </ul>
    <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
    <Weather country={country} />
  </div>
)

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
  }, [country])

  if (!weather) return

  return (
    <div>
      <h2>Weather in {country.capital[0]}</h2>
      <p>
        Temperature: {weather.main.temp} {'\u2103'}
      </p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather.description}
      ></img>
      <p>
        Wind speed: {weather.wind.speed} {'\u33a7'}
      </p>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setNewSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }, [])

  const handleSearch = event => {
    setNewSearch(event.target.value)
  }

  const setInputValue = name => {
    setNewSearch(name)
  }

  return (
    <div>
      <Search search={search} handleSearch={handleSearch} />
      <Countries
        countries={countries}
        search={search}
        setInputValue={setInputValue}
      />
    </div>
  )
}
export default App
