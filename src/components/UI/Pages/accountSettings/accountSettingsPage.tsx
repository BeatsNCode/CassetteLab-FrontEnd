import * as React from 'react';
import { axiosInstance } from '../../../../utils/axiosInstance';
import { UserContext } from '../../../../Contexts/userContext';

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
    fetchUser(loggedInUser.CLToken)
    .then((response) => console.log(response))

    return (

        // Build password change form
        // Fields to include:
        // new_password1
        // new_password2
        // old_password     


        // Add account close/pause button


        <h1>Account Page</h1>
    )
}