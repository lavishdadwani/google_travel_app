import React, { useState } from 'react'
import useStyles from "./style"
import {Grid,CircularProgress,FormControl,Select,MenuItem,Typography,InputLabel, Card} from "@material-ui/core" 
import PlaceDetails from "../placeDetails/PlaceDetails"
const List = ({places}) => {
    const classes = useStyles()
    const [type, setType] = useState('restaurants')
    const [ratings, setRatings] = useState('')

  return (
    <div className={classes.container} >
      <Typography variant='h4'>Food & Dining around you</Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e)=> setType(e.target.value)}>
          <MenuItem value="restaurants" >restaurants</MenuItem>
          <MenuItem value="hotels" >Hotels</MenuItem>
          <MenuItem value="attractions" >Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={ratings} onChange={(e)=> setRatings(e.target.value)}>
          <MenuItem value="0" >All</MenuItem>
          <MenuItem value="3" >Above 3</MenuItem>
          <MenuItem value="4" >Above 4</MenuItem>
          <MenuItem value="4.5" >Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {places?.map((place,i)=>(
          <Grid xs={12} item key={i}>
            <PlaceDetails/>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default List