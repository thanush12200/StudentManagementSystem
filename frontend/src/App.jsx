import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [students] = useState([
    { id: 1, name: 'Thanush', age: 21 },
    { id: 2, name: 'Pragna', age: 20 },
    { id: 3, name: 'Swaroopa', age: 17 },
    { id: 4, name: 'HariShankar', age: 22 }
  ]);

  return (
    <div className="App">
      <h1>Student Table</h1>
      <div className='table'> 
      <table border="1" cellPadding='8' >
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
  )
}

export default App