import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import { assets } from "../assets/assets";
import { FaBookmark, FaPlay } from "react-icons/fa";
import { UserData } from "../context/User";

const PlayList = ({ user }) => {
  const { songs, setSelectedSong, setIsPlaying } = SongData();
  const { addToPlaylist } = UserData();

  const [myPlaylist, setMyPlaylist] = useState([]);

  useEffect(() => {
    if (songs && user && Array.isArray(user.playlist)) {
      const filteredSongs = songs.filter((e) =>
        user.playlist.includes(e._id.toString())
      );
      setMyPlaylist(filteredSongs);
    }
  }, [songs, user]);

  const onclickHandler = (id) => {
    setSelectedSong(id);
    setIsPlaying(true);
  };

  const savePlayListHandler = (id) => {
    addToPlaylist(id);
  };

  return (
    <Layout>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
        <img
          src={myPlaylist[0]?.thumbnail?.url || "https://via.placeholder.com/250"}
          className="w-48 rounded"
          alt="Playlist Thumbnail"
        />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-3xl font-bold mb-4 md:text-5xl">
            {user?.name || "Guest"} Playlist
          </h2>
          <h4>Your Favourite songs</h4>
          <p className="mt-1 inline-flex items-center gap-2 text-sm text-white">
            <img
              src={assets.spotify_logo}
              className="inline-block w-6"
              alt="Spotify"
            />
            <span>Spotify</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p><b className="mr-4">#</b></p>
        <p>Artist</p>
        <p className="hidden sm:block">Description</p>
        <p className="text-center">Actions</p>
      </div>
      <hr />

      {myPlaylist?.map((e, i) => (
        <div
          className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
          key={i}
        >
          <div className="flex items-center space-x-2">
            <span className="text-[#a7a7a7] w-4">{i + 1}</span>
            <img
              src={e?.thumbnail?.url || "https://via.placeholder.com/50"}
              className="w-10 h-10 rounded object-cover"
              alt={e?.title || "Song"}
            />
            <span className="text-sm truncate max-w-[120px] sm:max-w-none">
              {e?.title || "Unknown"}
            </span>
          </div>
          <p className="text-[13px] sm:text-[15px] ml-8 sm:ml-0">{e?.singer || "Unknown"}</p>
          <p className="text-[15px] hidden sm:block">
            {e?.description?.slice(0, 20) || ""}...
          </p>
          <div className="flex justify-center items-center gap-5">
            <p className="text-[15px] text-center" onClick={() => savePlayListHandler(e._id)}>
              <FaBookmark />
            </p>
            <p className="text-[15px] text-center" onClick={() => onclickHandler(e._id)}>
              <FaPlay />
            </p>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default PlayList;
