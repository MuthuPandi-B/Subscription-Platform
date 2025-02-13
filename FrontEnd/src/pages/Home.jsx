import { useEffect, useState } from "react";
import API from "../api/api";
import CarouselBox from "../components/CarouselBox";

function Home() {
  const [homeContent, setHomeContent] = useState({
    heading: "Welcome to the Learning Platform",
    subheading: "Explore and subscribe to premium courses",
    imageUrl: "https://www.aihr.com/wp-content/uploads/learning-vs-training-cover.png", // Default image
  });

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const { data } = await API.get("/home-content");
        if (data) setHomeContent(data);
      } catch (err) {
        console.error("Error fetching homepage content:", err);
      }
    };

    fetchHomeContent();
  }, []);

  return (
    <div className="p-5">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-center mb-10">Welcome to Our Platform</h1>

      {/* Home Content Section */}
      <div className="flex flex-col md:flex-row items-center mb-10">
        {/* Left-side Text */}
        <div className="md:w-1/2 p-5">
          <h2 className="text-3xl font-bold mb-3">{homeContent.heading}</h2>
          <p className="text-lg">{homeContent.subheading}</p>
        </div>

        {/* Right-side Image */}
        <div className="md:w-1/2 p-5">
          <img src={homeContent.imageUrl} alt="Homepage Visual" className="w-full rounded-lg shadow-md" />
        </div>
      </div>

      {/* Carousel Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-center mb-5">Our Achievements</h2>
        <CarouselBox />
      </div>
    </div>
  );
}

export default Home;
