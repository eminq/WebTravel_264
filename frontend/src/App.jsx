import { useState, useEffect } from 'react'
import './App.css'
import TripsOverview from './trips/TripsOverview'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './partials/navbar';
import Footer from './partials/footer';
import TripDetailsPage from './trips/TripDetailsPage';
import AddTrip from './trips/AddTrip';
import EditTrip from './trips/EditTrip';
import BookedTrips from './trips/BookedTrips';
import Login from './auth/Login';
import AdminPage from './admin/AdminPage';
import Registration from './auth/Registration';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    setUser(parsedUser);
  }, []);

  return (
    <>
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={ <TripsOverview />} />
        <Route path="/trips/:tripId" element={<TripDetailsPage />} />
        <Route path="/trips/add" element={<AddTrip />} />
        <Route path="/trips/edit/:tripId" element={<EditTrip />} />
        <Route path="/trips/booked" element={<BookedTrips />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/administration" element={<AdminPage />} />
        </Routes> 
        <Footer />
    </Router>
    
    </>
  )
}

export default App
