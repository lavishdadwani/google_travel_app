import React from 'react'
import GoogleMapReact from "google-map-react"
import useStyles from "./style"
import { useMediaQuery,Paper,Typography } from '@material-ui/core'
import Rating from "@material-ui/lab/Rating"
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
const Map = ({setCoordinates,setBounnds,Coordinates,setChiledClicked,places,weatherData}) => {
    const classes = useStyles()
    const matches = useMediaQuery('(min-width:600px)')

  return (
    <div className={classes.mapContainer}>
        <GoogleMapReact
        bootstrapURLKeys={{key:process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultZoom={14}
        defaultCenter={Coordinates}
        center={Coordinates}
        margin={[50,50,50,50]}
        onChildClick={(child)=> setChiledClicked(child)}
        onChange={e=> {
          setCoordinates({lat:e.center.lat,lng:e.center.lng})
          setBounnds({ne:e.marginBounds.ne,sw:e.marginBounds.sw})
        }}
        >
          {places.length && places?.map((place,i)=> (
            <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
            >

              {!matches ? <LocationOnOutlinedIcon color='primary' fontSize='large' />  :
              (<Paper className={classes.paper} elevation={3} >
                <Typography variant='subtitle2' gutterBottom  >{place.name}</Typography>
                <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    alt={place.name}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
              </Paper>)
              }

            </div>
          ))}
          {weatherData?.list?.length && weatherData.list.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" alt='weather' />
          </div>
        ))}
        </GoogleMapReact>
    </div>
  )
}

export default Map