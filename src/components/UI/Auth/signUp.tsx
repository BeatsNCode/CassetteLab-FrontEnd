import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { GoogleLogin } from '@react-oauth/google';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PasswordChecklist from 'react-password-checklist';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
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

function createAccount(emailAddress: FormDataEntryValue | null, password: FormDataEntryValue | null, password2: FormDataEntryValue | null ) {
  return (
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/dj-rest-auth/registration/',
      data: {
        email: emailAddress,
        password1: password,
        password2: password2
      }
    })
  );
}

function SignUp() {
  const [email, setEmail] = React.useState("")
  const navigate = useNavigate();
  const [isValid, setIsValid] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const isNewUser = true;

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    /* If account cannot be created,
    Update messaging on signup form */    
    createAccount(email, password, password2)
    .then(() => {
      localStorage.setItem("isNewUser", JSON.stringify(isNewUser));
      navigate('/sign-in');
    })
    .catch(() => alert("Could not create account"));
  };

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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                InputProps={{
                  endAdornment:
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      sx={{ display: 'flex'}}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                }}
              />  
            </Grid>
            <Grid item xs={12} sx={{ paddingBottom: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Re-enter Password"
                type={showPassword ? "text" : "password"}
                onChange={e => setPassword2(e.target.value)}
                autoComplete="current-password"
                InputProps={{
                  endAdornment:
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      sx={{ display: 'flex'}}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                }}
              />  
            </Grid>
            <Grid item xs={12}>
              <PasswordChecklist
                rules={["minLength", "specialChar", "number", "capital", "match"]}
                minLength={8}
                value={password}
                valueAgain={password2}
                onChange={(isValid) => {
                  setIsValid(isValid);
                }}
              />
            </Grid>
            <Grid item xs={6} sx={{ margin: "auto" }}>
              <Button
                type="submit"
                disabled={!isValid}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ textAlign: 'center', mb: 2 }}>OR</Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href={`/sign-in`} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}

export default withRedirectToDashboard(SignUp);
