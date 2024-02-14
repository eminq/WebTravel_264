import { disconnect } from 'mongoose';
import React, { useState, useEffect } from 'react';

const ReviewCardAdd = ({ tripId, addReview }) => {
  const [user, setUser] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    setUser(user);

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      user: user._id,
      date: new Date(),
      text,
    };

    addReview(tripId,newReview);

    setText('');
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Add a Review</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea className="form-control" id="text" value={text} onChange={(e) => setText(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-outline-secondary">Submit Review</button>
        </form>
      </div>
    </div>
  );
};


export default ReviewCardAdd;