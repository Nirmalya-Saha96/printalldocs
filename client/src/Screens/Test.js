/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React,{useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SpeedIcon from '@material-ui/icons/Speed';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import Countdown from 'react-countdown';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LinkIcon from '@material-ui/icons/Link';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {useParams,useLocation,useHistory} from "react-router-dom"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import Homescreen from '../Components/Homescreen/Homescreen';
import Aadhar from "../Components/Aadhar/Aadhar"
import AadharPrint from "../Components/Aadhar/AadharPrint"
import Voter from "../Components/Voter/Voter"
import VoterPrint from "../Components/Voter/VoterPrint"
import Pan from "../Components/Pan/Pan"
import PanPrint from "../Components/Pan/PanPrint"
import Link from "../Components/Link/Link"

import HomescreenAdmin from '../Components/Admin/HomescreenAdmin';
import Registered from '../Components/Admin/Registered';
import Transfer from '../Components/Admin/Transfer';
import AadharAdmin from '../Components/Admin/AadharAdmin';
import VoterAdmin from '../Components/Admin/VoterAdmin';
import PanAdmin from '../Components/Admin/PanAdmin';
import LinkAdmin from '../Components/Admin/LinkAdmin';
import Add from '../Components/Admin/Add';

var axios = require('axios');


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Test() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [modalOpen,setModalOpen]=useState(false)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  
  const history = useHistory ();
 
  const location = useLocation()
  const [screen,setScreen]=useState(location.state.admin?5:0)
  const [token,setToken]=useState(location.state.token)
  const [admin,setAdmin]=useState(location.state.admin)
  const [point,setPoint]=useState(10)


  const getPointData = async () =>{
    var config = {
      method: 'get',
      url: 'api/home',
      headers: { 
        'x-auth-token': token
      }
    };
    await axios(config)
    .then(function (response) {
     // console.log(JSON.stringify(response.data));
      if(response.data)
      {
        setPoint(response.data.points)
      }
      else
      {
        setPoint(0)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  const [seconds, setSeconds] = React.useState(localStorage.getItem('modalTime')||180);
  const [logoutSec,setLogoutSec]=useState(localStorage.getItem("time")||1800)

  const CountDown = () =>{
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
      localStorage.setItem('modalTime',seconds)
      console.log(seconds)
    } else {
      setModalOpen(true)
    }
  }
  const LogoutCountDown = () =>{
    if (logoutSec > 0) {
      setTimeout(() => setLogoutSec(logoutSec - 1), 1000);
      localStorage.setItem("time",logoutSec)
     // console.log(logoutSec)
    } else {
      history.push({pathname:'/'})
    }
  }

  useEffect(() => {
    if(!admin)
    {
      if(point===0)
      {
        CountDown()
      }
       LogoutCountDown()
    }
  });

  useEffect(()=>{

    if(!admin)
    {
      getPointData()
    }

  },[])

  return (
    <div className={classes.root}>
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
          {!admin&&<Typography  style={{textAlign:"right",width:"100%"}}>
             {/* <button onClick={()=>{setModalOpen(true)}}>open</button>  */}
            You will be logged out in : {Math.trunc(logoutSec/60)}:{(logoutSec%60) > 9 ? (logoutSec%60) : `0${logoutSec%60}`}
            {/* <Countdown date={Date.now() + 1800000} onComplete={()=>{history.push({pathname:'/'})}}/> */}
          </Typography>}
           {admin&&<Typography variant="h6">ADMIN</Typography>} 
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
          {!admin&&<><ListItem button onClick={()=>{setScreen(0)}}>
            <ListItemIcon>
              <SpeedIcon />
            </ListItemIcon>
            <ListItemText primary={"Homepage"} />
          </ListItem>
          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)}  onClose={handleClose} style={{marginLeft:open?"120px":"60px"}}>
            <MenuItem onClick={()=>{handleClose();setScreen(11);}}>Aadhar Card Update</MenuItem>
            <MenuItem onClick={()=>{handleClose();setScreen(21);}}>Aadhar Card Print</MenuItem>
          </Menu>
          <ListItem button onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
            <ListItemIcon>
              <RecentActorsIcon />
            </ListItemIcon>
            <ListItemText primary={"Aadhar Card"} />
          </ListItem>
          <Menu id="simple-menu-2" anchorEl={anchorEl2} keepMounted open={Boolean(anchorEl2)}  onClose={handleClose2} style={{marginLeft:open?"130px":"60px"}}>
            <MenuItem onClick={()=>{handleClose2();setScreen(12);}}>Voter Card Update</MenuItem>
            <MenuItem onClick={()=>{handleClose2();setScreen(22);}}>Voter Card Print</MenuItem>
          </Menu>
          <ListItem button  onClick={handleClick2} aria-controls="simple-menu-2" aria-haspopup="true"> 
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText primary={"Voter Card"} />
          </ListItem>
          <Menu id="simple-menu-3" anchorEl={anchorEl3} keepMounted open={Boolean(anchorEl3)}  onClose={handleClose3} style={{marginLeft:open?"130px":"60px"}}>
            <MenuItem onClick={()=>{handleClose3();setScreen(13);}}>Pan Card Update</MenuItem>
            <MenuItem onClick={()=>{handleClose3();setScreen(23);}}>Pan Card Print</MenuItem>
          </Menu>
          <ListItem button onClick={handleClick3} aria-controls="simple-menu-3" aria-haspopup="true">
            <ListItemIcon>
              <RecentActorsIcon />
            </ListItemIcon>
            <ListItemText primary={"Pan Card"} />
          </ListItem>
          <ListItem button onClick={()=>{setScreen(4)}}>
            <ListItemIcon>
              <LinkIcon/>
            </ListItemIcon>
            <ListItemText primary={"Link"} />
          </ListItem>
          <ListItem button onClick={()=>{ history.push({pathname:'/'})}}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"LogOut"} />
          </ListItem></>}
          {admin&&<>
          <ListItem button onClick={()=>{setScreen(5)}}>
            <ListItemIcon>
              <SpeedIcon />
            </ListItemIcon>
            <ListItemText primary={"Homepage"} />
          </ListItem>
          <ListItem button onClick={()=>{setScreen(111)}}>
            <ListItemIcon>
            <PersonAddIcon/>
            </ListItemIcon>
            <ListItemText primary={"Add"} />
          </ListItem>
          <ListItem button onClick={()=>{setScreen(6)}}>
            <ListItemIcon>
            <RecentActorsIcon />
            </ListItemIcon>
            <ListItemText primary={"Registered Users"} />
          </ListItem>
          <ListItem button onClick={()=>{setScreen(7)}}>
            <ListItemIcon>
            <TransferWithinAStationIcon />
            </ListItemIcon>
            <ListItemText primary={"Transfer"} />
          </ListItem>
          <ListItem button onClick={()=>{setScreen(8)}}>
            <ListItemIcon>
           <AccountBoxIcon/>
            </ListItemIcon>
            <ListItemText primary={"Aadhar"} />
          </ListItem>
          <ListItem button onClick={()=>{setScreen(9)}}>
            <ListItemIcon>
            <RecentActorsIcon />
            </ListItemIcon>
            <ListItemText primary={"Voter"} />
          </ListItem>
          <ListItem button onClick={()=>{setScreen(10)}}>
            <ListItemIcon>
            <PermContactCalendarIcon/>
            </ListItemIcon>
            <ListItemText primary={"Pan"} />
          </ListItem>
          <ListItem button onClick={()=>{setScreen(222)}}>
            <ListItemIcon>
             <LinkIcon/>
            </ListItemIcon>
            <ListItemText primary={"Linked"} />
          </ListItem>
          <ListItem button onClick={()=>{ history.push({pathname:'/admin'})}}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"LogOut"} />
          </ListItem>
          </>}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {screen===0&&<Homescreen token={token}/>}
         {screen===11&&<Aadhar token={token}/>}
         {screen===21&&<AadharPrint token={token}/>}
         {screen===12&&<Voter token={token}/>}
         {screen===22&&<VoterPrint token={token}/>}
         {screen===13&&<Pan token={token}/>}
         {screen===23&&<PanPrint token={token}/>}
         {screen===4&&<Link token={token}/>}
         {screen===5&&<HomescreenAdmin token={token}/>}
         {screen===6&&<Registered token={token}/>}
         {screen===7&&<Transfer token={token}/>}
         {screen===8&&<AadharAdmin token={token}/>}
         {screen===9&&<VoterAdmin token={token}/>}
         {screen===10&&<PanAdmin token={token}/>}
         {screen===111&&<Add/>}
         {screen===222&&<LinkAdmin token={token}/>}
      </main>
      <Modal
        className={classes.modal}
        open={modalOpen}
       // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={true}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Contact Helpdesk for support. Please Contact : 90735 + (69044/69385/68790)</h2>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
