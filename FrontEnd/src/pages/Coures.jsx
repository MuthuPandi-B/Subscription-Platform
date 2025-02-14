import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

function Courses() {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [instructor, setInstructor] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null); // Track selected course for updates
  const [paidCourses, setPaidCourses] = useState([]); // Track paid courses
  const [studentsPaid, setStudentsPaid] = useState({}); // Track number of students per course

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await API.get("/courses");
        setCourses(data);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching courses");
      }
    };

    const fetchPaidCourses = async () => {
      try {
        const { data } = await API.get("/auth/get-paid-courses");
        if (data.paidCourses) {
          setPaidCourses(data.paidCourses.map((course) => course._id));
        }
      } catch (err) {
        console.error("Error fetching paid courses:", err);
      }
    };

    const fetchStudentsPaid = async () => {
      try {
        const { data } = await API.get("courses/admin/students-paid"); // Endpoint to fetch students per course
        setStudentsPaid(data || {});
      } catch (err) {
        console.error("Error fetching students paid count:", err);
      }
    };

    fetchCourses();
    fetchPaidCourses();
    if (role === "admin") {
      fetchStudentsPaid();
    }
  }, [role]);

  const handleCreateCourse = () => {
    setIsFormOpen(true);
    setSelectedCourseId(null); // Reset for new course
    setTitle("");
    setDescription("");
    setInstructor("");
    setPrice(0);
  };

  const handleEditCourse = (course) => {
    setIsFormOpen(true);
    setSelectedCourseId(course._id);
    setTitle(course.title);
    setDescription(course.description);
    setInstructor(course.instructor || "");
    setPrice(course.price);
  };

  const submitCourse = async (e) => {
    e.preventDefault();
    if (selectedCourseId) {
      // Update course
      try {
        const { data } = await API.put(`/courses/${selectedCourseId}`, {
          title,
          description,
          price,
          instructor,
        });
        setCourses(
          courses.map((course) =>
            course._id === selectedCourseId ? data : course
          )
        );
        setIsFormOpen(false);
      } catch (err) {
        setError(err.response?.data?.error || "Error updating course");
      }
    } else {
      // Create new course
      try {
        const { data } = await API.post("/courses", {
          title,
          description,
          price,
          instructor,
        });
        setCourses([...courses, data]);
        setIsFormOpen(false);
      } catch (err) {
        setError(err.response?.data?.error || "Error creating course");
      }
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      await API.delete(`/courses/${courseId}`);
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (err) {
      setError(err.response?.data?.error || "Error deleting course");
    }
  };

  const handlePayment = async (course) => {
    try {
      const { data } = await API.post("/payment/create-order", {
        amount: course.price,
        currency: "INR",
      });

      if (!data.success) {
        throw new Error("Payment order creation failed");
      }

      const options = {
        key: "rzp_test_omV4sjUn30W0Mm",
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        name: "Learning Platform",
        description: "Course Purchase",
        handler: async function (response) {
          try {
            const verifyResponse = await API.post("/payment/verify", {
              paymentType: "course",
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: course._id,
            });

            if (verifyResponse.data.success) {
              await API.post("/auth/add-paid-course", { courseId: course._id });

              setPaidCourses((prevPaidCourses) => [
                ...prevPaidCourses,
                course._id,
              ]);
            } else {
              alert("Payment verification failed!");
            }
          } catch (error) {
            console.error("Error verifying payment or adding course:", error);
            alert("An error occurred during payment verification!");
          }
        },
        prefill: {
          email: "test@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error.message);
      alert("Payment process failed!");
    }
  };

  const handleViewCourse = (courseId) => {
    navigate(`/view-course/${courseId}`); // Redirect to course details page
  };
  const handleManageVideos = (courseId) => {
    navigate(`/manage-videos/${courseId}`); // Redirect to course details page
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Available Courses</h1>

      {role === "admin" && (
        <button
          onClick={handleCreateCourse}
          className="bg-blue-500 text-white px-5 py-2 my-3"
        >
          Create Course
        </button>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {isFormOpen && role === "admin" && (
        <div className="border p-5 my-3 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-bold">
            {selectedCourseId ? "Update Course" : "Create New Course"}
          </h2>
          <form onSubmit={submitCourse}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 my-2 border rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 my-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Instructor"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="w-full p-2 my-2 border rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-2 my-2 border rounded"
              required
            />
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-500 text-white px-5 py-2 rounded"
              >
                {selectedCourseId ? "Update" : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="bg-gray-500 text-white px-5 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {courses.map((course) => (
        <div key={course._id} className="border p-3 my-3">
          <h2 className="text-xl font-bold">{course.title}</h2>
          <p>{course.description}</p>
          <p className="font-bold">Price: ₹{course.price}</p>
          {role === "admin" && (
            <p className="text-sm text-gray-600">
              Students Enrolled: {studentsPaid[course._id] || 0}
            </p>
          )}

          {role !== "admin" && !paidCourses.includes(course._id) && (
            <button
              onClick={() => handlePayment(course)}
              className="bg-green-500 text-white px-5 py-2 my-3"
            >
              Pay ₹{course.price}
            </button>
          )}
          {role !== "admin" && paidCourses.includes(course._id) && (
            <button
              onClick={() => handleViewCourse(course._id)}
              className="bg-blue-500 text-white px-5 py-2 my-3"
            >
              View Course
            </button>
          )}
          {role === "admin" && (
            <>
              <button
                onClick={() => handleEditCourse(course)}
                className="bg-blue-500 text-white px-5 py-2 my-3 mr-3"
              >
                Edit Course
              </button>
              <button onClick={() => handleManageVideos(course._id)}
                className="bg-yellow-500 text-white px-5 py-2 my-3 mx-3">
                Manage Videos
              </button>
              <button
                onClick={() => deleteCourse(course._id)}
                className="bg-red-500 text-white px-5 py-2 my-3 mx-3"
              >
                Delete Course
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Courses;
