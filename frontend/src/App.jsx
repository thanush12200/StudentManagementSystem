import "./App.css";

function App() {
  const students = [
    { id: 1, name: "Thanush", age: 21 },
    { id: 2, name: "Pragna", age: 20 },
    { id: 3, name: "Swaroopa", age: 19 },
    { id: 4, name: "Harishankar", age: 22 },
  ];

  return (
    <div className="app-container">
      <div className="card">
        <div className="header">
          <h1>Student List</h1>
          <button className="create-student">Create Student</button>
        </div>

        <div className="table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;