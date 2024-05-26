import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Grid from '@mui/material/Grid';
import { useArtist } from '../../../Contexts/artistContext';



export default function ArtistProfilePage() {
     const { artist } = useArtist();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        const stageName = data.get('stageName')
        const location = data.get('location') 
        const genres = data.get('genres')

        console.log(stageName)
        
        
      };

    if (!artist) {
      return <Typography>Loading...</Typography>;
    }

    return (
        <Container component="main" maxWidth="xs">
        <Box
          sx={{
          marginTop: 10 ,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <ManageAccountsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Your Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="stageName"
                name="stageName"
                autoComplete="Band/Stage name"
                helperText="Your Band/Stage name"
                variant="standard"
                defaultValue={artist.stageName}
                autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
                required
                margin="normal"
                fullWidth
                id="location"
                name="location"
                autoComplete="location"
                helperText="Where you're based"
                variant="standard"
                defaultValue={artist.location}
                autoFocus
            />
          </Grid>

          <Grid item xs={12} sx={{ paddingBottom: 2}}>
            <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="genres"
                    name="genres"
                    autoComplete="genres"
                    helperText="Your genre(s)"
                    variant="standard"
                    defaultValue={artist.genres}
                    autoFocus
                />
          </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
            Save Changes
          </Button>
            
        </Box>
    </Box>
    </Container>  
    )
}