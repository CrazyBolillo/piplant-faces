import {Backdrop, Box, CircularProgress, Dialog, Fab, makeStyles} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, {useEffect, useState} from "react";
import RelayDialog from "../components/relays/relay-dialog";
import RelayPanel from "../components/relays/relay-panel";
import {RelayClient} from "../client/relay";

const useStyles = makeStyles(theme => ({
    container: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    addButton: {
        bottom: 0,
        margin: theme.spacing(2),
        position: 'absolute',
        right: 0
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#FFF"
    }
}))

export default function Relays () {
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])

    const getRelays = async () => {
        const fetchedData = await RelayClient.list()
        setData(await fetchedData.json())
        setLoading(false)
    }

    const createCallback = () => {
        setOpen(false)
        setLoading(true)
        getRelays()
    }

    useEffect(() => {
        setLoading(true)
        getRelays()
    }, [])


    return (
        <React.Fragment>
            <Box className={classes.container}>
                <Box display="flex" flexWrap="wrap" justifyContent="center">
                    { // TODO RENDER EMPTY PANELS WHILE LOADING INSTEAD OF CIRCULAR PROGRESS
                        data.map(relay =>
                            (
                                <RelayPanel relay={relay} key={relay.pin} showBackdrop={setLoading}
                                            refreshList={getRelays}/>
                            )
                        )
                    }
                </Box>
                <Fab className={classes.addButton} color="secondary" onClick={() => setOpen(true)}>
                    <AddIcon/>
                </Fab>
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <RelayDialog createCallback={createCallback}/>
            </Dialog>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </React.Fragment>
    )
}