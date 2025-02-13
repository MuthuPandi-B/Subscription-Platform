import { useState, useEffect } from "react";
import API from "../api/api";
import AdminManageBoxModels from "./AdminManageBoxModels";

const AdminManageHomeContent = () => {
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const { data } = await API.get("/home-content");
        if (data) {
          setHeading(data.heading);
          setSubheading(data.subheading);
          setImageUrl(data.imageUrl);
        }
      } catch (err) {
        console.error("Error fetching homepage content:", err);
      }
    };

    fetchHomeContent();
  }, []);

  const handleUpdateContent = async (e) => {
    e.preventDefault();
    try {
      await API.put("/home-content", { heading, subheading, imageUrl });
      alert("Homepage content updated successfully!");
    } catch (err) {
      console.error("Error updating homepage content:", err);
      alert("Failed to update homepage content.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Manage Homepage Content</h1>
      <form onSubmit={handleUpdateContent}>
        <input
          type="text"
          placeholder="Heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="w-full p-2 my-2 border rounded"
          required
        />
        <textarea
          placeholder="Subheading"
          value={subheading}
          onChange={(e) => setSubheading(e.target.value)}
          className="w-full p-2 my-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 my-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded">
          Update Content
        </button>
      </form>
      <AdminManageBoxModels/>
    </div>
  );
};

export default AdminManageHomeContent;
