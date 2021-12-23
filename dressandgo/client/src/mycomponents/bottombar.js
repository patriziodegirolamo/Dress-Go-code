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




export default function FixedBottomNavigation(props) {

  /*
  Home: 0
  Faq: 1
  Chat: 2
  My rents: 3
  Account: 4
  */
  let navigate = useNavigate();
  const [value, setValue] = useState(0)
  const ref = React.useRef(null);

  return (
    <Box sx={{ pb: 7 }} ref={ref} >
    
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}

          onChange={(event, newValue) => {
            setValue(newValue);

            if( newValue === 0){
              props.setCurrentState("home");
              props.setCurrentCat("");
              props.setCurrentDress("");

              navigate("/");
            }
            else if(newValue === 1){
              props.setCurrentState("faq");
              navigate('/guide');
              //navigate("/FAQ");
            }
            else if(newValue === 2){
              props.setCurrentState("chat");
              navigate("/MyChats");
            }
            else if(newValue === 3){
              props.setCurrentState("rents");
              navigate("/MyRents");
            }
            else if(newValue === 4){
              props.setCurrentState("account");
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
  );
}

