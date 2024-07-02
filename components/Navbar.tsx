import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const router = useRouter();
  const {isAuthenticated, logout} = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">CatFacts</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" href="/">Home</Link>
              </li>
              {!isAuthenticated && 
              <li className="nav-item">
                <Link className="nav-link" href="/register">Register</Link>
              </li>
              }
              {!isAuthenticated && 
              <li className="nav-item">
                <Link className='nav-link' href="/login">Login</Link>
              </li>
              }
              {isAuthenticated && 
              <li>
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
              </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
