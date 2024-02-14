import React from "react";
import TripCard from "./TripCard";
import service from "../service";
import { useState, useEffect } from "react";

const BookedTrips = () => {

  const [user, setUser] = useState();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    (async () => setTrips(await service.loadTrips()))();

    const storedUser = localStorage.getItem('user');
    const userr = storedUser ? JSON.parse(storedUser) : null;
    setUser(userr);

  }, []);

  const filteredTrips = user
  ? trips.filter((trip) => trip.travelers.includes(user._id))
  : trips;

  const archivedTrips = filteredTrips.filter((trip) => new Date(trip.endDate) < new Date());
  const bookedTrips = filteredTrips.filter((trip) => new Date(trip.startDate) > new Date());

  return (
    <div className="container my-5">
        <h4 className="fs-4 mb-3">Trips you have booked</h4>
        <div className="mb-5">
            {bookedTrips.map((trip, index) => (
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
        <h6 className="fs-6 mb-2">Trips you have been on</h6>
        <div className="mb-5">
            {archivedTrips.map((trip, index) => (
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
    </div>
  );
};

export default BookedTrips;
