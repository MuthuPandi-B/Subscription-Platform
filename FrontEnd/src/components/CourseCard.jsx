function CourseCard({ course }) {
    return (
      <div className="border p-3 my-3">
        <h2 className="text-xl font-bold">{course.title}</h2>
        <p>{course.description}</p>
        <p className="font-bold">Price: ₹{course.price}</p>
      </div>
    );
  }
  export default CourseCard;