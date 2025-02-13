import { useState, useEffect } from "react";
import API from "../api/api";
import { useParams } from "react-router-dom";

const AdminManageVideos = () => {
    const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await API.get(`/videos/${courseId}`);
        setVideos(data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load videos");
      }
    };

    fetchVideos();
  }, [courseId]);

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/videos", { courseId, title, description, videoUrl });
      setVideos([...videos, data]);
      setTitle("");
      setDescription("");
      setVideoUrl("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add video");
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await API.delete(`/videos/${videoId}`);
      setVideos(videos.filter((video) => video._id !== videoId));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete video");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Manage Course Videos</h1>
      <form onSubmit={handleAddVideo} className="border p-5 my-3 bg-gray-100 rounded-lg">
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 my-2 border rounded"
          required
        />
        <textarea
          placeholder="Video Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 my-2 border rounded"
        />
        <input
          type="text"
          placeholder="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full p-2 my-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded">
          Add Video
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {videos.map((video) => (
        <div key={video._id} className="border p-3 my-3">
          <h2 className="text-xl font-bold">{video.title}</h2>
          <p>{video.description}</p>
          <video controls src={video.videoUrl} className="w-full my-3" />
          <button
            onClick={() => handleDeleteVideo(video._id)}
            className="bg-red-500 text-white px-5 py-2 my-3"
          >
            Delete Video
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminManageVideos;
