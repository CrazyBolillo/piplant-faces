import {Box, Dialog, Fab, makeStyles} from "@material-ui/core";
import RelayList from "../components/relays/relay-list";
import AddIcon from "@material-ui/icons/Add";
import React, {useState} from "react";
import RelayDialog from "../components/relays/relay-dialog";

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
    }
}))

export default function Relays () {
    const classes = useStyles()
    const [reload, setReload] = useState(0)
    const [open, setOpen] = useState(false)

    const createCallback = () => {
        console.log(reload)
        setOpen(false)
        setReload(reload + 1)
    }

    return (
        <React.Fragment>
            <Box className={classes.container}>
                <RelayList key={reload}/>
                <Fab className={classes.addButton} color="secondary" onClick={() => setOpen(true)}>
                    <AddIcon/>
                </Fab>
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <RelayDialog createCallback={createCallback}/>
            </Dialog>
        </React.Fragment>
    )
}