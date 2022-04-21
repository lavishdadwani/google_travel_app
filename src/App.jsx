import React, { useEffect, useState } from 'react'
import Header from './components/header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'

import {Grid , CssBaseline } from "@material-ui/core"
import {getWeatherData,getPlacesData } from "./api/Api"
const App = () => {
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState("")


  const [coords, setCoords] = useState({})
  const [bounds, setBounds] = useState(null)
  const [weatherDate, setWeatherDate] = useState([])
  const [FilteredPlaces, setFilteredPlaces] = useState([])
  const [Places, setPlaces] = useState([])
  const [AutoCompleted, setAutoCompleted] = useState(null)
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
    if (bounds) {
      setLoading(true);

      getWeatherData(coords.lat, coords.lng)
        .then((data) => setWeatherDate(data));

      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setRating('');
          setLoading(false);
        });
    }
  }, [bounds, type]);

  // const onLoad = (autoC) => setAutoCompleted(autoC);

  // const onPlaceChanged = () => {
  //   const lat = autocomplete.getPlace().geometry.location.lat();
  //   const lng = autocomplete.getPlace().geometry.location.lng();

  //   setCoords({ lat, lng });
  // };
  
  return (

    <div>
      <CssBaseline />
      <Header/>
      <Grid container spacing={3} style={{width:"100%"}} >
        <Grid item xs={12} md={4} >
          <List places={Places} />
        </Grid>
        <Grid item xs={12} md={8} >
          <Map/>
        </Grid>
      </Grid>
    </div>
  )
}

export default App