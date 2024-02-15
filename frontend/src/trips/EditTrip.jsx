import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import service from '../service';

const EditTrip = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [categories, setCategories] = useState([]);
  const [trip, setTrip] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    price: 0,
    capacity: 0,
    categories: [],
  });

  useEffect(() => {

    const storedUser = localStorage.getItem('user');
    const userr = storedUser ? JSON.parse(storedUser) : null;
    setUser(userr);

    const fetchTrip = async () => {
      try {
        const response = await service.getTripById(tripId); 
        setTrip(response);
      } catch (error) {
        console.error('Error fetching trip:', error);
      }
    };

    fetchTrip();

    const fetchCategories = async () => {
        try {
          const response = await service.loadCategories();
          setCategories(response);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
  
      fetchCategories();

  }, [tripId]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrip((prevTrip) => ({ ...prevTrip, [name]: value }));
  };

  const handleCheckboxChange = (categoryId) => {
    const updatedCategories = trip.categories.includes(categoryId)
      ? trip.categories.filter((c) => c !== categoryId)
      : [...trip.categories, categoryId];

    setTrip({ ...trip, categories: updatedCategories });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formattedTripData = {
      ...trip,
      price: parseFloat(trip.price),
      capacity: parseInt(trip.capacity, 10),
    };

    console.log('Form data submitted:', formattedTripData);

    await service.editTrip(tripId, formattedTripData);

    navigate(`/trips/${tripId}`);
  };


  return (
    <div className="container mt-2 mb-5">

      { user && user.role != 1 && 
        <div className="text-center">
            <h3 className="display-6">You don't have permission to access this page!</h3>
        </div>
      }

      { user && user.role === 1 && 
      <>
        <h2>Edit Trip</h2>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={trip.title} onChange={handleInputChange} />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name="description" value={trip.description} onChange={handleInputChange}></textarea>
          </div>

          <div className="d-flex justify-content-center w-100">
              {/* Start Date */}
              <div className="mb-3 w-100 me-5">
              <label htmlFor="startDate" className="form-label">Start Date</label>
              <input type="date" className="form-control" id="startDate" name="startDate" value={trip.startDate} onChange={handleInputChange} />
              </div>

              {/* End Date */}
              <div className="mb-3 w-100">
              <label htmlFor="endDate" className="form-label">End Date</label>
              <input type="date" className="form-control" id="endDate" name="endDate" value={trip.endDate} onChange={handleInputChange} />
              </div>
          </div>

          <div className="d-flex justify-content-center w-100">
              {/* Price */}
              <div className="mb-3 w-100 me-5">
              <label htmlFor="price" className="form-label">Price</label>
              <input type="number" className="form-control" id="price" name="price" value={trip.price} onChange={handleInputChange} />
              </div>

              {/* Capacity */}
              <div className="mb-3 w-100">
              <label htmlFor="capacity" className="form-label">Capacity</label>
              <input type="number" className="form-control" id="capacity" name="capacity" value={trip.capacity} onChange={handleInputChange} />
              </div>
          </div>

          {/* Categories */}
          <div className="mb-2">
              {categories.map((category) => (
                <div key={category._id} className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={category._id}
                    value={category.name}
                    checked={trip.categories.includes(category._id)}
                    onChange={() => handleCheckboxChange(category._id)}
                  />
                  <label className="form-check-label" htmlFor={category._id}>
                    {category.name}
                  </label>
                </div>
              ))}
            </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </>
      }
    </div>
  );
};

export default EditTrip;
