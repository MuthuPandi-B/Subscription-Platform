import BoxModel from "../models/BoxModel.js";

// Get all box models
export const getBoxModels = async (req, res) => {
  try {
    const boxModels = await BoxModel.find();
    res.json(boxModels);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch box models" });
  }
};

// Add a new box model
export const addBoxModel = async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const newBoxModel = new BoxModel({ title, description, imageUrl });
    await newBoxModel.save();
    res.status(201).json(newBoxModel);
  } catch (error) {
    res.status(500).json({ error: "Failed to add box model" });
  }
};

// Update a box model
export const updateBoxModel = async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const updatedBoxModel = await BoxModel.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl },
      { new: true }
    );
    if (!updatedBoxModel) return res.status(404).json({ error: "Box model not found" });
    res.json(updatedBoxModel);
  } catch (error) {
    res.status(500).json({ error: "Failed to update box model" });
  }
};

// Delete a box model
export const deleteBoxModel = async (req, res) => {
  try {
    await BoxModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Box model deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete box model" });
  }
};
