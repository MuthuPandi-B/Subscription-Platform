
import SubscribedUser from "../models/SubscribedUser.js";
import { sendEmail } from "../config/emailService.js"; // Import your sendEmail function

export const sendMessageToSubscribers = async (req, res) => {
  try {
    const { title, description, videoUrl } = req.body;

    // Get all subscribed users
    const subscribedUsers = await SubscribedUser.find();
    const emailList = subscribedUsers.map((user) => user.email);

    // Send email to all subscribed users
    await Promise.all(
      emailList.map((email) =>
        sendEmail(
          email,
          title,
          `<p>${description}</p><p>Watch the video: <a href="${videoUrl}">${videoUrl}</a></p>`
        )
      )
    );

    res.json({ success: true, message: "Messages sent successfully" });
  } catch (error) {
    console.error("Failed to send messages:", error);
    res.status(500).json({ error: "Failed to send messages" });
  }
};


export const getSubscribedUsers = async (req, res) => {
  try {
    const subscribedUsers = await SubscribedUser.find();
    res.json(subscribedUsers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subscribed users" });
  }
};
