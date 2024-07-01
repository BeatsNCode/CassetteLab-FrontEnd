import { Box, Drawer, List, ListItemButton, ListItemText } from '@mui/material';


export default function SideMenu() {
  const drawer = (
    <Box sx={{ textAlign: 'center', marginTop: -1 }}>
      <List >
        <ListItemButton sx={{ paddingBottom: 2, paddingTop: 2 }} component="a" href="/dashboard">
          <ListItemText primary="Home" />
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
    </Box>
  );
};

