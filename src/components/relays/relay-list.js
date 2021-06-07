import {CircularProgress, Box, Backdrop} from "@material-ui/core";
import {useEffect, useReducer, useState} from "react";
import {RelayClient} from "../../client/relay";
import RelayPanel from "./relay-panel";
import React from "react"
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#FFF"
    }
}))

export default function RelayList() {
    const classes = useStyles()
    const [update, setUpdate] = useState(0)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const fetchData = async () => {
        const fetchedData = await RelayClient.list()
        setData(await fetchedData.json())
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <React.Fragment>
            <Box display="flex" flexWrap="wrap" justifyContent="center" key={update}>
                { // TODO RENDER EMPTY PANELS WHILE LOADING INSTEAD OF CIRCULAR PROGRESS
                    data.map(relay =>
                        (
                            <RelayPanel relay={relay} key={relay.pin} showBackdrop={setLoading}
                                        refreshList={fetchData}/>
                        )
                    )
                }
            </Box>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </React.Fragment>
    )
}