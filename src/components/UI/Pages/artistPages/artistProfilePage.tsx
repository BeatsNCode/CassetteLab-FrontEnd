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
  const [initialStageName, setInitialStageName] = React.useState("");
  const [initialLocation, setInitialLocation] = React.useState("");
  const [initialGenres, setInitialGenres] = React.useState<string[]>([]);
  const [stageName, setStageName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [isModified, setIsModified] = React.useState(false);
  const [feedbackMessage, setFeedbackMessage] = React.useState("");

  const userContext = React.useContext(UserContext);
  const loggedInUser = userContext.user;
  const artistContext = React.useContext(ArtistContext);
  const artist = artistContext?.artist;

  React.useEffect(() => {
    if (artist) {
      setInitialStageName(artist.stageName || "");
      setStageName(artist.stageName || "");
      setInitialLocation(artist.location || "");
      setLocation(artist.location || "");
      setInitialGenres(Array.isArray(artist.genres) ? artist.genres : []);
      setGenres(Array.isArray(artist.genres) ? artist.genres : []);
    }
  }, [artist]);

  React.useEffect(() => {
    const hasChanges = 
      initialStageName !== stageName ||
      initialLocation !== location ||
      JSON.stringify(initialGenres) !== JSON.stringify(genres);
    setIsModified(hasChanges);
  }, [stageName, location, genres, initialStageName, initialLocation, initialGenres]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateArtist(loggedInUser.id, stageName, location, genres, loggedInUser.CLToken);
      setFeedbackMessage("Your artist details have been updated successfully.");
      setInitialStageName(stageName);
      setInitialLocation(location);
      setInitialGenres(genres);
      setIsModified(false);
    } catch (error) {
      setFeedbackMessage("An error occurred while updating your details. Please try again.");
    }
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
                value={stageName}
                onChange={(e) => setStageName(e.target.value)}
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
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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
                disabled={!isModified}
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