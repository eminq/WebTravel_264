import React, { useState, useEffect } from "react";
import moment from "moment";
import service from "../service";

const ReviewCard = ({ id, user, date, text, deleteReview }) => {
  const [currUser,setCurrUser] = useState();

  useEffect(() => {

    const storedUser = localStorage.getItem('user');
    const curruser = storedUser ? JSON.parse(storedUser) : null;
    setCurrUser(curruser);

  }, []);

  const handleDelete = () => {
    deleteReview(id);
  }
  return (
    <div className="card mb-3">
      <div className="card-header d-flex justify-content-between">
        <span className="text-muted">{user.username}</span>
        <span className="text-muted">{moment(date).format('MMMM D, YYYY')}</span>
      </div>
      <div className="card-body">
        <p className="card-text">{text}</p> 
      </div>
      {currUser && currUser.role === 1 &&
      <div className="card-body">
        <button className="btn btn-link " onClick={handleDelete}>Delete</button> 
      </div> }
    </div>
  );
};


export default ReviewCard;