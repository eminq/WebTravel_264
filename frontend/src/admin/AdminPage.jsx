import React, { useState, useEffect } from 'react';
import service from '../service';
import UserCard from './UserCard';

const AdminPage = () => {
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await service.loadUsers();
      setUsers(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    // Fetch users from the server

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    setUser(user);

    fetchUsers();

  }, []);

  const handleStatusChange = () => {

    fetchUsers();
    // setUsers((prevUsers) =>
    //   prevUsers.map((user) =>
    //     user._id === userId ? { ...user, status: newStatus } : user
    //   )
    // );
  };

  return (
    <div className="container mt-3 mb-5">

        { user && user.role != 1 && 
        <div className="text-center">
            <h3 className="display-6">You don't have permission to access this page!</h3>
        </div>
        }

        { user && user.role === 1 &&
        <>
            <h2>Administration</h2>

            {users.map((user) => (
                <div className="my-3 w-50 border border-2 rounded">
                <UserCard
                    key={user._id}
                    user={user}
                    onStatusChange={handleStatusChange}
                />
                </div>
            ))}
        </>
        }

    </div>
  );
};

export default AdminPage;
