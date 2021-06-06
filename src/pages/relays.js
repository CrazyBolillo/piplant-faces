import {Box, makeStyles} from "@material-ui/core";
import RelayList from "../components/relays/relay-list";

const useStyles = makeStyles({
    container: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
})

export default function Relays () {
    const classes = useStyles()

    return (
        <Box className={classes.container}>
            <RelayList/>
        </Box>
    )
}