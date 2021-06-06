import React from "react"
import {
    AppBar, Box,
    Container,
    createMuiTheme, Drawer,
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
import {BrowserRouter, Route, Link, Redirect} from "react-router-dom"
import Dashboard from "./pages/dashboard"
import Ambient from "./pages/ambient"
import Relays from "./pages/relays";

const piplantTheme = createMuiTheme({})
const useStyles = makeStyles((piplantTheme) => ({
    menuIcon: {
        color: 'white'
    },
    offset: {
        minHeight: "64px"
    },
    list: {
        width: 220
    },
    link: {
        textDecoration: 'none',
        color: piplantTheme.palette.text.secondary
    }
}))

const links = [
    {
        text: 'Dashboard',
        link: '/dashboard',
        icon: DashboardIcon
    },
    {
        text: 'Ambient',
        link: '/ambient',
        icon: CloudIcon
    },
    {
        text: 'Relays',
        link: '/relays',
        icon: PowerIcon
    }
]

function DrawerLink(props) {
    return (
        <Link to={props.data.link} className={props.className} onClick={props.onClick}>
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
        <BrowserRouter>
            <ThemeProvider theme={piplantTheme}>
                <Container>
                    <AppBar>
                        <Toolbar>
                            <IconButton onClick={() => setState(!state)}>
                                <MenuIcon className={classes.menuIcon}/>
                            </IconButton>
                            <Typography variant="h6">
                                Piplant
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
                        <List className={classes.list} component="nav">
                            {
                                links.map(entry => (
                                    <DrawerLink className={classes.link} data={entry} key={entry.link}
                                                onClick={() => {setState(false)}}/>
                                ))
                            }
                        </List>
                    </Box>
                </Drawer>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App
