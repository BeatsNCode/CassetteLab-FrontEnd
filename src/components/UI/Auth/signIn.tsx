import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../Contexts/userContext';
import withRedirectToDashboard from '../../../Contexts/userRedirect';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://Cassette-Lab.com/">
        CassetteLab
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function login(emailAddress: FormDataEntryValue | null, Password: FormDataEntryValue | null) {
  return (
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/dj-rest-auth/login/",
      data: {
        email: emailAddress,
        password: Password
      }
    })
  );
}

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const userContext = React.useContext(UserContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    login(email, password)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.user;
          const token = response.data.access;
          const userID = data.pk;
          const isLoggedIn = true;

          localStorage.setItem("CLabLogin", JSON.stringify(isLoggedIn));
          localStorage.setItem("CLU", JSON.stringify(userID));
          localStorage.setItem("CLToken", token);

          userContext.setUser({ id: data.pk, isLoggedIn: isLoggedIn, CLToken: token });

          const newUser = localStorage.getItem("isNewUser");

          if (newUser) {
            navigate("/artist-new");
          } else {
            navigate("/dashboard");
          }
        }
      })
      .catch(() => alert("Could not sign you in"));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment:
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      sx={{ display: 'flex' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                }}
              />
            </Grid>
            <Grid item xs={6} sx={{ margin: "auto" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
                disabled={!email || !password}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
          <Typography sx={{ mt: 2, mb: 2, textAlign: 'center' }}>OR</Typography>
          <Box
            sx={{
              paddingTop: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </Box>
          <br />
          <Grid container>
            <Grid item xs>
              <Link href={`/forgot-password`} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href={`/sign-up`} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

export default withRedirectToDashboard(SignIn);