import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import moment from 'moment'; 
import service from '../service';
import ReviewCard from '../reviews/reviewCard';
import ReviewCardAdd from '../reviews/reviewCardAdd';
import { useNavigate } from 'react-router-dom';

const TripDetailsPage = () => {
  const navigate = useNavigate();
  const { tripId } = useParams(); 
  const [trip, setTrip] = useState(null);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    
    fetchTripDetails();

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    setUser(user);

  }, []);

  const fetchTripDetails = async () => {
    try {
      const trip = await service.getTripById(tripId);
      console.log('Trip: ', trip);
      setTrip(trip);
      setComments(trip.comments);
  
    } catch (error) {
      console.error('Error fetching trip details:', error);
    }
  };

  const addReview = async(tripId, review) => {
    console.log('Form data submitted:', tripId, review);

    await service.addComment(tripId, review);

    fetchTripDetails();
  };

  const deleteReview = async(id) => {
    await service.deleteComment(id, tripId);
    fetchTripDetails();
  }

  const deleteTrip = async() => {
    const confirmed = window.confirm('Are you sure you want to delete this trip?');

    if (confirmed) {
      try {
        await service.deleteTrip(tripId);
        navigate('/');
      } catch (error) {
        console.error('Error deleting trip:', error);
      }
    }
  
  }

  const bookTrip = async() => {
    const confirmed = window.confirm('Are you sure you want to book this trip?');

    if (confirmed) {
      try {
        await service.bookTrip(user._id, tripId);
        navigate('/trips/booked');
      } catch (error) {
        console.error('Error booking trip:', error);
      }
    }
  
  }

  const handleEdit = async() => {
    navigate(`/trips/edit/${tripId}`);
  }

  // const tripComments = comments.filter(c => trip.comments.includes(c._id));

  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5"> 
      <h2 className="mb-4">{trip.title}</h2>
      <div className="row"  style={{ height:"550px" }}>
        <div className="col-md-8">
          <img src={trip.imageURL} alt={trip.title} className="img-fluid mb-3" style={{height:"500px"}} />
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Trip Details</h5>
              <hr />
              <p className="card-text"><strong>Description:</strong> {trip.description}</p>
              <p className="card-text"><strong>Capacity:</strong> {trip.capacity} people</p>
              <p className="card-text"><strong>Start Date:</strong> {moment(trip.startDate).format('MMMM D, YYYY')}</p>
              <p className="card-text"><strong>End Date:</strong> {moment(trip.endDate).format('MMMM D, YYYY')}</p>
              <p className="card-text"><strong>Price per day: <span className="text-success fs-4">${trip.price}</span></strong></p>
            </div>
            <ul className="list-group list-group-flush">
                { user && 
                <li className="list-group-item">
                    <button onClick={bookTrip} className="btn btn-success w-100">Book</button>
                </li>
                }
                { user && user.role === 1 &&
                <li className="list-group-item">
                    <button onClick={deleteTrip} className="btn btn-sm btn-danger me-2">Delete</button>
                    <button onClick={handleEdit} className="btn btn-sm btn-info">Edit</button>
                </li> }
            </ul>
          </div>
        </div>
      </div>
      <div className="row mb-5 p-3">
        <div className="col-8 offset-2">
          { user &&
          <div>
              <ReviewCardAdd tripId={trip._id} addReview={addReview}/>
          </div> }
          <div style={{minHeight: "200px"}}>
              {comments.map((comment) => (
                  <ReviewCard 
                      key={comment._id} 
                      id={comment._id}
                      user={comment.user}
                      date={comment.date}
                      text={comment.text}
                      deleteReview={deleteReview}
                      />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsPage;
