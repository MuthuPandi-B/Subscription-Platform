import { useState, useEffect } from "react";
import API from "../api/api";

const CarouselBox = () => {
  const [boxModels, setBoxModels] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBoxModels = async () => {
      try {
        const { data } = await API.get("/boxmodels");
        setBoxModels(data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load box models");
      }
    };

    fetchBoxModels();
  }, []);

  return (
    <div className="carousel p-5 flex justify-center items-center">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-wrap justify-center gap-4">
        {boxModels.map((box) => (
          <div key={box._id} className="border rounded-lg shadow-md p-4 min-w-[300px] justify-center items-center">
            <img src={box.imageUrl} alt={box.title} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-bold mt-2">{box.title}</h2>
            <p>{box.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselBox;
