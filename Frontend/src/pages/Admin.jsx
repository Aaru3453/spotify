// import React, { useState } from "react";
// import { UserData } from "../context/User";
// import { Link, useNavigate } from "react-router-dom";
// import { SongData } from "../context/Song";
// import { MdDelete } from "react-icons/md";

// const Admin = () => {
//   const { user } = UserData();
//   const {
//     albums,
//     songs,
//     addAlbum,
//     loading,
//     addSong,
//     addThumbnail,
//     deleteSong,
//   } = SongData();
//   const navigate = useNavigate();

//   if (user && user.role !== "admin") return navigate("/");

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [file, setFile] = useState(null);
//   const [singer, setSinger] = useState("");
//   const [album, setAlbum] = useState("");
//   const [duration, setDuration] = useState(""); // ✅ Duration state

//   const fileChangeHandler = (e) => {
//     const file = e.target.files[0];
//     setFile(file);
//   };

//   const addAlbumHandler = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("file", file);
//     addAlbum(formData, setTitle, setDescription, setFile);
//   };

//   const addSongHandler = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("singer", singer);
//     formData.append("album", album);
//     formData.append("duration", duration); // ✅ Add duration
//     formData.append("file", file);
//     addSong(formData, setTitle, setDescription, setFile, setSinger, setAlbum, setDuration);
//   };

//   const addThumbnailHandler = (id) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     addThumbnail(id, formData, setFile);
//   };

//   const deleteHandler = (id) => {
//     if (confirm("Are you sure you want to delete this song?")) {
//       deleteSong(id);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#212121] text-white p-8">
//       <Link to="/" className="bg-green-500 text-white font-bold py-2 px-4 rounded-full">
//         Go to home page
//       </Link>

//       {/* Add Album Form */}
//       <h2 className="text-2xl font-bold mb-6 mt-6">Add Album</h2>
//       <form onSubmit={addAlbumHandler} className="bg-[#181818] p-6 rounded-lg shadow-lg">
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Title</label>
//           <input
//             type="text"
//             placeholder="Title"
//             className="auth-input"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Description</label>
//           <input
//             type="text"
//             placeholder="Description"
//             className="auth-input"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Thumbnail</label>
//           <input
//             type="file"
//             className="auth-input"
//             accept="image/*"
//             onChange={fileChangeHandler}
//             required
//           />
//         </div>
//         <button disabled={loading} className="auth-btn w-[100px]">
//           {loading ? "Please Wait..." : "Add"}
//         </button>
//       </form>

//       {/* Add Songs Form */}
//       <h2 className="text-2xl font-bold mb-6 mt-6">Add Songs</h2>
//       <form onSubmit={addSongHandler} className="bg-[#181818] p-6 rounded-lg shadow-lg">
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Title</label>
//           <input
//             type="text"
//             placeholder="Title"
//             className="auth-input"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Description</label>
//           <input
//             type="text"
//             placeholder="Description"
//             className="auth-input"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Singer</label>
//           <input
//             type="text"
//             placeholder="Singer"
//             className="auth-input"
//             value={singer}
//             onChange={(e) => setSinger(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Duration</label>
//           <input
//             type="text"
//             placeholder="e.g. 3:45"
//             className="auth-input"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Album</label>
//           <select
//             className="auth-input"
//             value={album}
//             onChange={(e) => setAlbum(e.target.value)}
//             required
//           >
//             <option value="">Choose Album</option>
//             {albums &&
//               albums.map((e, i) => (
//                 <option value={e._id} key={i}>
//                   {e.title}
//                 </option>
//               ))}
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Audio File</label>
//           <input
//             type="file"
//             className="auth-input"
//             accept="audio/*"
//             onChange={fileChangeHandler}
//             required
//           />
//         </div>
//         <button disabled={loading} className="auth-btn w-[100px]">
//           {loading ? "Please Wait..." : "Add"}
//         </button>
//       </form>

