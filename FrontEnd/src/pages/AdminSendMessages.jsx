// import { useState } from "react";
// import API from "../api/api";

// const AdminSendMessages = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [videoUrl, setVideoUrl] = useState("");

//   const handleSendMessages = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post("/messages/send-messages", { title, description, videoUrl });
//       alert("Messages sent successfully!");
//       setTitle("");
//       setDescription("");
//       setVideoUrl("");
//     } catch (error) {
//       console.error("Error sending messages:", error);
//       alert("Failed to send messages.");
//     }
//   };

//   return (
//     <div className="p-5">
//       <h1 className="text-2xl font-bold mb-5">Send Messages to Subscribers</h1>
//       <form onSubmit={handleSendMessages}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-2 my-2 border rounded"
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full p-2 my-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Video URL"
//           value={videoUrl}
//           onChange={(e) => setVideoUrl(e.target.value)}
//           className="w-full p-2 my-2 border rounded"
//           required
//         />
//         <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded">
//           Send Messages
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminSendMessages;
import { useState, useEffect } from "react";
import API from "../api/api";

const AdminSendMessages = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [subscribedUsers, setSubscribedUsers] = useState([]);
  const [showEmails, setShowEmails] = useState(false); // Toggle email visibility

  useEffect(() => {
    // Fetch subscribed users when the component mounts
    const fetchSubscribedUsers = async () => {
      try {
        const { data } = await API.get("/messages/subscribed-users"); // API endpoint to get subscribed users
        setSubscribedUsers(data);
      } catch (error) {
        console.error("Error fetching subscribed users:", error);
      }
    };

    fetchSubscribedUsers();
  }, []);

  const handleSendMessages = async (e) => {
    e.preventDefault();
    try {
      await API.post("/messages/send-messages", { title, description, videoUrl });
      alert("Messages sent successfully!");
      setTitle("");
      setDescription("");
      setVideoUrl("");
    } catch (error) {
      console.error("Error sending messages:", error);
      alert("Failed to send messages.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Send Messages to Subscribers</h1>

      {/* Display the number of subscribers */}
      <p className="mb-3 text-lg font-semibold">
        Total Subscribers: {subscribedUsers.length}
      </p>

      {/* Button to toggle email visibility */}
      <button
        className="bg-gray-500 text-white px-3 py-2 rounded mb-5"
        onClick={() => setShowEmails(!showEmails)}
      >
        {showEmails ? "Hide Emails" : "View All Emails"}
      </button>

      {/* Conditionally display emails */}
      {showEmails && (
        <div className="bg-gray-100 p-3 rounded mb-5">
          <h2 className="text-xl font-semibold mb-2">Subscribed Emails:</h2>
          <ul className="list-disc list-inside">
            {subscribedUsers.map((user) => (
              <li key={user._id}>{user.email}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Form to send messages */}
      <form onSubmit={handleSendMessages}>
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
          placeholder="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full p-2 my-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded">
          Send Messages
        </button>
      </form>
    </div>
  );
};

export default AdminSendMessages;
