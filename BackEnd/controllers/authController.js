import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';   
import { sendEmail } from '../config/emailService.js'; 

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send email with reset link or token
    const resetLink = `http://localhost:5173/reset-password/${token}`; // Replace with your frontend URL
    await sendEmail(
      email,
      "Password Reset Request",
      `You requested to reset your password. Click the link to reset it: ${resetLink}`
    );

    res.json({ message: "Password reset email sent successfully" });
  } catch (error) {

    res.status(500).json({ error: "Forgot password failed" });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ error: 'User not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: 'Password reset successfully' });
  } catch (error) {

    res.status(500).json({ error: 'Reset password failed' });
  }
};

export const addPaidCourse = async (userId, courseId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.paidCourses.push(courseId);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};  

export const getPaidCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("paidCourses");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ paidCourses: user.paidCourses });
  } catch (error) {
    console.error("Error fetching paid courses:", error);
    res.status(500).json({ error: "Failed to fetch paid courses" });
  }
};
