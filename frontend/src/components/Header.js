import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from "react-redux";
import { login } from "../redux/userData";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate('/')
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(login({}))
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1,  }}>
    <AppBar position="static" sx={{backgroundColor:'white'}}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          HOME
        </Typography>
        <Button color="inherit" onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  </Box>
  );
}

export default Header;
