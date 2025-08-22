import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
        console.log('Fetching workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const getDifficultyBadge = (difficulty) => {
    const badgeMap = {
      'easy': 'bg-success',
      'medium': 'bg-warning',
      'hard': 'bg-danger',
      'beginner': 'bg-success',
      'intermediate': 'bg-warning',
      'advanced': 'bg-danger'
    };
    return badgeMap[difficulty?.toLowerCase()] || 'bg-secondary';
  };

  if (loading) return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading workouts...</span>
        </div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-5 fw-bold text-primary">Workouts</h1>
        <button className="btn btn-success btn-lg">
          <i className="bi bi-plus-circle me-2"></i>Create Workout
        </button>
      </div>
      
      {workouts.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">No Workouts Found</h4>
          <p>No workout suggestions are currently available. Check back later or create your own!</p>
        </div>
      ) : (
        <div className="row g-4">
          {workouts.map((workout) => (
            <div key={workout.id} className="col-md-6 col-xl-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-header bg-gradient bg-primary text-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">{workout.name || workout.title || 'Unnamed Workout'}</h5>
                    <span className={`badge ${getDifficultyBadge(workout.difficulty)}`}>
                      {workout.difficulty || 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted">
                    {workout.description || 'No description available'}
                  </p>
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-clock text-primary me-2"></i>
                        <div>
                          <small className="text-muted d-block">Duration</small>
                          <strong>{workout.duration || workout.estimated_duration || 'N/A'} min</strong>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-fire text-danger me-2"></i>
                        <div>
                          <small className="text-muted d-block">Calories</small>
                          <strong>{workout.estimated_calories || workout.calories || 'N/A'}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {workout.exercises && workout.exercises.length > 0 && (
                    <div className="mt-3">
                      <h6 className="text-primary">Exercises:</h6>
                      <ul className="list-unstyled">
                        {workout.exercises.slice(0, 3).map((exercise, index) => (
                          <li key={index} className="small text-muted">
                            • {exercise.name || exercise}
                          </li>
                        ))}
                        {workout.exercises.length > 3 && (
                          <li className="small text-muted">
                            • And {workout.exercises.length - 3} more...
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="card-footer bg-transparent">
                  <div className="btn-group w-100" role="group">
                    <button className="btn btn-outline-primary btn-sm">View Details</button>
                    <button className="btn btn-primary btn-sm">Start Workout</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Workouts;
