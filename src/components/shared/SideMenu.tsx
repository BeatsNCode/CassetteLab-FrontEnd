import * as React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

interface SideMenuProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const drawer = (
    <Box sx={{ textAlign: 'center', marginTop: -1 }}>
      <List >
        <ListItemButton sx={{ paddingBottom: 2, paddingTop: 2 }} component="a" href="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton sx={{ paddingBottom: 2, paddingTop: 2 }} component="a" href="/music">
          <ListItemText primary="Music" />
        </ListItemButton>
        <ListItemButton sx={{ paddingBottom: 2, paddingTop: 2 }} component="a" href="/cassettes">
          <ListItemText primary="Cassettes" />
        </ListItemButton>
        <ListItemButton sx={{ paddingBottom: 2, paddingTop: 2 }} component="a" href="/fans">
          <ListItemText primary="Fans" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }} >
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 170, top: 64 },
        }}
        open
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 180 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default SideMenu;
