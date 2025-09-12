import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { UserData } from "../context/User";
import { FaBookmark, FaPlay } from "react-icons/fa";

const Album = () => {
  const { fetchAlbumSong, albumSong, albumData, setIsPlaying, setSelectedSong } = SongData();
  const { addToPlaylist } = UserData();
  const params = useParams();

  useEffect(() => {
    fetchAlbumSong(params.id);
  }, [params.id]);

  const onclickHandler = (id) => {
    setSelectedSong(id);
    setIsPlaying(true);
  };

  const savePlayListHandler = (id) => {
    addToPlaylist(id);
  };

  return (
    <Layout>
      {albumData && (
        <>
          <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
            {albumData?.thumbnail?.url && (
              <img src={albumData.thumbnail.url} className="w-48 rounded" alt="Album" />
            )}
            <div className="flex flex-col">
              <p>Playlist</p>
              <h2 className="text-3xl font-bold mb-4 md:text-5xl">
                {albumData?.title || "Album"} Playlist
              </h2>
              <h4>{albumData?.description || ""}</h4>
              <p className="mt-1 inline-flex items-center gap-2 text-sm text-white">
                <img src={assets.spotify_logo} className="inline-block w-6" alt="Spotify" />
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

          {albumSong?.map((e, i) => (
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
        </>
      )}
    </Layout>
  );
};

export default Album;
