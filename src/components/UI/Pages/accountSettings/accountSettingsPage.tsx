import * as React from 'react';
import { axiosInstance } from '../../../../utils/axiosInstance';
import { UserContext } from '../../../../Contexts/userContext';
import { Avatar, Box, Button, Container, CssBaseline, Divider, Grid, IconButton, TextField, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PasswordChecklist from 'react-password-checklist';
import changePassword from '../../Auth/changePassword';

async function fetchUser(token: string) {
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

async function updateUserDetails(id: any, token: string, email: string) {
    try {
        const response = await axiosInstance.put(`/user/update/${id}/`, { 
            email : email
            }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user details:', error);
        throw error;
    }
}

export default function AccountSettingsPage() {
    const userContext = React.useContext(UserContext);
    const loggedInUser = userContext.user;
    const [isValid, setIsValid] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [currentEmail, setCurrentEmail] = React.useState("");
    const [currentPassword, setCurrentPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [newPassword2, setNewPassword2] = React.useState("");
    const [feedbackMessage, setFeedbackMessage] = React.useState("");
    const [isModified, setIsModified] = React.useState(false);
    const [initialEmail, setInitialEmail] = React.useState("");

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const handleSubmit = async (event : any) => {
        event.preventDefault();
        let updated = false;

    try {
        if (currentEmail !== initialEmail) {
            await updateUserDetails(loggedInUser.id, loggedInUser.CLToken, currentEmail);
            updated = true;
        }

        if (currentPassword && newPassword && newPassword2) {
            await changePassword(loggedInUser.CLToken, currentPassword, newPassword, newPassword2);
            updated = true;
        }

        if (updated) {
            setFeedbackMessage("Your account details have been updated successfully.");
        } else {
            setFeedbackMessage("No changes made.");
        }

        setInitialEmail(currentEmail);
        setCurrentPassword("");
        setNewPassword("");
        setNewPassword2("");
        setIsValid(false);
        setIsModified(false);
    } catch (error) {
        setFeedbackMessage("An error occurred while updating your details. Please try again.");
    }
};

    React.useEffect(() => {
        if (loggedInUser) {
            fetchUser(loggedInUser.CLToken)
                .then((response) => {
                    setCurrentEmail(response.email);
                    setInitialEmail(response.email);
                });
        }
    }, [loggedInUser]);

    React.useEffect(() => {
        setIsModified(currentEmail !== initialEmail);
    }, [currentEmail, initialEmail]);

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
                <Typography component="h1" variant="h5" sx={{ margin: "auto" }}>
                    Settings
                </Typography>

                {feedbackMessage && (
                    <Typography color="error" sx={{ marginBottom: 2 }}>
                        {feedbackMessage}
                    </Typography>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt : 3, flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={5}>
                            <Typography component="h5" sx={{ marginBottom: 2, mt: 1 }}>
                                Email
                            </Typography>
                            <TextField
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                className="email-desktop"
                                label="Your Email Address"
                                name="email"
                                autoComplete="email"
                                value={currentEmail}
                                onChange={e => setCurrentEmail(e.target.value)}
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={12} md={1}>
                            <Divider orientation="vertical" flexItem />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography component="h5" sx={{ marginBottom: 2, mt: 1 }}>
                                Change Password
                            </Typography>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="current-password"
                                label="Enter your current password"
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
                                onChange={(isValid) => setIsValid(isValid)}
                            />
                        </Grid>
                        <Grid item md={3} sx={{ margin: "auto" }}>
                            <Button
                                type="submit"
                                disabled={!(isModified || isValid)}
                                variant="contained"
                                fullWidth
                                sx={{ mt: 3, mb: 2, minWidth: 200 }} 
                            >
                                Save Changes
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt : 3, display: { xs: 'block', md: 'none' } }}>
                    <Grid container spacing={2}>
                        <Grid item xs={10} sx={{ margin: "auto" }}>
                            <Typography component="h5" sx={{ marginBottom: 2, mt: 1, textAlign: "center" }}>
                                Email
                            </Typography>
                            <TextField
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                className="email-mobile"
                                label="Your Email Address"
                                name="email"
                                autoComplete="email"
                                value={currentEmail}
                                onChange={e => setCurrentEmail(e.target.value)}
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={10} sx={{ margin: "auto" }}>
                            <Typography component="h5" sx={{ marginBottom: 2, mt: 5, textAlign: "center" }}>
                                Change Password
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
                                onChange={(isValid) => setIsValid(isValid)}
                            />
                        </Grid>

                        <Grid item xs={4} sx={{ margin: "auto" }}>
                            <Button
                                type="submit"
                                disabled={!(isValid || isModified)}
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
