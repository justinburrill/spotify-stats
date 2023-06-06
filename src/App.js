import "./App.css";


function App() {
  const CLIENT_ID = "7e2111cdacaa4002be69723075f9b4ae";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT_URL = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  let spotifyAuthLink = `${AUTH_ENDPOINT_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;

  return (
    <div className="App">
      <img src={require("./images/dog.jpg")} alt="dog"></img>
      <br></br>
      <a href={spotifyAuthLink}>log in to spotfiy</a>
    </div>
  );
}

export default App;
