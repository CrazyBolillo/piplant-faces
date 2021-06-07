import {Paper, Typography, Box, LinearProgress} from "@material-ui/core";
import {useStyles} from "./dashboard-panel";
import React, {useEffect, useState} from "react";
import {get} from "../../client/client";
import {unixToHumanTime} from "../../utils";
import {makeStyles} from "@material-ui/styles";

const styles = makeStyles(theme => ({
   image: {
       margin: theme.spacing(1),
       marginBottom: theme.spacing(1.5),
       maxWidth: "100%"
   }
}))

export default function CameraPanel() {
    const classStyles = styles()
    const classes = useStyles()
    const [time, setTime] = useState(0)
    const [image, setImage] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get('camera')
                setImage(URL.createObjectURL(await response.blob()))
                setTime(new Date().getTime()) // TODO FIX WRONG TIME BEING SHOWN
            } catch (ex) {

            }
        }

        fetchData()
        const interval = setInterval(() => {fetchData()}, 15000)

        return () => {clearInterval(interval)}
    }, [])

    return (
        <Paper className={classes.container}>
            <Box className={classes.root}>
                <Typography variant="subtitle1">Camera</Typography>
                <Box className={classes.children}>
                    <img className={classStyles.image} src={image}/>
                    {
                        time === 0 ?
                            <LinearProgress className={classes.progress}/> :
                            <Typography className={classes.timeHint} variant="body2">
                                {`Last updated: ${unixToHumanTime(time)}`}
                            </Typography>
                    }
                </Box>
            </Box>
        </Paper>
    )
}