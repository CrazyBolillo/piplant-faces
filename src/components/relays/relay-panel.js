import {Paper, Box, Typography, Switch, IconButton, MenuItem, Menu} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useState} from "react";
import {RelayClient} from "../../client/relay";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles(theme => ({
    outerContainer: {
        flexGrow: 1,
        margin: theme.spacing(1),
        maxWidth: "324px",
        minWidth: "162px",
    },
    container: {
        padding: theme.spacing(2),
        position: "relative"
    },
    settingsButton: {
        margin: theme.spacing(0.2),
        position: 'absolute',
        right: 0,
        top: 0
    }
}))


export default function RelayPanel({relay, showBackdrop, refreshList}) {
    const classes = useStyles()
    const [state, setState] = useState(relay.on)
    const [anchor, setAnchor] = useState(null)

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

    const deleteRelay = async () => {
        setAnchor(null)
        let response
        try {
            showBackdrop(true)
            response = await RelayClient.delete(relay.pin)
            if (response.ok)
                refreshList()
        } catch (ex) {

        } finally {
            showBackdrop(false)
        }
    }

    return (
        <Paper className={classes.outerContainer}>
            <Box className={classes.container}>
                <IconButton className={classes.settingsButton} onClick={event => {setAnchor(event.currentTarget)}}>
                    <MoreVertIcon/>
                </IconButton>
                <Menu anchorEl={anchor} open={Boolean(anchor)} keepMounted onClose={() => {setAnchor(null)}}>
                    <MenuItem onClick={() => {setAnchor(null)}}>Edit</MenuItem>
                    <MenuItem onClick={() => {deleteRelay()}}>Delete</MenuItem>
                </Menu>
                <Typography variant="h6">{relay.name}</Typography>
                <Typography variant="subtitle2">{`Pin ${relay.pin}`}</Typography>
                <Switch checked={state} onClick={() => toggleRelay()}/>
            </Box>
        </Paper>
    )
}