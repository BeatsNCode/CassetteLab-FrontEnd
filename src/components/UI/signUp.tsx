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
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PasswordChecklist from "react-password-checklist"

import axios from 'axios';


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

function createAccount(emailAddress, Password, Password2) {
  return (
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/dj-rest-auth/registration/',
      data: {
        email: emailAddress,
        password1: Password,
        password2: Password2
      }
    })

  );
}

export default function SignUp() {

  const [password, setPassword] = React.useState("")
	const [password2, setPassword2] = React.useState("")

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const password2 = data.get('password2');

    createAccount(email, password, password2)

  };

  return (
      <Container component="main" maxWidth="xs">

        <Box
          sx={{
            marginTop: 8,
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  InputProps={{endAdornment:
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
              <Grid item xs={12} sx={{ paddingBottom: 2}}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Re-enter Password"
                  type={showPassword ? "text" : "password"}
                  onChange={e => setPassword2(e.target.value)}
                  autoComplete="current-password"
                  InputProps={{endAdornment:
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
              <PasswordChecklist
                rules={["minLength","specialChar","number","capital","match"]}
                minLength={8}
                value={password}
                valueAgain={password2}
                onChange={(isValid) => {}}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Typography sx={{ padding: 1, textAlign: 'center' }}>OR</Typography>
            <Box
              sx={{
                marginTop: 1,
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
            <br/>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={`/sign-in`} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
  );
}