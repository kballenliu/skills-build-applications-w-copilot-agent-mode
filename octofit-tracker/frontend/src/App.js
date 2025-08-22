import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

// Import logo
import octofitLogo from './assets/octofitapp-small.png';

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
    <nav className="navbar navbar-expand-lg navbar-dark shadow-custom">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <img src={octofitLogo} alt="OctoFit Logo" />
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
          <div className="hero-section fade-in">
            <h1 className="display-4 fw-bold mb-4">
              Welcome to OctoFit Tracker
            </h1>
            <p className="lead mb-4" style={{color: '#64748b'}}>
              Your ultimate fitness companion for tracking activities, competing with teams, 
              and achieving your health goals together.
            </p>
            
            <div className="row g-4 mt-5">
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-custom slide-in">
                  <div className="card-body text-center">
                    <i className="bi bi-activity text-gradient" style={{fontSize: '4rem'}}></i>
                    <h5 className="card-title mt-3 fw-bold">Track Activities</h5>
                    <p className="card-text text-muted">
                      Log your workouts and monitor your progress with detailed analytics
                    </p>
                    <Link to="/activities" className="btn btn-primary btn-lg">
                      <i className="bi bi-arrow-right me-2"></i>
                      View Activities
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-custom slide-in" style={{animationDelay: '0.1s'}}>
                  <div className="card-body text-center">
                    <i className="bi bi-trophy" style={{fontSize: '4rem', color: '#f59e0b'}}></i>
                    <h5 className="card-title mt-3 fw-bold">Compete</h5>
                    <p className="card-text text-muted">
                      Challenge friends and climb the leaderboard to become the champion
                    </p>
                    <Link to="/leaderboard" className="btn btn-warning btn-lg">
                      <i className="bi bi-trophy me-2"></i>
                      View Leaderboard
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-custom slide-in" style={{animationDelay: '0.2s'}}>
                  <div className="card-body text-center">
                    <i className="bi bi-people" style={{fontSize: '4rem', color: '#10b981'}}></i>
                    <h5 className="card-title mt-3 fw-bold">Join Teams</h5>
                    <p className="card-text text-muted">
                      Create or join fitness teams for motivation and group challenges
                    </p>
                    <Link to="/teams" className="btn btn-success btn-lg">
                      <i className="bi bi-people me-2"></i>
                      Explore Teams
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-custom slide-in" style={{animationDelay: '0.3s'}}>
                  <div className="card-body text-center">
                    <i className="bi bi-heart-pulse" style={{fontSize: '4rem', color: '#ef4444'}}></i>
                    <h5 className="card-title mt-3 fw-bold">Get Workouts</h5>
                    <p className="card-text text-muted">
                      Discover personalized workout suggestions tailored to your goals
                    </p>
                    <Link to="/workouts" className="btn btn-danger btn-lg">
                      <i className="bi bi-play-circle me-2"></i>
                      Browse Workouts
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4">
              <div className="row text-center">
                <div className="col-md-4">
                  <div className="d-flex flex-column align-items-center">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3" 
                         style={{width: '80px', height: '80px'}}>
                      <i className="bi bi-graph-up text-white" style={{fontSize: '2rem'}}></i>
                    </div>
                    <h6 className="fw-bold">Track Progress</h6>
                    <p className="text-muted small">Monitor your fitness journey with detailed stats</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex flex-column align-items-center">
                    <div className="bg-success rounded-circle d-flex align-items-center justify-content-center mb-3" 
                         style={{width: '80px', height: '80px'}}>
                      <i className="bi bi-award text-white" style={{fontSize: '2rem'}}></i>
                    </div>
                    <h6 className="fw-bold">Earn Achievements</h6>
                    <p className="text-muted small">Unlock badges and celebrate milestones</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex flex-column align-items-center">
                    <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center mb-3" 
                         style={{width: '80px', height: '80px'}}>
                      <i className="bi bi-lightning text-white" style={{fontSize: '2rem'}}></i>
                    </div>
                    <h6 className="fw-bold">Stay Motivated</h6>
                    <p className="text-muted small">Get inspired by your team and community</p>
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
        
        <footer className="py-5 mt-5">
          <div className="container text-center">
            <div className="row">
              <div className="col-md-12">
                <img src={octofitLogo} alt="OctoFit Logo" style={{height: '32px', marginBottom: '1rem'}} />
                <p className="mb-2 fw-bold" style={{color: 'rgba(255, 255, 255, 0.9)'}}>
                  OctoFit Tracker
                </p>
                <p className="text-muted mb-3">
                  Empowering your fitness journey through technology and community
                </p>
                <div className="d-flex justify-content-center gap-3 mb-3">
                  <button className="btn btn-link text-white-50 p-0">
                    <i className="bi bi-github fs-4"></i>
                  </button>
                  <button className="btn btn-link text-white-50 p-0">
                    <i className="bi bi-twitter fs-4"></i>
                  </button>
                  <button className="btn btn-link text-white-50 p-0">
                    <i className="bi bi-linkedin fs-4"></i>
                  </button>
                </div>
                <hr style={{color: 'rgba(255, 255, 255, 0.2)'}} />
                <p className="text-muted mb-0 small">
                  &copy; 2025 OctoFit Tracker. Built with React & Django REST Framework.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
