import React from "react";
import { useNavigate } from 'react-router-dom';
//import PropTypes from "prop-types";
//import "./TripCard.css"; 

const TripCard = ({ tripId, title, imageURL, startDate, endDate, price }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/trips/${tripId}`);
  };

  return (
    <div className="card mb-3 p-0" style={{maxWidth: '540px', height: '120px', cursor: 'pointer'}} onClick={handleCardClick}>
        <div className="row g-0" >
            <div className="col-md-4">
              <img src={imageURL} style={{height: '120px'}}
                  className="img-fluid rounded-start" alt="..."/>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text"><small className="text-muted">{new Date(startDate).toLocaleDateString('en-GB')} - {new Date(endDate).toLocaleDateString('en-GB')}</small></p>
                  <p className="card-text text-success"><strong>${price}</strong></p>
              </div>
            </div>
        </div>
    </div>
  );
};

// TripCard.propTypes = {
//   title: PropTypes.string.isRequired,
//   startDate: PropTypes.string.isRequired,
//   endDate: PropTypes.string.isRequired,
// };

export default TripCard;