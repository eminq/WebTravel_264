import React from "react";
import TripCard from "./TripCard";
import service from "../service";
import { useState, useEffect } from "react";

const TripsOverview = () => {

  const [user, setUser] = useState({});

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [trips, setTrips] = useState([]);

  useEffect(() => {
    (async () => setTrips(await service.loadTrips()))();
    
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


  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };



  const filteredTrips = selectedCategory
  ? trips.filter((trip) => trip.categories.includes(selectedCategory))
  : trips;

  return (
    <div className="container mt-2 mb-5">
      <div className="d-flex justify-content-start m-2">
        <div className="btn-group">
          <button 
            type="button"
            className={`btn ${selectedCategory === '' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => handleCategoryClick('')}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              type="button"
              className={`btn ${selectedCategory === category._id ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => handleCategoryClick(category._id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
        {filteredTrips.map((trip, index) => (
            <TripCard
            key={index}
            tripId={trip._id}
            title={trip.title}
            imageURL={trip.imageURL}
            startDate={trip.startDate}
            endDate={trip.endDate}
            price={trip.price}
            />
            
        ))}
      </div>
  );
};

export default TripsOverview;
