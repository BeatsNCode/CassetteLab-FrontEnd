import axios from 'axios';

export default function signOut() {
    return (
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/dj-rest-auth/logout/"
      })
      .then(() => {
        localStorage.removeItem("CLU");
        localStorage.removeItem("CLabLogin");
      })
    );
}