import AmbientPanel from "../components/dashboard/ambient-panel"
import DiskPanel from "../components/dashboard/disk-panel"
import {Box} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles";
import CpuPanel from "../components/dashboard/cpu-panel";
import CameraPanel from "../components/dashboard/camera-panel";

const useStyles = makeStyles({
    container: {
        "& div": {

        }
    }
})

export default function Dashboard() {
    const classes = useStyles()

    return (
        <Box className={classes.container} display="flex" flexDirection="row" flexWrap="wrap">
            <AmbientPanel/>
            <CpuPanel/>
            <DiskPanel/>
            <CameraPanel/>
        </Box>
    )
}