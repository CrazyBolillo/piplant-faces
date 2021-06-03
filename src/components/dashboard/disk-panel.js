import React from 'react'
import {LinearProgress, Typography} from "@material-ui/core"
import DashboardPanel from "./dashboard-panel";
import {makeStyles} from "@material-ui/styles";


const useStyles = makeStyles({
    progress: {
        marginTop: "auto",
        width: "100%"
    },
    topMargin: {
        marginTop: "10px"
    },
    bottomMargin: {
        marginBottom: "15px"
    }
})


export default function DiskPanel() {
    const classes = useStyles()

    return (
        <DashboardPanel title="Disk">
            <Typography variant="subtitle2">Disk size</Typography>
            <Typography variant="subtitle2">...</Typography>
            <Typography className={classes.topMargin} variant="subtitle2">Used</Typography>
            <Typography variant="subtitle2">...</Typography>
            <Typography className={classes.topMargin} variant="subtitle2">Free</Typography>
            <Typography className={classes.bottomMargin} variant="subtitle2">...</Typography>
            <LinearProgress className={classes.progress}/>
        </DashboardPanel>
    )
}
