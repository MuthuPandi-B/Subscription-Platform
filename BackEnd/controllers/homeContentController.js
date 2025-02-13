import HomeContent from "../models/HomeContent.js";

// Get homepage content
export const getHomeContent = async (req, res) => {
  try {
    const content = await HomeContent.findOne(); // Only one homepage content
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch homepage content" });
  }
};

// Update homepage content
export const updateHomeContent = async (req, res) => {
  try {
    const { heading, subheading, imageUrl } = req.body;
    let content = await HomeContent.findOne();
    
    // Update existing content or create new if none exists
    if (content) {
      content.heading = heading;
      content.subheading = subheading;
      content.imageUrl = imageUrl;
      await content.save();
    } else {
      content = new HomeContent({ heading, subheading, imageUrl });
      await content.save();
    }

    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Failed to update homepage content" });
  }
};
