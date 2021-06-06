import {Paper, Box, Typography, Switch} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useState} from "react";
import {RelayClient} from "../../client/relay";

const useStyles = makeStyles(theme => ({
    outerContainer: {
        flexGrow: 1,
        margin: theme.spacing(1),
        maxWidth: "324px",
        minWidth: "162px",
    },
    container: {
        padding: theme.spacing(2)
    }
}))


export default function RelayPanel({relay}) {
    const classes = useStyles()
    const [state, setState] = useState(relay.on)

    const toggleRelay = async () => {
        let response
        try {
            if (state)
                response = await RelayClient.turnOff(relay.pin)
            else
                response = await RelayClient.turnOn(relay.pin)
        } catch (ex) {
            // TODO HANDLE ERROR WITH SNACKBAR
        }
        if (response.ok)
            setState(!state)
    }

    return (
        <Paper className={classes.outerContainer}>
            <Box className={classes.container}>
                <Typography variant="h6">{relay.name}</Typography>
                <Typography variant="subtitle2">{`Pin ${relay.pin}`}</Typography>
                <Switch checked={state} onClick={() => toggleRelay()}/>
            </Box>
        </Paper>
    )
}