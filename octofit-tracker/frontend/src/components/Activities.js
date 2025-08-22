import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
        console.log('Fetching activities from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getActivityIcon = (type) => {
    const iconMap = {
      'running': 'bi-bicycle',
      'cycling': 'bi-bicycle',
      'swimming': 'bi-water',
      'walking': 'bi-person-walking',
      'gym': 'bi-person-arms-up',
      'yoga': 'bi-heart',
      'default': 'bi-activity'
    };
    return iconMap[type?.toLowerCase()] || iconMap.default;
  };

  if (loading) return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading activities...</span>
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
        <h1 className="display-5 fw-bold text-primary">Recent Activities</h1>
        <button className="btn btn-success btn-lg">
          <i className="bi bi-plus-circle me-2"></i>Log Activity
        </button>
      </div>
      
      {activities.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">No Activities Found</h4>
          <p>Start tracking your fitness journey by logging your first activity!</p>
        </div>
      ) : (
        <div className="row g-4">
          {activities.map((activity) => (
            <div key={activity.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-header bg-gradient bg-primary text-white">
                  <div className="d-flex align-items-center">
                    <i className={`bi ${getActivityIcon(activity.activity_type)} me-2`}></i>
                    <h5 className="card-title mb-0">{activity.activity_type || 'Unknown Activity'}</h5>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-clock text-primary me-2"></i>
                        <div>
                          <small className="text-muted d-block">Duration</small>
                          <strong>{activity.duration || 'N/A'} min</strong>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-fire text-danger me-2"></i>
                        <div>
                          <small className="text-muted d-block">Calories</small>
                          <strong>{activity.calories_burned || 'N/A'}</strong>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-calendar text-info me-2"></i>
                        <div>
                          <small className="text-muted d-block">Date</small>
                          <strong>{activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}</strong>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-person text-success me-2"></i>
                        <div>
                          <small className="text-muted d-block">User</small>
                          <strong>{activity.user_name || activity.user || 'Unknown'}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <div className="btn-group w-100" role="group">
                    <button className="btn btn-outline-primary btn-sm">View Details</button>
                    <button className="btn btn-outline-secondary btn-sm">Edit</button>
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

export default Activities;
