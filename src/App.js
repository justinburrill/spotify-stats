import "./styles/App.css";
import { useEffect, useState } from "react";

function App() {
  // build url to spotify login page
  const CLIENT_ID = "7e2111cdacaa4002be69723075f9b4ae";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT_URL = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  let spotifyAuthLink = `${AUTH_ENDPOINT_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token"); // attempt to get token from localstorage

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1]; // get token from URL

      // console.log(token);
      window.location.hash = ""; // remove all the bs from the URL
      window.localStorage.setItem("token", token); // store the token in localstorage
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token"); // remove token from storage to logout
  };

  async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: JSON.stringify(body),
    });
    console.log(res);
    return await res.json();
  }

  async function getUserTopTracks() {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (
      await fetchWebApi("v1/me/top/tracks?time_range=short_term&limit=5", "GET")
    ).items;
  }

  // need scope to get user tracks????

  let userTopTracks = getUserTopTracks(10);

  return (
    <div className="App">
      {!token ? ( // if the user is already signed in (we have the token) then replace the log in link with a log out button
        <a href={spotifyAuthLink} class="center">
          log in to spotfiy
        </a>
      ) : (
        <div>
          <button class="center" onClick={logout}>
            Logout
          </button>
        </div>
      )}

      <br></br>
      <img
        src={require("./images/dog.jpg")}
        alt="dog"
        width="500px"
        height="auto"
        position="absolute"
        class="center"
      ></img>
    </div>
  );
}

export default App;
