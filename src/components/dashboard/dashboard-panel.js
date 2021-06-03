import {Box, Paper, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    container: {
        flexGrow: 1,
        margin: "5px",
        minHeight: "148px",
        minWidth: "300px",
        padding: "10px",
    },
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    children: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center"
    }
})

export default function DashboardPanel({title, children}) {
    const classes = useStyles()

    return (
        <Paper className={classes.container}>
            <Box className={classes.root}>
                <Typography variant="subtitle1">{title}</Typography>
                <Box className={classes.children}>
                    {children}
                </Box>
            </Box>
        </Paper>
    )
}
