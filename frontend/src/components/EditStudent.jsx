import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditStudent.css";

const EditStudent = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/student/${id}`);
        const data = await response.json();

        if (data.success && data.student) {
          setName(data.student.name);
          setAge(data.student.age);
        } else {
          alert("Student not found!");
          navigate("/students");
        }
      } catch (error) {
        console.error("Error fetching student:", error);
        alert("Error loading student data.");
        navigate("/students");
      }
    };

    fetchStudent();
  }, [id, navigate]);

  
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/student/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Student updated successfully!");
        navigate("/students");
      } else {
        alert("Failed to update student.");
      }
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Error updating student data.");
    }
  };

  return (
    <div className="edit-student-container">
      <h1 className="edit-title">Edit Student</h1>
      <form className="edit-form" onSubmit={handleUpdate}>
        <label className="input-label">Name:</label>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
          required
        />

        <label className="input-label">Age:</label>
        <input
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="input-field"
          required
        />

        <button type="submit" className="update-btn">
          Update Student
        </button>
        <button onClick={()=> navigate("/students")}>Cancel</button>
      </form>
    </div>
  );
};

export default EditStudent;