//       {/* Song List Table */}
//       <div className="mt-8 overflow-x-auto">
//         <h3 className="text-xl font-semibold mb-4">Added Songs</h3>
//         <table className="min-w-full table-auto bg-[#181818] text-left rounded-lg overflow-hidden text-sm">
//           <thead className="bg-[#1f1f1f] text-gray-300 text-xs uppercase tracking-wider">
//             <tr>
//               <th className="px-3 py-2">Thumbnail</th>
//               <th className="px-3 py-2">Title</th>
//               <th className="px-3 py-2">Singer</th>
//               <th className="px-3 py-2">Description</th>
//               <th className="px-3 py-2">Duration</th>
//               <th className="px-3 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {songs &&
//               songs.map((e, i) => (
//                 <tr
//                   key={i}
//                   className="border-b border-[#2a2a2a] hover:bg-[#2b2b2b] transition-colors duration-200"
//                 >
//                   <td className="px-3 py-2">
//                     {e.thumbnail ? (
//                       <img
//                         src={e.thumbnail.url}
//                         alt=""
//                         className="w-12 h-12 object-cover rounded"
//                       />
//                     ) : (
//                       <div className="flex flex-col gap-1 text-xs">
//                         <input type="file" onChange={fileChangeHandler} />
//                         <button
//                           onClick={() => addThumbnailHandler(e._id)}
//                           className="bg-green-500 text-white px-1 py-0.5 rounded"
//                         >
//                           Add
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                   <td className="px-3 py-2 font-light">{e.title}</td>
//                   <td className="px-3 py-2 font-light">{e.singer}</td>
//                   <td className="px-3 py-2 text-gray-400">{e.description}</td>
//                   <td className="px-3 py-2 text-gray-400">
//                     {e.duration || "—"}
//                   </td>
//                   <td className="px-3 py-2 text-center">
//                     <button
//                       onClick={() => deleteHandler(e._id)}
//                       className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
//                       title="Delete"
//                     >
//                       <MdDelete size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Admin;





import React, { useState, useEffect } from "react";
import { UserData } from "../context/User";
import { Link, useNavigate } from "react-router-dom";
import { SongData } from "../context/Song";
import { MdDelete } from "react-icons/md";

