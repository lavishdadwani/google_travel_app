import React from 'react'
import GoogleMapReact from "google-map-react"
import useStyles from "./style"
import { useMediaQuery,Paper,Ty } from '@material-ui/core'

const Map = () => {
    const classes = useStyles()
    const matches = useMediaQuery('(min-width:600px)')
    const coordinates = {lat:0,lng:0}
  return (
    <div className={classes.mapContainer}>
        <GoogleMapReact
        bootstrapURLKeys={{key:'AIzaSyB6JdIDngKxCVfNf4yHx0OurQotAiYsHho'}}
        defaultZoom={14}
        defaultCenter={coordinates}
        center={coordinates}
        margin={[50,50,50,50]}
        onChildClick={''}
        onChange={''}
        >

        </GoogleMapReact>
    </div>
  )
}

export default Map