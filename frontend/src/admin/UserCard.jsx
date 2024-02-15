import React from 'react';
import service from '../service';

const UserCard = ({ user, onStatusChange }) => {

  const handleStatusChange = async (status) => {
    const data = {
        status : !user.status
    };
    try {
      await service.editUser(user._id, data);
      onStatusChange();
    } catch (error) {
      console.error('Error changing user status:', error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">User: {user._id}</h5>
        <p className="card-text mt-3">
          <strong>Username:</strong> {user.username}
        </p>
        <p className="card-text">
          <strong>Role:</strong> {user.role === 1 ? 'Admin' : 'User'}
        </p>
        <p className="card-text">
          <strong>Status:</strong> {user.status === 1 ? 'Active' : 'Deactivated'}
        </p>
        <button
          className={`btn ${user.status ? 'btn-danger' : 'btn-success'}`}
          onClick={handleStatusChange}
        >
          {user.status === 1 ? 'Deactivate' : 'Activate'}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
