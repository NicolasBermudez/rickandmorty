import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'
import ErrorFetch from './components/ErrorFetch'


function App() {

  const [location, setLocation] = useState()

  const [locationInput, setLocationInput] = useState()

  const [hasError, setHasError] = useState(false)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
    setTimeout(() =>
      setLoading(true), [2000])
  }, [])

  useEffect(() => {

    let URL

    if (locationInput) {
      URL = `https://rickandmortyapi.com/api/location/${locationInput}`
    } else {
      const randomIdLocation = Math.floor(Math.random() * 126) + 1
      URL = `https://rickandmortyapi.com/api/location/${randomIdLocation}`

    }

    axios.get(URL)
      .then(res => {
        setHasError(false)
        setLocation(res.data)
      })
      .catch(err => {
        setHasError(true)
        console.log(err)
      })
  }, [locationInput])

  const handleSubmit = e => {
    e.preventDefault()
    setLocationInput(e.target.inputSearch.value)
  }

  return (
    <div className="App">
      <div className={`App__loading ${loading && 'App__loadin-close'}`}  ></div>
      <form className='App__form' onSubmit={handleSubmit} >
        <input className='App__input-search' id='inputSearch' type="text" />
        <button className='App__btn-search' >Search</button>
      </form>
      {
        hasError ?

          <ErrorFetch />
          :
          <>
            <div className='location-container' >
              <LocationInfo location={location} />
            </div>
            <div className='residents-container'>
              {
                location?.residents.map(url => (
                  <ResidentCard key={url} url={url} />
                  ))
                }
            </div>
          </>
      }


    </div>
  )
}

export default App
