import * as React from 'react';
import { axiosInstance } from '../../../../utils/axiosInstance';
import { UserContext } from '../../../../Contexts/userContext';
import { Avatar, Box, Button, Container, CssBaseline, Divider, Grid, IconButton, TextField, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Copyright, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PasswordChecklist from 'react-password-checklist';

async function fetchUser(token: any) {
    try {
        const response = await axiosInstance.get(`/dj-rest-auth/user/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
}

export default function AccountSettingsPage() {
    const userContext = React.useContext(UserContext);
    const loggedInUser = userContext.user;
    const navigate = useNavigate();
    const [isValid, setIsValid] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [currentEmail, setCurrentEmail] = React.useState("");
    const [currentPassword, setCurrentPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [newPassword2, setNewPassword2] = React.useState("");
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
    };
    React.useEffect(() => {
        if (loggedInUser) {
            fetchUser(loggedInUser.CLToken)
            .then((response: any) => {
                setCurrentEmail(response.email)
            });
        }

    })

    return (
        <Container component="main" maxWidth="md">
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
                    <SettingsIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ margin: "auto", paddingBottom: 5 }}>
                    Settings
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <Typography component="h5" sx={{ marginBottom: 2 }}>
                                Email:
                            </Typography>
                            <TextField
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Your Email Address"
                                name="email"
                                autoComplete="email"
                                value={currentEmail}
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={1}>
                            <Divider orientation="vertical" flexItem />
                        </Grid>

                        <Grid item xs={6}>
                            <Typography component="h5" sx={{ marginBottom: 2 }}>
                                Update your Password
                            </Typography>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="current-password"
                                label="Enter current password"
                                type={showPassword ? "text" : "password"}
                                onChange={e => setCurrentPassword(e.target.value)}
                                autoComplete="current-password"
                                InputProps={{
                                    endAdornment:
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="new-password"
                                label="Create your new password"
                                type={showPassword ? "text" : "password"}
                                onChange={e => setNewPassword(e.target.value)}
                                autoComplete="new-password"
                                InputProps={{
                                    endAdornment:
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="new-password2"
                                label="Confirm your new password"
                                type={showPassword ? "text" : "password"}
                                onChange={e => setNewPassword2(e.target.value)}
                                autoComplete="new-password2"
                                InputProps={{
                                    endAdornment:
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                }}
                            />
                            <PasswordChecklist
                                rules={["minLength", "specialChar", "number", "capital", "match"]}
                                minLength={8}
                                value={newPassword}
                                valueAgain={newPassword2}
                                onChange={(isValid: any) => {
                                    setIsValid(isValid)
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        disabled={!isValid}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}
