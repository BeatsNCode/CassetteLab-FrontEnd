import * as React from "react";
import { Container, Box, Avatar, Typography, Grid, TextField, Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { ArtistContext } from '../../../../Contexts/artistContext';


export default function dashboard() {
    const artistContext = React.useContext(ArtistContext);
    const artist = artistContext?.artist;

    return (

     <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <HomeIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Dashboard
        </Typography>

        {artist && (

          <Typography component="h2" variant="h6" sx={{ mt: 3 }}>
              Welcome, {artist.stageName}
          </Typography>
        )}

        <Box sx={{ mt: 3 }}>

        </Box>

      </Box>
     </Container>
    )
}