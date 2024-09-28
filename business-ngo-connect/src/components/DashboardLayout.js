import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const drawerWidth = 240;

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleNavigate = (path) => {
    handleUserMenuClose();
    navigate(path);
  };

  const menuItems = [
    { text: 'Search Contacts', icon: <SearchIcon sx={{ color: '#418CB5' }} />, path: '/main' },
    { text: 'Chat', icon: <ChatIcon sx={{ color: '#418CB5' }} />, path: '/chat' },
  ];

  const userMenuItems = [
    { text: 'Account Settings', icon: <SettingsIcon />, path: '/settings' },
    { text: 'Log Out', icon: <ExitToAppIcon />, path: '/login' },
  ];

  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        backgroundColor: '#6D6D6D',
        height: '100%',
        color: '#000',
      }}
    >
      <List sx={{ marginTop: 8 }}>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => navigate(item.path)}
            sx={{ color: '#000' }}
          >
            <ListItemIcon sx={{ color: '#418CB5' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#6D6D6D',
          height: '64px',
          padding: '0',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ color: '#000' }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            src="/logo.png"
            alt="Logo"
            sx={{ height: '50px', margin: '0 auto' }} // Poprawiony rozmiar logo
          />
          <IconButton
            color="inherit"
            onClick={handleUserMenuOpen}
            sx={{ color: '#000' }}
          >
            <Avatar />
          </IconButton>
          <Menu
            anchorEl={userMenuAnchorEl}
            open={Boolean(userMenuAnchorEl)}
            onClose={handleUserMenuClose}
            anchorOrigin={{
              vertical: 'bottom', // Menu otwiera się na dole ikony
              horizontal: 'right', // Menu otwiera się na prawo od ikony
            }}
            transformOrigin={{
              vertical: 'top', // Menu zaczyna się od góry
              horizontal: 'right', // Menu zaczyna się od prawej strony
            }}
            keepMounted
          >
            {userMenuItems.map((item, index) => (
              <MenuItem key={index} onClick={() => handleNavigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Lepsza wydajność na urządzeniach mobilnych
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#6D6D6D',
            color: '#000',
          },
        }}
      >
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: 8, // Ustalamy margines, żeby nie zachodziło na AppBar
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
