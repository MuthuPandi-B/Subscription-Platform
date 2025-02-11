import { useState, useEffect, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";


function Courses() {
  const { role } = useContext(AuthContext);

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await API.get("/courses");
        setCourses(data);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching courses");
      }
    };

    fetchCourses();
  }, []);

  const handleCreateCourse = () => {
    setIsFormOpen(true);
  };

  const submitCourse = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/courses", { title, description, price });
      setCourses([...courses, data]);
      setIsFormOpen(false);
      setTitle("");
      setDescription("");
      setPrice(0);
    } catch (err) {
      setError(err.response?.data?.error || "Error creating course");
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

  const handlePayment = async (coursePrice) => {
    try {
      const { data } = await API.post("/payment/create-order", { amount: coursePrice, currency: "INR" });
      
      if (!data.success) {
        throw new Error("Payment order creation failed");
      }
      
      const options = {
        key:"rzp_test_omV4sjUn30W0Mm",
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        name: "Your App Name",
        description: "Course Purchase",
        handler: function (response) {
          console.log("Payment Successful!", response);
          alert("Payment Successful!");
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
    }
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
          <h2 className="text-xl font-bold">Create New Course</h2>
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
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-2 my-2 border rounded"
              required
            />
            <div className="flex gap-3">
              <button type="submit" className="bg-green-500 text-white px-5 py-2 rounded">
                Submit
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
          <button 
            onClick={() => handlePayment(course.price)}
            className="bg-green-500 text-white px-5 py-2 my-3"
          >
            Pay ₹{course.price}
          </button>
          {role === "admin" && (
            <button 
              onClick={() => deleteCourse(course._id)} 
              className="bg-red-500 text-white px-5 py-2 my-3"
            >
              Delete Course
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Courses;