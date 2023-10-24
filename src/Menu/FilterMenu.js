import React, { useEffect, useState } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Toolbar } from "@material-ui/core";
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import 'react-dropdown/style.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import purple from '@material-ui/core/colors/purple';
import { InputLabel } from "@mui/material";
// import Multiselect from 'multiselect-react-dropdown';
import { Select } from "@mui/material";
import "./FilterMenu.scss";
import config from "../config/config";

function FilterMenu(props) {
    const [state, setState] = React.useState({
        right: false,
    });
    const classes = useStyles();



    const toggleDrawer = (anchor, openDrawer) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: openDrawer });
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };



    return (

        <Toolbar>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>

                    <IconButton
                        color="black"
                        aria-label="open drawer"
                        edge="end"
                        onClick={toggleDrawer(anchor, true)}
                    >
                        <div id="filterOptions">
                            <FilterListIcon fontSize="small" />
                            <p>פילטרים</p>
                        </div>
                    </IconButton>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}

                    >
                        <Box
                            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 240 }}
                            role="presentation"


                        >
                            <ChevronLeftIcon onClick={toggleDrawer(anchor, false)} id="ChevronLeft" />
                            <List direction="rtl">
                                <div className={classes.root}>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<KeyboardArrowDownIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"

                                        >
                                            <Typography className={classes.heading}>מותגים</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>


                                                <div>
                                                    <div>
                                                        <FormControl sx={{ m: 1, width: 300 }}>
                                                        <Select
                                                        labelId="demo-multiple-checkbox-label"
                                                        id="demo-multiple-checkbox"
                                                        multiple
                                                        value={props.brandid}
                                                        onChange={props.handleChangeMultiple}
                                                        input={<OutlinedInput label="מותגים" />}
                                                        renderValue={(selected) => selected.join(',')}
                                                        MenuProps={MenuProps}
                                                    >

                                                        {props.brands.map((brand) => (
                                                            <MenuItem key={brand.name} value={brand.id}>
                                                                <Checkbox checked={props.brandid.indexOf(brand.name) > -1} />
                                                                <ListItemText primary={brand.name} />

                                                            </MenuItem>
                                                        ))}
                                                    </Select>

                                                        
                                                       </FormControl>
                                                    </div>
                                                   
                                                    
                                                </div>

                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<KeyboardArrowDownIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"

                                        >
                                            <Typography className={classes.heading}>כמות מוצרים בדף</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                <FormControl component="fieldset" style={{ width: 200 }} id="radioSortBy">
                                                    <RadioGroup
                                                        aria-label="itemsPerPage"
                                                        name="controlled-radio-buttons-group"
                                                        value={props.sortCount}
                                                        defaultValue="30"
                                                        onChange={props.handleSetCount}

                                                    >
                                                        <FormControlLabel style={{ fontSize: 30 }} value="30" control={<Radio />} label="30" />
                                                        <FormControlLabel value="60" control={<Radio />} label="60" />
                                                        <FormControlLabel value="90" control={<Radio />} label="90" />
                                                        <FormControlLabel value="120" control={<Radio />} label="120" />
                                                    </RadioGroup>
                                                </FormControl>

                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<KeyboardArrowDownIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"

                                        >
                                            <Typography className={classes.heading}>מגדר</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                <FormControl component="fieldset" style={{ width: 200 }} id="radioSortBy">
                                                    <RadioGroup
                                                        aria-label="gender"
                                                        name="controlled-radio-buttons-group"
                                                        value={props.gender}
                                                        defaultValue="30"
                                                        onChange={props.handleSetGender}

                                                    >
                                                        <FormControlLabel style={{ fontSize: 30 }} value="" control={<Radio />} label="הכל" />
                                                        <FormControlLabel value="WOMEN" control={<Radio />} label="נשים" />
                                                        <FormControlLabel value="MEN" control={<Radio />} label="גברים" />
                                                        <FormControlLabel value="KIDS" control={<Radio />} label="ילדים" />
                                                    </RadioGroup>
                                                </FormControl>

                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    {/* <Accordion id="accordion">
                                        <AccordionSummary
                                            expandIcon={<FontAwesomeIcon icon={faFilter} />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            
                                            
                                            
                                          

                                         
                                            <Typography>
                                                <FormControl id="acordionFour">
                                                    <InputLabel id="select">מותג</InputLabel>
                                                    <Select

                                                        labelId="select"
                                                        id="selectOption1"
                                                        value={brandid}
                                                        onChange={handleBrandIdChange}
                                                        setLoading={false}
                                                    >
                                                        {brands.map((brand, index) =>
                                                            <MenuItem key={index} value={brand.id} className="abc" >{brand.name}</MenuItem>
                                                        )}
                                                    </Select>
                                                </FormControl>
                                            </Typography>
                                            {/* <button onClick={onFilterClick} setLoading={false}>Filter</button>  */}
                                    {/* </AccordionDetails>
                                    </Accordion> */}

                                </div>
                            </List>
                        </Box>
                    </Drawer>
                </React.Fragment>
            ))}
        </Toolbar>
    )
}


export default FilterMenu;



const useStyles = makeStyles((theme) => ({
    root: {

    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,

    },
    error: {
        color: theme.palette.error.dark,
        fontSize: '1em'
    },
    checkBox: {
        color: purple['700']
    }
}));
