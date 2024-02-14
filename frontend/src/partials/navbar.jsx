import React, { useEffect,useState } from 'react';


const Navbar = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    setUser(user);
    console.log(user)

  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Travel.com</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">Trips</a>
                </li>
                {user && 
                <li className="nav-item">
                    <a className="nav-link" href="/trips/booked">Booked trips</a>
                </li> }   
                {user && user.role === 1 &&
                <span className="d-flex">
                    <li className="nav-item">
                        <a className="nav-link" href="/trips/add">Add new trip</a>
                    </li> 
                    <li className="nav-item">
                        <a className="nav-link"  href="#">Administration</a>
                    </li> 
                </span>}
            </ul>
            </div>
            <div className="d-flex">
                { user && 
                <button className="nav-link ms-auto me-3" onClick={logout}>Logout</button> 
                 ||
                <div className="d-flex">
                <a className="nav-link ms-auto me-3" href="/login">Login</a> 
                <a className="nav-link ms-auto" href="#">Register</a>
                </div> }
            </div>
        </div>
    </nav> 
  );
};

export default Navbar;
