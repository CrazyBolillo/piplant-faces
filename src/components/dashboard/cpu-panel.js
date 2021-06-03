import DashboardPanel from "./dashboard-panel";
import {LinearProgress, Typography} from "@material-ui/core";
import React from "react";
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

export default function CpuPanel() {
    const classes = useStyles(

    )
    return (
        <DashboardPanel title="CPU">
            <Typography variant="subtitle2">Temperature</Typography>
            <Typography variant="subtitle2">...</Typography>
            <Typography className={classes.topMargin} variant="subtitle2">Load</Typography>
            <Typography className={classes.bottomMargin} variant="subtitle2">...</Typography>
            <LinearProgress className={classes.progress}/>
        </DashboardPanel>
    )
}