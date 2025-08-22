import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

// Import components
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-activity me-2"></i>
          OctoFit Tracker
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={isActive('/activities')} to="/activities">
                <i className="bi bi-list-ul me-1"></i>
                Activities
              </Link>
            </li>
            <li className="nav-item">
              <Link className={isActive('/leaderboard')} to="/leaderboard">
                <i className="bi bi-trophy me-1"></i>
                Leaderboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className={isActive('/teams')} to="/teams">
                <i className="bi bi-people me-1"></i>
                Teams
              </Link>
            </li>
            <li className="nav-item">
              <Link className={isActive('/users')} to="/users">
                <i className="bi bi-person me-1"></i>
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link className={isActive('/workouts')} to="/workouts">
                <i className="bi bi-heart-pulse me-1"></i>
                Workouts
              </Link>
            </li>
          </ul>
          
          <div className="navbar-nav">
            <button className="btn btn-outline-light me-2">
              <i className="bi bi-person-circle me-1"></i>
              Profile
            </button>
            <button className="btn btn-light">
              <i className="bi bi-box-arrow-right me-1"></i>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          <div className="hero-section">
            <h1 className="display-4 fw-bold text-primary mb-4">
              Welcome to OctoFit Tracker
            </h1>
            <p className="lead text-muted mb-4">
              Your ultimate fitness companion for tracking activities, competing with teams, 
              and achieving your health goals together.
            </p>
            
            <div className="row g-4 mt-5">
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-activity text-primary" style={{fontSize: '3rem'}}></i>
                    <h5 className="card-title mt-3">Track Activities</h5>
                    <p className="card-text text-muted">
                      Log your workouts and monitor your progress
                    </p>
                    <Link to="/activities" className="btn btn-primary">
                      View Activities
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-trophy text-warning" style={{fontSize: '3rem'}}></i>
                    <h5 className="card-title mt-3">Compete</h5>
                    <p className="card-text text-muted">
                      Challenge friends and climb the leaderboard
                    </p>
                    <Link to="/leaderboard" className="btn btn-warning">
                      View Leaderboard
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-people text-success" style={{fontSize: '3rem'}}></i>
                    <h5 className="card-title mt-3">Join Teams</h5>
                    <p className="card-text text-muted">
                      Create or join fitness teams for motivation
                    </p>
                    <Link to="/teams" className="btn btn-success">
                      Explore Teams
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-heart-pulse text-danger" style={{fontSize: '3rem'}}></i>
                    <h5 className="card-title mt-3">Get Workouts</h5>
                    <p className="card-text text-muted">
                      Discover personalized workout suggestions
                    </p>
                    <Link to="/workouts" className="btn btn-danger">
                      Browse Workouts
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
        
        <footer className="bg-light py-4 mt-5">
          <div className="container text-center">
            <p className="text-muted mb-0">
              &copy; 2025 OctoFit Tracker. Built with React & Django REST Framework.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
