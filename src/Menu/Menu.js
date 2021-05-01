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
import clsx from 'clsx';
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';


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
      color : "black",
      marginRight:300
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
      async function getSections() {
          try {
              const res = await fetch(config.apiSections, {
                  method: "GET"
              })
              const fetchedSections = await res.json();
              setSections(fetchedSections._embedded.sections);
          } catch (err) {
              console.log(err);
          }
          
      }
      getSections();
  }, [])
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
            <Toolbar>
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
            </Toolbar>
            <Search/>
          </AppBar>
        </HideOnScroll>
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
          <a href="/brands" className="mutag">מותגים</a>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
      </main>
    </div>
        <Toolbar />
      </React.Fragment>
    );
  }

// const Menu = () => {
//     const [sections, setSections] = useState([])
    // const classes = useStyles();
    // const theme = useTheme();
//     const [open, setOpen] = React.useState(false);
//     const [gender, setGender] = useState([])
   

    // const handleDrawerOpen = () => {
    //     setOpen(true);
    //   };
    
    //   const handleDrawerClose = () => {
    //     setOpen(false);
    //   };

    // useEffect(() => {
    //     async function getSections() {
    //         try {
    //             const res = await fetch(config.apiSections, {
    //                 method: "GET"
    //             })
    //             const fetchedSections = await res.json();
    //             setSections(fetchedSections._embedded.sections);
    //             localStorage.setItem('sections', JSON.stringify(sections.map(section =>(
    //                 {section}
    //             ))), "name");
    //         } catch (err) {
    //             console.log(err);
    //         }
            
    //     }
    //     getSections();
    // }, [])

//     // useEffect(()=>{
//     //   async function getGender() {
//     //     try{
//     //       const res = await fetch(config.apiShop + `&gender=${gender}`,{
//     //         method:"GET"
//     //       });
//     //       const fetchGender = await res.json();
//     //       setGender(fetchGender._embedded.products);
//     //     }catch(err){
//     //       console.log(err);
//     //     }
//     //   }
//     //   getGender();
//     // },[])

//     return (


//         <div className="center">
            
//             <div className="genderCategories">
//                 <a href={`/Shop?gender=WOMEN`}>נשים</a>
                
//                 <a href={`/Shop?gender=`}>גברים</a>
//                 <a href="/Shop?gender=KIDS">ילדים</a>
//             </div>
            // <a className="terminalH" href="/" alt="Feed">Terminal H</a>
    //         <div className={classes.root} id="sidebar">
    //   <CssBaseline />
    //   <AppBar 
    //     position="fixed"
    //     className={clsx(classes.appBar, {
    //       [classes.appBarShift]: open,
    //     })}
    //   >
    //     <Toolbar>
    //       <IconButton
    //         color="inherit"
    //         aria-label="open drawer"
    //         onClick={handleDrawerOpen}
    //         edge="start"
    //         className={clsx(classes.menuButton, open && classes.hide)}
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //     </Toolbar>
    //   </AppBar>
    //   <Drawer
    //     className={classes.drawer}
    //     variant="persistent"
    //     anchor="left"
    //     open={open}
    //     classes={{
    //       paper: classes.drawerPaper,
    //     }}
    //   >
    //     <div className={classes.drawerHeader}>
    //       <IconButton onClick={handleDrawerClose}>
    //         {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    //       </IconButton>
    //     </div>
    //     <Divider />
    //     <List>
    //       {sections.map(text => (
    //         <ListItem button key={text.name} >
    //           {/* <ListItemText primary={text.name}/> */}
    //           <a href={`/Shop/${text.id}`} className="text">{text.name}</a>
              
    //         </ListItem>
    //       ))}
    //       <a href="/brands" className="mutag">מותגים</a>
    //     </List>
    //   </Drawer>
    //   <main
    //     className={clsx(classes.content, {
    //       [classes.contentShift]: open,
    //     })}>
    //   </main>
    // </div>
            // <div className="menu">
            //     <a href="/brands" className="mutagim">מותגים</a>
            //     {sections.map(section => (
            //         <div >
            //             <div className="ajustSections">
            //                 <a href={`/Shop/${section.id}`} className="sectionName" > {section.name}</a>
            //             </div>

            //         </div>
            //     ))}


            // </div>
            // <Search/>
//             <hr/>
                    
//         </div>
//     )


// }
// export default Menu;