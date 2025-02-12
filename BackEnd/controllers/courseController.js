import Course from '../models/Course.js';
import User from '../models/User.js';


export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { title, description, price, instructor } = req.body;
    const newCourse = new Course({ title, description, price, instructor });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
};
export const updateCourse = async (req, res) => {
  try {
    const { title, description, price, instructor } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    course.title = title;
    course.description = description;
    course.price = price;
    course.instructor = instructor;
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course' });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
};

export const getPaidCourses = async (req, res) => {
try {
  const courses = await Course.find();
  const studentsPaid = {};
  for (const course of courses) {
    const studentCount = await User.countDocuments({ paidCourses: course._id });
    studentsPaid[course._id] = studentCount;
  }
  res.json(studentsPaid);
  
} catch (error) {
  res.status(500).json({ error: 'Failed to fetch paid courses' });
  
}
};