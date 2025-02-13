import { useState, useEffect } from "react";
import API from "../api/api";

const AdminManageBoxModels = () => {
  const [boxModels, setBoxModels] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedBoxId, setSelectedBoxId] = useState(null);

  useEffect(() => {
    const fetchBoxModels = async () => {
      try {
        const { data } = await API.get("/boxmodels");
        setBoxModels(data);
      } catch (err) {
        console.error("Error fetching box models:", err);
      }
    };

    fetchBoxModels();
  }, []);

  const handleAddOrUpdateBox = async (e) => {
    e.preventDefault();
    try {
      if (selectedBoxId) {
        await API.put(`/boxmodels/${selectedBoxId}`, { title, description, imageUrl });
      } else {
        await API.post("/boxmodels", { title, description, imageUrl });
      }
      setTitle("");
      setDescription("");
      setImageUrl("");
      setSelectedBoxId(null);
    } catch (err) {
      console.error("Error adding/updating box model:", err);
    }
  };

  const handleEditBox = (box) => {
    setSelectedBoxId(box._id);
    setTitle(box.title);
    setDescription(box.description);
    setImageUrl(box.imageUrl);
  };

  const handleDeleteBox = async (id) => {
    try {
      await API.delete(`/boxmodels/${id}`);
      setBoxModels(boxModels.filter((box) => box._id !== id));
    } catch (err) {
      console.error("Error deleting box model:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Box Models</h1>
      <form onSubmit={handleAddOrUpdateBox}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 my-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 my-2 border rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 my-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded">
          {selectedBoxId ? "Update Box" : "Add Box"}
        </button>
      </form>

      {boxModels.map((box) => (
        <div key={box._id} className="border p-3 my-3">
          <img src={box.imageUrl} alt={box.title} className="w-1/4 h-1/2 object-cover rounded" />
          <h2 className="text-xl font-bold">{box.title}</h2>
          <p>{box.description}</p>
          <button onClick={() => handleEditBox(box)} className="bg-blue-500 text-white px-5 py-2 my-2">
            Edit
          </button>
          <button onClick={() => handleDeleteBox(box._id)} className="bg-red-500 text-white px-5 py-2 my-2">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminManageBoxModels;