const Admin = () => {
  const { user } = UserData();
  const { albums, songs, addAlbum, addSong, addThumbnail, deleteSong, loading } = SongData();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== "admin") navigate("/");
  }, [user]);

  // --- Album Form States ---
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [albumFile, setAlbumFile] = useState(null);

  // --- Song Form States ---
  const [songTitle, setSongTitle] = useState("");
  const [songDescription, setSongDescription] = useState("");
  const [songFile, setSongFile] = useState(null);
  const [singer, setSinger] = useState("");
  const [album, setAlbum] = useState("");
  const [duration, setDuration] = useState("");

  const fileChangeHandler = (e, type) => {
    const file = e.target.files[0];
    if (type === "album") setAlbumFile(file);
    else setSongFile(file);
  };

  const addAlbumHandler = (e) => {
    e.preventDefault();
    if (!albumFile) return alert("Select a file!");
    const formData = new FormData();
    formData.append("title", albumTitle);
    formData.append("description", albumDescription);
    formData.append("file", albumFile);
    addAlbum(formData, setAlbumTitle, setAlbumDescription, setAlbumFile);
  };

  const addSongHandler = (e) => {
    e.preventDefault();
    if (!songFile) return alert("Select a song file!");
    const formData = new FormData();
    formData.append("title", songTitle);
    formData.append("description", songDescription);
    formData.append("singer", singer);
    formData.append("album", album);
    formData.append("duration", duration);
    formData.append("file", songFile);
    addSong(formData, setSongTitle, setSongDescription, setSongFile, setSinger, setAlbum, setDuration);
  };

  const addThumbnailHandler = (id) => {
    if (!songFile) return alert("Select a file!");
    const formData = new FormData();
    formData.append("file", songFile);
    addThumbnail(id, formData, setSongFile);
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this song?")) deleteSong(id);
  };

  return (
    <div className="min-h-screen bg-[#212121] text-white p-8">
      <Link to="/" className="bg-green-500 text-white font-bold py-2 px-4 rounded-full">
        Go to home page
      </Link>

      {/* Add Album Form */}
      <h2 className="text-2xl font-bold mb-6 mt-6">Add Album</h2>
      <form onSubmit={addAlbumHandler} className="bg-[#181818] p-6 rounded-lg shadow-lg">
        <input type="text" placeholder="Title" value={albumTitle} onChange={(e)=>setAlbumTitle(e.target.value)} className="auth-input" required />
        <input type="text" placeholder="Description" value={albumDescription} onChange={(e)=>setAlbumDescription(e.target.value)} className="auth-input" required />
        <input type="file" accept="image/*" onChange={(e)=>fileChangeHandler(e, "album")} required />
        <button disabled={loading} className="auth-btn w-[100px]">{loading?"Please Wait...":"Add"}</button>
      </form>

      {/* Add Song Form */}
      <h2 className="text-2xl font-bold mb-6 mt-6">Add Songs</h2>
      <form onSubmit={addSongHandler} className="bg-[#181818] p-6 rounded-lg shadow-lg">
        <input type="text" placeholder="Title" value={songTitle} onChange={(e)=>setSongTitle(e.target.value)} className="auth-input" required />
        <input type="text" placeholder="Description" value={songDescription} onChange={(e)=>setSongDescription(e.target.value)} className="auth-input" required />
        <input type="text" placeholder="Singer" value={singer} onChange={(e)=>setSinger(e.target.value)} className="auth-input" required />
        <input type="text" placeholder="Duration" value={duration} onChange={(e)=>setDuration(e.target.value)} className="auth-input" required />
        <select className="auth-input" value={album} onChange={(e)=>setAlbum(e.target.value)} required>
          <option value="">Choose Album</option>
          {albums?.map((e,i)=><option key={i} value={e._id}>{e.title}</option>)}
        </select>
        <input type="file" accept="audio/*" onChange={(e)=>fileChangeHandler(e,"song")} required />
        <button disabled={loading} className="auth-btn w-[100px]">{loading?"Please Wait...":"Add"}</button>
      </form>

      {/* Song Table */}
      <div className="mt-8 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Added Songs</h3>
        <table className="min-w-full table-auto bg-[#181818] text-left rounded-lg overflow-hidden text-sm">
          <thead className="bg-[#1f1f1f] text-gray-300 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-3 py-2">Thumbnail</th>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Singer</th>
              <th className="px-3 py-2">Description</th>
              <th className="px-3 py-2">Duration</th>
              <th className="px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {songs?.map((e,i)=>(
              <tr key={i} className="border-b border-[#2a2a2a] hover:bg-[#2b2b2b] transition-colors duration-200">
                <td className="px-3 py-2">
                  {e?.thumbnail?.url ? (
                    <img src={e.thumbnail.url} alt="" className="w-12 h-12 object-cover rounded" />
                  ) : (
                    <div className="flex flex-col gap-1 text-xs">
                      <input type="file" onChange={(ev)=>fileChangeHandler(ev,"song")} />
                      <button onClick={()=>addThumbnailHandler(e._id)} className="bg-green-500 text-white px-1 py-0.5 rounded">Add</button>
                    </div>
                  )}
                </td>
                <td className="px-3 py-2 font-light">{e.title}</td>
                <td className="px-3 py-2 font-light">{e.singer}</td>
                <td className="px-3 py-2 text-gray-400">{e.description}</td>
                <td className="px-3 py-2 text-gray-400">{e.duration || "—"}</td>
                <td className="px-3 py-2 text-center">
                  <button onClick={()=>deleteHandler(e._id)} className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600" title="Delete"><MdDelete size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
