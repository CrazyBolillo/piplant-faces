import {LinearProgress, Typography} from "@material-ui/core"
import DashboardPanel from "./dashboard-panel"
import {makeStyles} from "@material-ui/styles"
import {AmbientClient} from '../../client/ambient'
import React from 'react'
import {useEffect, useState} from "react";
import {unixToHumanTime} from "../../utils";

const useStyles = makeStyles({
    progress: {
        marginTop: "auto",
        width: "100%"
    },
    temperature: {
        marginTop: "10px"
    },
    timeHint: {
        color: "rgba(0, 0, 0, 0.5)",
        marginRight: "auto",
        marginTop: "auto"
    }
})

export default function AmbientPanel() {
    const classes = useStyles()
    const [data, setData] = useState({
        'time': 0,
        'temperature': '...',
        'humidity': '...',
    });

    useEffect(() => {
        const fetchData = async () => {
            const nData = await AmbientClient.read()
            setData(await nData.json())
        }

        fetchData()
    }, [data.time])

    return (
        <DashboardPanel title="Ambient">
            <Typography variant="subtitle2">Relative humidity</Typography>
            <Typography variant="subtitle2">{`${data.humidity} %`}</Typography>
            <Typography className={classes.temperature} variant="subtitle2">Temperature</Typography>
            <Typography variant="subtitle2">{`${data.temperature} °C`}</Typography>
            {
                data.time === 0 ?
                    <LinearProgress className={classes.progress}/> :
                    <Typography className={classes.timeHint} variant="body2">
                        {`Last updated: ${unixToHumanTime(data.time)}`}
                    </Typography>
            }
        </DashboardPanel>
    )
}
