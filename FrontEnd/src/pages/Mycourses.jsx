import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function MyCourses() {
  const [paidCourses, setPaidCourses] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaidCourses = async () => {
      try {
        const { data } = await API.get("/auth/get-paid-courses");
        console.log("Fetched Paid Courses:", data.paidCourses); // Debug log
        if (data.paidCourses) {
          // Filter out duplicates
          const uniqueCourses = data.paidCourses.filter(
            (course, index, self) =>
              index === self.findIndex((c) => c._id === course._id)
          );
          setPaidCourses(uniqueCourses);
        }
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching paid courses");
      }
    };

    fetchPaidCourses();
  }, []);

  const handleViewCourse = (courseId) => {
    navigate(`/courses/${courseId}`); // Navigate to course details page
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">My Courses</h1>

      {error && <p className="text-red-500">{error}</p>}

      {paidCourses.length === 0 && (
        <p className="text-gray-500">You haven't purchased any courses yet.</p>
      )}

      {paidCourses.map((course) => (
        <div key={course._id} className="border p-3 my-3">
          <h2 className="text-xl font-bold">{course.title}</h2>
          <p>{course.description}</p>
          <button
            onClick={() => handleViewCourse(course._id)}
            className="bg-blue-500 text-white px-5 py-2 my-3"
          >
            View Course
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyCourses;
