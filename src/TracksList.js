import React, { useState } from "react";
import "./styles/App.css";

import { fetchWebApi } from "./App.js";

let trackList;

function ListComponent(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    console.log("ListComponent called!!");

    // old function, don't know why this doesn't work
    // async function getUserTopTracks(trackCount) {
    //     // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    //     try {
    //         await fetchWebApi(
    //             `v1/me/top/tracks?time_range=short_term&limit=${trackCount}`,
    //             "GET"
    //         ).then((result) => {
    //             // let data = jsonToReadable(result.items);
    //             return <p> hi </p>;
    //         });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    function getUserTopTracks(trackCount) {
        console.log("A1 in get tracks");
        fetchWebApi(
            `v1/me/top/tracks?time_range=short_term&limit=${trackCount}`,
            "GET"
        )
            .then((response) => {
                console.log("A2 in get tracks promise resolved!");
                trackList = jsonToReadable(response.items);
                setIsLoaded(true);
                console.log(
                    "A3 now loaded. Here is the track list: " + trackList
                );
                //              return data;
            })
            .catch((err) => console.error(err));
    }

    function jsonToReadable(tracks) {
        let out = [];
        for (let i = 0; i < tracks.length; i++) {
            let song = tracks[i];
            // console.log(song);
            let artists_arr = [];
            for (let j = 0; j < song.artists.length; j++) {
                artists_arr.push(song.artists[j].name);
            }
            let artist = artists_arr.join(", ");
            let name = song.name;

            out.push(`${name} by ${artist}`);
        }
        return out;
    }

    let numberOfSongs = 10;
    if (!isLoaded) {
        getUserTopTracks(numberOfSongs);
    }
    //console.log("B1 done with get tracks isLoaded:" + isLoaded);
    //console.log("typeof trackList: " + trackList);
    return (
        <div>
            {isLoaded ? (
                <ol>
                    {trackList.map((element) => (
                        <li>{element}</li>
                    ))}
                </ol>
            ) : (
                <p>loading...</p>
            )}
        </div>
    );
}

export default ListComponent;
