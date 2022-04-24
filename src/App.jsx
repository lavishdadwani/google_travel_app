import React, { useEffect, useState } from 'react'
import Header from './components/header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'

import {Grid , CssBaseline } from "@material-ui/core"
import axios from 'axios'

const App = () => {
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState("")


  const [coords, setCoords] = useState({})
  const [bounds, setBounds] = useState(null)
  const [weatherData, setWeatherData] = useState([])
  const [FilteredPlaces, setFilteredPlaces] = useState([])
  const [Places, setPlaces] = useState([])
  const [autocomplete, setAutocomplete] = useState(null);
  const [ChiledClicked, setChiledClicked] = useState(null)
  const [Loading, setLoading] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
      setCoords({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    const filtered = Places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);



  useEffect(() => {
    if (bounds.sw && bounds.ne) {
     

      getWeatherData(coords.lat, coords.lng)
        

      getPlacesData(type, bounds.sw, bounds.ne)
       
    }
  }, [bounds, type]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

   const getPlacesData = async (type, sw, ne) => {
    try {
      setLoading(true);
      const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
      });
      console.log(data)
      setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
      setFilteredPlaces([]);
      setRating('');
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  
 const getWeatherData = async (lat, lng) => {
    try {
      setLoading(true);
      if (lat && lng) {
        const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
          params: { lat, lon: lng },
          headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          },
        });
  
        setWeatherData(data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{width:"100%"}} >
        <Grid item xs={12} md={4} >
          <List places={FilteredPlaces.length ? FilteredPlaces : Places }
          ChiledClicked={ChiledClicked}
          setType={setType}
          rating={rating}
          setRating={setRating}
          isLoading={Loading}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{display:'flex',justifyContent:"center", alignItems:"center"}}  >
          <Map
          setCoordinates={setCoords}
          setBounnds={setBounds}
          Coordinates={coords}
          setChiledClicked={setChiledClicked}
          places={FilteredPlaces.length ? FilteredPlaces : Places }
          weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default App