// AddTripForm.jsx

import React, { useState, useEffect } from 'react';
import service from '../service';
import { useNavigate } from 'react-router-dom';

const AddTrip = ({ onSubmit }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageURL: '',
    price: '',
    capacity: '',
    startDate: '',
    endDate: '',
    categories: [],
  });

  useEffect(() => {

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    setUser(user);

    const fetchCategories = async () => {
      try {
        const response = await service.loadCategories();
        setCategories(response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();

  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (categoryId) => {
    const updatedCategories = formData.categories.includes(categoryId)
      ? formData.categories.filter((c) => c !== categoryId)
      : [...formData.categories, categoryId];

    setFormData({ ...formData, categories: updatedCategories });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formattedFormData = {
      ...formData,
      price: parseFloat(formData.price),
      capacity: parseInt(formData.capacity, 10),
    };

    console.log('Form data submitted:', formData);

    await service.addTrip(formData);

    navigate('/');
  };

  return (
    <div className="container mt-2 mb-5">
      <h2 className="mb-4 fs-4">Add New Trip</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="imageURL" className="form-label">Image URL</label>
          <input type="text" className="form-control" id="imageURL" name="imageURL" value={formData.imageURL} onChange={handleChange} />
        </div>
        
        <div className="d-flex justify-content-center w-100">
          <div className="mb-3 w-100 me-5">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="capacity" className="form-label">Capacity</label>
            <input type="number" className="form-control" id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} required />
          </div>
        </div>
        <div className="d-flex justify-content-center w-100">
          <div className="mb-3 w-100 me-5">
            <label htmlFor="startDate" className="form-label">Start Date</label>
            <input type="date" className="form-control" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required />
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="endDate" className="form-label">End Date</label>
            <input type="date" className="form-control" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} required />
          </div>
        </div>
        <div className="mb-2">
          <label className="form-label">Categories</label>
          <div>
            {categories.map((category) => (
              <div key={category._id} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={category._id}
                  value={category.name}
                  checked={formData.categories.includes(category._id)}
                  onChange={() => handleCheckboxChange(category._id)}
                />
                <label className="form-check-label" htmlFor={category._id}>
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddTrip;
