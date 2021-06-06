import React from "react"
import {
    AppBar, Box,
    Container,
    createMuiTheme, Divider, Drawer,
    IconButton, List, ListItem, ListItemIcon, ListItemText,
    makeStyles,
    ThemeProvider,
    Toolbar,
    Typography
} from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu'
import DashboardIcon from '@material-ui/icons/Dashboard'
import CloudIcon from '@material-ui/icons/Cloud'
import PowerIcon from '@material-ui/icons/Power'
import {Route, Link, useLocation} from "react-router-dom"
import Dashboard from "./pages/dashboard"
import Ambient from "./pages/ambient"
import Relays from "./pages/relays";

const piplantTheme = createMuiTheme({})
const useStyles = makeStyles(piplantTheme => ({
    menuIcon: {
        color: 'white'
    },
    offset: {
        minHeight: "64px"
    },
    logoContainer: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: piplantTheme.spacing(2)
    },
    list: {
        width: 220
    },
    link: {
        textDecoration: 'none',
        color: piplantTheme.palette.text.secondary
    }
}))

const links = {
    '/dashboard': {
        text: 'Dashboard',
        icon: DashboardIcon
    },
    '/ambient': {
        text: 'Ambient',
        icon: CloudIcon
    },
    '/relays': {
        text: 'Relays',
        icon: PowerIcon
    }
}

function DrawerLink(props) {
    return (
        <Link to={props.to} className={props.className} onClick={props.onClick}>
            <ListItem button>
                <ListItemIcon>
                    <props.data.icon/>
                </ListItemIcon>
                <ListItemText primary={props.data.text}/>
            </ListItem>
        </Link>
    )
}

function App() {
    const classes = useStyles()
    const [state, setState] = React.useState(false)

    return (
        <ThemeProvider theme={piplantTheme}>
            <Container>
                <AppBar>
                    <Toolbar>
                        <IconButton onClick={() => setState(!state)}>
                            <MenuIcon className={classes.menuIcon}/>
                        </IconButton>
                        <Typography variant="h6">
                            {links[useLocation().pathname].text}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box className={classes.offset}/>
                <Route path="/dashboard">
                    <Dashboard/>
                </Route>
                <Route path="/ambient">
                    <Ambient/>
                </Route>
                <Route path="/relays">
                    <Relays/>
                </Route>
            </Container>
            <Drawer open={state} onClose={() => setState(false)}>
                <Box>
                    <Box className={classes.logoContainer}>
                        <Typography variant="h5">Piplant</Typography>
                        <Typography variant="h6">🌱</Typography>
                    </Box>
                    <Divider/>
                    <List className={classes.list} component="nav">
                        {
                            Object.keys(links).map(key => (
                                <DrawerLink className={classes.link} data={links[key]} key={key} to={key}
                                            onClick={() => {setState(false)}}/>
                            ))
                        }
                    </List>
                </Box>
            </Drawer>
        </ThemeProvider>
    );
}

export default App
