import React, { useState } from 'react';
import axios from 'axios';

function CreateExample() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new example object
    const newExample = {
      name: name,
      description: description,
      date: date,
    };

    // Send a POST request to the server to add a new example
    axios.post('http://localhost:5001/examples/add', newExample)
      .then(response => {
        console.log(response.data);
        // Optionally, you can redirect the user to another page or perform additional actions
      })
      .catch(error => {
        console.error('Error adding example:', error);
      });
  };

  return (
    <div>
      <h3>Create Example</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" required className="form-control" value={name} onChange={handleNameChange} />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea required className="form-control" value={description} onChange={handleDescriptionChange} />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input type="date" required className="form-control" value={date} onChange={handleDateChange} />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Create Example</button>
        </div>
      </form>
    </div>
  );
}

export default CreateExample;
