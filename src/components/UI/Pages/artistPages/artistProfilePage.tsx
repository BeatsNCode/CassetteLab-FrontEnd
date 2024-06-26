import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Grid from '@mui/material/Grid';
import { ArtistContext } from '../../../../Contexts/artistContext';
import { UserContext } from '../../../../Contexts/userContext';
import GenresInput from './genresUpdateInput';
import { axiosInstance } from '../../../../utils/axiosInstance';

async function updateArtist(id: any, artist: any, location: any, genresList: any, token: any) {
  return await axiosInstance.put(`/artist/${id}/`, {
    user: id,
    stage_name: artist,
    location: location,
    genres: genresList
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export default function ArtistProfilePage() {
  const [genres, setGenres] = React.useState<string[]>([]);
  const userContext = React.useContext(UserContext);
  const loggedInUser = userContext.user;
  const artistContext = React.useContext(ArtistContext);
  const artist = artistContext?.artist;
  const [feedbackMessage, setFeedbackMessage] = React.useState("");


  React.useEffect(() => {
    if (artist) {
      setGenres(Array.isArray(artist.genres) ? artist.genres : []);
    }
  }, [artist]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const stageName = data.get('stageName');
    const location = data.get('location');

    updateArtist(loggedInUser.id, stageName, location, genres, loggedInUser.CLToken)
    .then((response) => {
      if (response.status === 200) {
        setFeedbackMessage("Your artist details have been updated successfully.");
    } else {
        setFeedbackMessage("No changes made.");
    }
    })


  };

  if (!artist) {
    return <Typography>...Loading</Typography>;
  }


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
          <ManageAccountsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Your Profile
        </Typography>

        {feedbackMessage && (
      <Typography color="error" sx={{ marginBottom: 2 }}>
          {feedbackMessage}
      </Typography>
      )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
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
              />
            </Grid>
            <Grid item xs={12}>
              <GenresInput genres={genres} setGenres={setGenres} />
            </Grid>
            <Grid item xs={6} sx={{ margin: "auto" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
