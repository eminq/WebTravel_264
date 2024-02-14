import { useState, useEffect } from 'react'
import './App.css'
import service from './service'
import TripsOverview from './trips/TripsOverview'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './partials/navbar';
import Footer from './partials/footer';
import TripDetailsPage from './trips/TripDetailsPage';
import AddTrip from './trips/AddTrip';
import EditTrip from './trips/EditTrip';
import BookedTrips from './trips/BookedTrips';
import Login from './auth/Login';

function App() {
  

  

  const editTrip = async(formData) => {
    // Handle the form submission logic here
    console.log('Form data submitted:', formData);

    //await service.addTrip(formData);
  };

  return (
    <>
    <Navbar />
    <Router>
      <Routes>
        <Route path="/" element={ <TripsOverview />} />
        <Route path="/trips/:tripId" element={<TripDetailsPage />} />
        <Route path="/trips/add" element={<AddTrip />} />
        <Route path="/trips/edit/:tripId" element={<EditTrip />} />
        <Route path="/trips/booked" element={<BookedTrips />} />
        <Route path="/login" element={<Login />} />
        </Routes> 
    </Router>
    <Footer />
    </>
  )
}

export default App
