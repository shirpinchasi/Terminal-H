import React, { useEffect, useState } from "react";
import "./Menu.scss";
import Search from "../Search/Search"
import config from "../config/config";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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
      width:0,
      background: "none",
      right : 600,
      position : "fixed"
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
      color : "black",
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      direction : "rtl"
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
  

const Menu = () => {
    const [sections, setSections] = useState([])
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
   

    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };

    useEffect(() => {
        async function getSections() {
            try {
                const res = await fetch(config.apiSections, {
                    method: "GET"
                })
           
                const fetchedSections = await res.json();
                setSections(fetchedSections._embedded.sections);
                localStorage.setItem('sections', JSON.stringify(sections.map(section =>(
                    {section}
                ))), "name");
            } catch (err) {
                console.log(err);
            }
            
        }
        getSections();
    }, [])



    return (


        <div className="center">
            
            <div className="genderCategories">
                <a href={`/Shop?gender=WOMEN`}>נשים</a>
                <a href="/Shop?gender=MEN">גברים</a>
                <a href="/Shop?gender=KIDS">ילדים</a>
            </div>
            <a className="terminalH" href="/" alt="Feed">Terminal H</a>
            <div className={classes.root} id="sidebar">
      <CssBaseline />
      <AppBar 
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {sections.map(text => (
            <ListItem button key={text.name} >
              {/* <ListItemText primary={text.name}/> */}
              <a href={`/Shop/${text.id}`} className="text">{text.name}</a>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
      </main>
    </div>
            <div className="menu">
                <a href="/brands" className="mutagim">מותגים</a>
                {sections.map(section => (
                    <div >
                        <div className="ajustSections">
                            <a href={`/Shop/${section.id}`} className="sectionName" > {section.name}</a>
                        </div>

                    </div>
                ))}


            </div>
            <Search/>
            <hr/>
                    
        </div>
    )


}
export default Menu;