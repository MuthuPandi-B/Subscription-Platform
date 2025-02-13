import Video from "../models/Video.js";

// Get all videos for a course
export const getVideosByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const videos = await Video.find({ courseId });
    res.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

// Add a new video
export const addVideo = async (req, res) => {
  try {
    const { courseId, title, description, videoUrl } = req.body;
    const newVideo = new Video({ courseId, title, description, videoUrl });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    console.error("Error adding video:", error);
    res.status(500).json({ error: "Failed to add video" });
  }
};

// Update a video
export const updateVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { title, description, videoUrl } = req.body;
    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      { title, description, videoUrl },
      { new: true }
    );
    if (!updatedVideo) return res.status(404).json({ error: "Video not found" });
    res.json(updatedVideo);
  } catch (error) {
    console.error("Error updating video:", error);
    res.status(500).json({ error: "Failed to update video" });
  }
};

// Delete a video
export const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    await Video.findByIdAndDelete(videoId);
    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ error: "Failed to delete video" });
  }
};
