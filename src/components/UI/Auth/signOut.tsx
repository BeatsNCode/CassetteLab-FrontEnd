import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function signOut() {
  const navigate = useNavigate()
    return (
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/dj-rest-auth/logout/"
      })
      .then(() => {
        localStorage.removeItem("CLU");
        localStorage.removeItem("CLabLogin");
        localStorage.removeItem("CLToken");
        navigate('/')
      })
    );
}