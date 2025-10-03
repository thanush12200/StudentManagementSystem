import React, { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateStudent = () => {

    const [name,setName] = useState("");
    const [age,setAge] = useState("");
    const navigate = useNavigate();



    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log("name",name);
        console.log("age",age);
        const response = await fetch("http://localhost:3000/api/student",{
            method: "POST",
            headers: {
                "Content-Type":"application/json",

            },
            body: JSON.stringify({name,age}),

        })
        const data = await response.json();
        if (data.success) {
            alert("student created successfully");
            navigate("/students");
        }else{
            alert("failed to create student");
        }
    };

  return (
    <div>
    <h1>Create Student</h1>
    <form onSubmit = {handleSubmit}>
    <input type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)}/>
    <input type="number" placeholder='Age' value={age} onChange={(e) => setAge(e.target.value)}/>
    <button type='submit'>Create</button>
    </form>
    </div>
  )
}

export default CreateStudent;