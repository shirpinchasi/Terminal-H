import React, { useEffect, useState, useContext } from "react";
import "./Menu.scss";
import config from "../config/config";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Search from "../Search/Search";
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { useCart } from "react-use-cart";









function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,

  window: PropTypes.func,
};





export default function HideAppBar(props) {
  const [sections, setSections] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const [clickWomen, setClickWomen] = useState("WOMEN")
  const [clickKids, setClickKids] = useState("KIDS")
  const [clickMen, setClickMen] = useState("MEN")
  const [clickAll, setClickAll] = useState("")
  const [open, setOpen] = React.useState(false);
  const [openNestedList, setOpenNestedList] = React.useState(true);
  const [value, setValue] = React.useState(0);
  const {
    totalItems,
    totalUniqueItems
  } = useCart();
  const [state, setState] = React.useState({
    right: false,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const toggleDrawer = (anchor, openDrawer) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: openDrawer });
  };







  useEffect(() => {
    getSections();
  }, [clickWomen, clickMen, clickKids])

  async function getSections() {

    const res = await (await fetch(config.apiSections, {
      method: "GET"
    })).json()

    setSections(res._embedded.sections);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };


  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleOpenNestedList = () => {
    setOpenNestedList(!open);
  };

  return (

    <React.Fragment >
      <CssBaseline />
      <HideOnScroll {...props} >
        <AppBar id="hide" color="white">

          <Toolbar id="navbar">
            <Badge id="badge" badgeContent={totalUniqueItems ? totalUniqueItems : "0"} color="primary">
              <a href="/Favorites" alt="Favorites">
                <StarBorderOutlinedIcon fontSize="large" color="action" />
              </a>
            </Badge>
            <a className="terminalH" href="/" alt="Feed" >Terminal H </a>
            <Search />
          </Toolbar>

          <Toolbar >
            <div className="menu">
              <a key="brands" href="/brands" className="mutagim">מותגים</a>

              {sections.map((section, index) => (
                <div key={index}>
                  <div className="ajustSections">
                    <a key={section.id} href={`/Shop/${section.id}`} className="sectionName" value={section.id}> {section.name}</a>
                  </div>
                </div>
              ))}
              <div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <div className={classes.root} id="sidebar">
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar id="menuPhone" color="default">
            <Toolbar>
              <Badge id="badge" badgeContent={totalUniqueItems ? totalUniqueItems : "0"} color="primary">
                <a href="/Favorites" alt="Favorites">
                  <StarBorderOutlinedIcon fontSize="large" color="action" />
                </a>
              </Badge>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <a id="terminalH" href="/" alt="Feed" >Terminal H </a>
              </Typography>
              {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                  {/* <Button onClick={toggleDrawer(anchor, true)}></Button> */}
                  <IconButton
                    color="black"
                    aria-label="open drawer"
                    edge="end"
                    onClick={toggleDrawer(anchor, true)}
                  >

                    <MenuIcon id="4" />
                  </IconButton>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    // onClose={toggleDrawer(anchor, false)}
                  >
                    <Box
                      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
                      role="presentation"
                      // onClick={toggleDrawer(anchor, false)}
                      
                    >
                      <ChevronLeftIcon onClick={toggleDrawer(anchor, false)} id="ChevronLeft"/>
                      <List direction="rtl">
                        {sections.map((section, index) => (
                          <div key={index}>
                            <div className="ajustSections">
                              <a key={section.id} href={`/Shop/${section.id}`} className="sectionName" value={section.id}> {section.name}</a>
                            </div>
                          </div>
                        ))}
                        <a key="brands" href="/brands" className="mutagim">מותגים</a>
                      </List>
                    </Box>
                  </Drawer>
                </React.Fragment>
              ))}
            </Toolbar>
          </AppBar>
        </Box>
        <div>
        </div>
      </div>
      <Toolbar />
    </React.Fragment>

  );
}


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    display: 'none',
  },

  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',


  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    direction: "rtl",
    justifyContent: "flex-end",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    direction: "ltr",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,

  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));
