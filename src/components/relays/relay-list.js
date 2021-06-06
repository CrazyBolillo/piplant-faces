import {CircularProgress, Box} from "@material-ui/core";
import {useEffect, useState} from "react";
import {RelayClient} from "../../client/relay";
import RelayPanel from "./relay-panel";

export default function RelayList() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await RelayClient.list()
            setData(await fetchedData.json())
            setLoading(false)
        }

        fetchData()
    }, [])

    return (
        <Box display="flex" flexWrap="wrap" justifyContent="center">
            { // TODO RENDER EMPTY PANELS WHILE LOADING INSTEAD OF CIRCULAR PROGRESS
                loading ?
                    <CircularProgress/> :
                    data.map(relay => (
                        <RelayPanel relay={relay} key={relay.pin}/>
                    ))
            }
        </Box>
    )
}