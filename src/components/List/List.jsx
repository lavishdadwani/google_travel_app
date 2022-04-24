import React, { useState ,useEffect, createRef} from 'react'
import useStyles from "./style"
import {Grid,CircularProgress,FormControl,Select,MenuItem,Typography,InputLabel} from "@material-ui/core" 
import PlaceDetails from "../placeDetails/PlaceDetails"
const List = ({places,setType,type,setRating,rating,ChiledClicked,isLoading}) => {
  const [elRefs, setElRefs] = useState([]);
    const classes = useStyles()

    useEffect(() => {
      setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);


  return (
    <div className={classes.container} >
      <Typography variant='h4'>Food & Dining around you</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
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
        <Select value={rating} onChange={(e)=> setRating(e.target.value)}>
          <MenuItem value="0" >All</MenuItem>
          <MenuItem value="3" >Above 3</MenuItem>
          <MenuItem value="4" >Above 4</MenuItem>
          <MenuItem value="4.5" >Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {places?.map((place,i)=>(
          <Grid xs={12} ref={elRefs[i]} key={i} item  >
            <PlaceDetails selected={Number(ChiledClicked) === i} refProp={elRefs[i]} place={place} />
          </Grid>
        ))}
      </Grid>
      </>
      )}
    </div>
  )
}

export default List