import {Button, Checkbox, CircularProgress, FormControlLabel, TextField, Typography} from "@material-ui/core";
import {useState} from "react";
import {makeStyles} from "@material-ui/styles";
import {green} from "@material-ui/core/colors";
import {RelayClient} from "../../client/relay";

const useStyles = makeStyles(theme => ({
    container: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(2),
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

export default function RelayDialog({createCallback}) {
    const classes = useStyles()
    const [data, setData] = useState({
        name: "",
        pin: "",
        active_low: false
    })
    const [loading, setLoading] = useState(false)

    const createRelay = async () => {
        try {
            setLoading(true)
            const response = await RelayClient.create({body: JSON.stringify(data)})
            if (response.ok) {
                createCallback()
            }
            else {

            }
        }
        catch(ex) {

        } finally {
            setLoading(false)
        }
    }

    return (
        <form autoComplete="off"  className={classes.container}>
            <Typography variant="subtitle1">Add a new relay</Typography>
            <TextField variant="filled" label="Name" value={data.name}
                       onChange={event => setData({...data, name: event.target.value})}/>
            <TextField variant="filled" label="Pin" value={data.pin}
                       onChange={event => setData({...data, pin: event.target.value})}/>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={data.active_low}
                        onChange={() => setData({...data, active_low: true})}
                        name="active_low"
                        color="primary"
                    />
                }
                label="Active low"
            />
            <div className={classes.wrapper}>
                <Button color="primary" variant="contained" onClick={() => {createRelay()}}>Add</Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        </form>
    )
}