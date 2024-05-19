import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Grid from '@mui/material/Grid';

export default function artistRegistrationForm() {


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('stageName'))
        console.log(data.get('location'))
        console.log(data.get('genres'))



    
      };

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
          Create your artist profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="stageName"
                label="Band/Stage name"
                name="stageName"
                autoComplete="Band/Stage name"
                autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
                required
                margin="normal"
                fullWidth
                id="location"
                label="Where are you based?"
                name="location"
                autoComplete="location"
                autoFocus
            />
          </Grid>
          <Grid item xs={12} sx={{ paddingBottom: 2}}>
            <TextField
                required
                margin="normal"
                fullWidth
                id="genres"
                label="Enter your genre(s)"
                name="genres"
                autoComplete="genres"
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
            Create your artist profile
          </Button>
            
        </Box>
    </Box>
    </Container>  
)};