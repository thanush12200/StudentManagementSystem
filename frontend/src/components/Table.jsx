import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

 
  async function fetchStudents() {
    try {
      const response = await fetch("http://localhost:3000/api/students");
      const data = await response.json();
      console.log("All students data:", data);
      setStudents(data.students || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }

  
  async function handleDelete(id) {
    try {
      if (window.confirm("Are you sure you want to delete this student?")) {
        const response = await fetch(`http://localhost:3000/api/students/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json(); 

        if (data.success) {
          window.alert("Student deleted successfully!");
          fetchStudents(); 
        } else {
          window.alert(data.message || "Failed to delete student.");
        }
      }
    } catch (error) {
      window.alert("Error deleting student.");
      console.error("Delete error:", error);
    }
  }

  
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="card student-card">
      <div
        className="cardheader"
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <h1 style={{ color: "#243046" }}>Students List</h1>
        <button
          className="create-student-btn"
          onClick={() => navigate("/create-student")}
        >
          Create Student
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td className="actions-cell">
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/edit-student/${student._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-students">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;