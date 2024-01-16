import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateArtist() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();

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

    const newArtist = {
      name: name,
      description: description,
      date: date,
    };

    axios.post('http://localhost:5001/artists/add', newArtist)
      .then(response => {
        console.log(response.data);
        // After successful submission, go back to the previous page
        navigate('/');
      })
      .catch(error => {
        console.error('Error adding artist:', error);
      });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div>
      <h3>Create Artist</h3>
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
          <button type="submit" className="btn btn-primary">Create Artist</button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default CreateArtist;
