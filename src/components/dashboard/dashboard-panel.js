import {Box, LinearProgress, Paper, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles";
import React, {useEffect, useState} from "react";
import {unixToHumanTime} from "../../utils";
import {get} from "../../client/client";

const useStyles = makeStyles({
    container: {
        flexGrow: 1,
        margin: "5px",
        minHeight: "148px",
        minWidth: "300px",
        padding: "10px",
    },
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    children: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center"
    },
    progress: {
        marginTop: "auto",
        width: "100%"
    },
    timeHint: {
        color: "rgba(0, 0, 0, 0.5)",
        marginRight: "auto",
        marginTop: "auto"
    }
})

export default function DashboardPanel({title, entries, url}) {
    const classes = useStyles()
    const [data, setData] = useState({
        'time': 0
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const nData = await get(url)
                setData(await nData.json())
            } catch (ex) {

            }
        }

        fetchData()
        const interval = setInterval(() => {fetchData()}, 15000)

        return () => {clearInterval(interval)}
    }, [url])

    return (
        <Paper className={classes.container}>
            <Box className={classes.root}>
                <Typography variant="subtitle1">{title}</Typography>
                <Box className={classes.children}>
                    {
                        entries.map(entry => (
                            <React.Fragment>
                                <Typography variant="subtitle2" key={entry.name}>
                                    {entry.title || '...'}
                                </Typography>
                                <Typography variant="subtitle2" key={`--${entry.name}`}>
                                    {`${data[entry.name] || '...'} ${entry.unit}`}
                                </Typography>
                            </React.Fragment>
                        ))
                    }
                    {
                        data.time === 0 ?
                            <LinearProgress className={classes.progress}/> :
                            <Typography className={classes.timeHint} variant="body2">
                                {`Last updated: ${unixToHumanTime(data.time)}`}
                            </Typography>
                    }
                </Box>
            </Box>
        </Paper>
    )
}
