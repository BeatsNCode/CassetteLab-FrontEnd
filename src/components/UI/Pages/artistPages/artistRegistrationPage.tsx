import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Grid from '@mui/material/Grid';
import GenresInput from './genresInput';
import { UserContext } from '../../../../Contexts/userContext';
import { ArtistContext } from '../../../../Contexts/artistContext';
import { axiosInstance } from '../../../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';


async function createArtist(id: any, artist: any, location: any, genresList: any, token: any) {
  return await axiosInstance.post("/artist/", {
      user: id,
      stage_name: artist,
      location: location,
      genres: genresList
  }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
  })
}

export default function artistRegistrationForm() {
    const [genres, setGenres] = React.useState<string[]>([]);
    const userContext = React.useContext(UserContext);
    const loggedInUser = userContext.user;
    const artistContext = React.useContext(ArtistContext);
    const navigate = useNavigate();
    const [feedbackMessage, setFeedbackMessage] = React.useState("");


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const stageName = data.get('stageName') as string; 
      const location = data.get('location') as string; 

  
      try {
          createArtist(loggedInUser.id, stageName, location, genres, loggedInUser.CLToken);
          localStorage.removeItem("isNewUser");
          artistContext?.setArtist(loggedInUser.id, stageName, location, genres);
          setFeedbackMessage("Your artist details have been updated successfully.");
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000)
      } catch (error) {
          setFeedbackMessage("No changes made.");
          console.error("Error creating artist:", error);
      }



  
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

        {feedbackMessage && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
            {feedbackMessage}
        </Typography>
        )}

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
            <GenresInput genres={genres} setGenres={setGenres} />
          </Grid>
          </Grid>
          <Grid item xs={6} sx={{ margin: "auto" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Profile
              </Button>
            </Grid>        
        </Box>
    </Box>
    </Container>  
)};

