import { axiosInstance } from "../../../utils/axiosInstance";

export default async function changePassword(token: string, currentPassword: string, newPassword: string, newPassword2: string) {
    try {
        const response = await axiosInstance.post(`/dj-rest-auth/password/change/`, {
            old_password: currentPassword,
            new_password1: newPassword,
            new_password2: newPassword2,
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data
    } catch (error) {
        console.error('Error updating password:', error)
        throw (error);
    }
}