import React from 'react';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Szukaj kontaktów', icon: <SearchIcon />, path: '/main' },
    { text: 'Chat', icon: <ChatIcon />, path: '/chat' },
    { text: 'Ustawienia konta', icon: <SettingsIcon />, path: '/settings' },
    { text: 'Wyloguj się', icon: <ExitToAppIcon />, path: '/login'},
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Nazwa aplikacji TODO
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem 
                button 
                key={index} 
                onClick={() => item.path && navigate(item.path)} 
                sx={{ cursor: item.path ? 'pointer' : 'default' }} // Ustawia kursor tylko dla klikalnych elementów
              >
                <ListItemIcon sx={{ color: '#82ff82' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{color: "#fff"}} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 0, marginTop: 0, }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
