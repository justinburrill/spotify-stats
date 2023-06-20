import "./styles/App.css";
import { useEffect, useState } from "react";
import ListComponent from "./TracksList.js";

const data = {
    CLIENT_ID: "7e2111cdacaa4002be69723075f9b4ae",
    REDIRECT_URI: "http://localhost:3000",
    AUTH_ENDPOINT_URL: "https://accounts.spotify.com/authorize",
    RESPONSE_TYPE: "token",
    SCOPE: "user-top-read",
};

async function fetchWebApi(endpoint, method, body) {
    console.log("C1 fetch called ");
    let token = window.localStorage.getItem("token");
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body),
    });
    // console.log(res);
    return await res.json();
}

function App() {
    // build url to spotify login page
    let spotifyAuthLink = `${data.AUTH_ENDPOINT_URL}?client_id=${data.CLIENT_ID}&redirect_uri=${data.REDIRECT_URI}&response_type=${data.RESPONSE_TYPE}&scope=${data.SCOPE}`;

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
        window.location.reload(false);
    };

    const [displayingList, setDisplayingList] = useState(false);
    function getTracksButtonPress() {
        setDisplayingList(true);
    }

    return (
        <div className="App">
            {!token ? ( // if the user is already signed in (we have the token) then replace the log in link with a log out button
                <a href={spotifyAuthLink} className="center">
                    log in to spotfiy
                </a>
            ) : (
                <div>
                    <button className="center" onClick={logout}>
                        Logout
                    </button>
                    <div className="center">
                        {displayingList ? (
                            <ListComponent />
                        ) : (
                            <button onClick={() => getTracksButtonPress()}>
                                Get your top tracks
                            </button>
                        )}
                    </div>
                </div>
            )}
            <br></br>
            <img
                src={require("./images/dog.jpg")}
                alt="dog"
                width="500px"
                height="auto"
                position="absolute"
                className="center"
            ></img>
        </div>
    );
}
export { fetchWebApi };

export default App;
