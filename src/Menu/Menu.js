import React, { useEffect, useState,useContext } from "react";
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
import { useLocation } from "react-router";
import { Link } from "react-router-dom";



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

    background: "none",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "black",
    position : "absolute",
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    direction: "rtl"
  },
  drawerPaper: {
    width: drawerWidth,
    
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    

  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


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
  const [open, setOpen] = React.useState(false);
  
  
  useEffect(() => {
    getSections();
  }, [])

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
 

  return (

    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar id="hide">

          <a className="terminalH" href="/" alt="Feed">Terminal H</a>
          {/* <div>
            {state.gender}
            {console.log(window.location)}
            <a onClick={() => dispatch({ type: "WOMEN" })} href={`${useLocation().pathname}&gender=${state.gender}`} className="mutagim" >WOMEN</a>
            <a onClick={() => dispatch({ type: "MEN" })} href={`${useLocation().pathname}&gender=${state.gender}`} className="mutagim" >MEN</a>
            <a onClick={() => dispatch({ type: "KIDS" })} href={`${useLocation().pathname}&gender=${state.gender}`} className="mutagim" >KIDS</a>
          </div> */}
          <Toolbar>
            <div className="menu">
              <a key="brands" href="/brands" className="mutagim">מותגים</a>

              {sections.map((section, index) => (
                <div key={index}>
                  <div className="ajustSections">
                   
                    <a key={section.id} href={`/Shop/${section.id}`} className="sectionName" value={section.id}> {section.name}</a>
                    
                  </div>

                </div>
              ))}
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <div className={classes.root} id="sidebar">
        <CssBaseline />
        <AppBar id="1"
        width="100%"
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar id="MuiToolbar-regular">
            
            <IconButton id="3"
              display="absolute"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon id="4" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer id="5"
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div id="6" className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>

            {sections.map((text, index) => (
              <ListItem button key={index} >
                <a key={text.id} href={`/Shop/${text.id}`} className="text">{text.name}</a>

              </ListItem>
            ))}
            <a href="/brands" key="brand" className="mutag">מותגים</a>
          </List>
        </Drawer>
        <main id ="7"
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}>
        </main>
      </div>
      <Toolbar />
    </React.Fragment>

  );
}