import React from 'react'
import {Autocomplete} from "@react-google-maps/api"
import {AppBar,Typography,Toolbar,Box,InputBase} from "@material-ui/core"
import {Search} from "@material-ui/icons"
import makeStyles from "./style"
const Header = () => {
    const classes = makeStyles()
  return (
    <div>
        <AppBar position='static'>
            <Toolbar className={classes.toolbar}>
                <Typography variant='h5' className={classes.title}>
                Travel Advisor
                </Typography>
                <Box display={'flex'}>
                <Typography variant='h6' className={classes.title}>
                Explore new places
                </Typography>
                {/* <Autocomplete> */}
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Search/>
                        </div>
                        <InputBase placeholder='Search... ' classes={{ root: classes.inputRoot, input: classes.inputInput }} />
                    </div>
                {/* </Autocomplete> */}
                </Box>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Header