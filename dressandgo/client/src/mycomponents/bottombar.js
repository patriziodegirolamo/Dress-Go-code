import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import Home from '@mui/icons-material/Home';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import {  } from "react-bootstrap";




export default function FixedBottomNavigation(props) {

  /*
  Home: 0
  Faq: 1
  Chat: 2
  My rents: 3
  Account: 4
  */
  let navigate = useNavigate();

  const [value, setValue] = useState(() => {
    if (window.performance) {
      if (performance.navigation.type !== 1) {
        switch(window.location.href){
          case "http://localhost:3000/previews": return 0;
          case "http://localhost:3000/FAQ": return 1;
          case "http://localhost:3000/MyChats": return 2;
          case "http://localhost:3000/MyRents": return 3;
          case "http://localhost:3000/MyAccount": return 4;
          default: return 0;
        }
      }
      else{
        //rel
      }
    }
    const bottomNav = localStorage.getItem("currentBottomNav");
    if (bottomNav)
      return parseInt(bottomNav);
    else return 0;
  });

  return <>
    <Box sx={{ pb: 7 }}  >
    
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}

          onChange={(event, newValue) => {
            localStorage.setItem("currentBottomNav", newValue);
            setValue(newValue);
            
            props.setHistoryStack(() => [])
            localStorage.setItem("historyStack", "[]");
            props.setCurrentCat("");
            localStorage.setItem("currentCat", "");

              
            if( newValue === 0){
              props.setCurrentState("home");
              localStorage.setItem("currentState","home" );
              navigate("/");
            }
            else if(newValue === 1){
              props.setCurrentState("faq");
              localStorage.setItem("currentState","faq" );
              navigate("/FAQ");
            }
            else if(newValue === 2){
              props.setCurrentState("chats");
              localStorage.setItem("currentState","chats" );
              navigate("/MyChats");
            }
            else if(newValue === 3){
              props.setCurrentState("rents");
              localStorage.setItem("currentState","rents" );
              navigate("/MyRents");
            }
            else if(newValue === 4){
              props.setCurrentState("account");
              localStorage.setItem("currentState","account" );
              navigate("/MyAccount");
            }

            
          }}
        >
          <BottomNavigationAction label="Home" icon={<Home />} />
          
          <BottomNavigationAction label="FAQ" icon={<QuestionMarkIcon />} />

          <BottomNavigationAction label="Messages" icon={<ChatIcon />} />

          <BottomNavigationAction label="My rents" icon={<FormatListBulletedIcon />} />

          <BottomNavigationAction label="Account" icon={<AccountCircleIcon />} />


        </BottomNavigation>
      </Paper>
    </Box>
  </>
}

