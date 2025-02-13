import { useState, useEffect } from "react";
import API from "../api/api";
import { useParams } from "react-router-dom";

const CourseVideos = () => {
    const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
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

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Course Videos</h1>
      {error && <p className="text-red-500">{error}</p>}
 <div className="flex flex-wrap justify-between">
 {videos.map((video) => (
        <div key={video._id} className="border p-3 my-3 w-1/2 h-1/2">
          <h2 className="text-xl font-bold">{video.title}</h2>
          <p>{video.description}</p>
          <video controls src={video.videoUrl} className="w-full my-3" />
        </div>
      ))}
 </div>
    </div>
  );
};

export default CourseVideos;
