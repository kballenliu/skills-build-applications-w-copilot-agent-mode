import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
        console.log('Fetching leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankBadge = (rank) => {
    if (rank === 1) return 'bg-warning text-dark'; // Gold
    if (rank === 2) return 'bg-secondary'; // Silver
    if (rank === 3) return 'bg-dark'; // Bronze
    return 'bg-primary';
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return 'bi-trophy-fill';
    if (rank === 2) return 'bi-award-fill';
    if (rank === 3) return 'bi-star-fill';
    return 'bi-person-fill';
  };

  if (loading) return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading leaderboard...</span>
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
        <h1 className="display-5 fw-bold text-primary">
          <i className="bi bi-trophy me-3"></i>Leaderboard
        </h1>
        <div className="btn-group" role="group">
          <button className="btn btn-outline-primary">This Week</button>
          <button className="btn btn-primary">All Time</button>
          <button className="btn btn-outline-primary">This Month</button>
        </div>
      </div>
      
      {leaderboard.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">No Leaderboard Data</h4>
          <p>Start logging activities to see the competition heat up!</p>
        </div>
      ) : (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-gradient bg-primary text-white">
            <h5 className="mb-0">Top Performers</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="text-center">Rank</th>
                  <th scope="col">User</th>
                  <th scope="col" className="text-center">Activities</th>
                  <th scope="col" className="text-center">Calories</th>
                  <th scope="col" className="text-center">Duration</th>
                  <th scope="col" className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => {
                  const rank = index + 1;
                  return (
                    <tr key={entry.id || index} className={rank <= 3 ? 'table-warning' : ''}>
                      <td className="text-center">
                        <span className={`badge ${getRankBadge(rank)} fs-6`}>
                          <i className={`bi ${getRankIcon(rank)} me-1`}></i>
                          {rank}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar me-3">
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                                 style={{width: '40px', height: '40px'}}>
                              {(entry.user_name || entry.username || entry.user || 'U').charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div>
                            <div className="fw-bold">{entry.user_name || entry.username || entry.user || 'Unknown User'}</div>
                            {rank <= 3 && (
                              <small className="text-muted">
                                {rank === 1 ? '🥇 Champion' : rank === 2 ? '🥈 Runner-up' : '🥉 Third Place'}
                              </small>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-info fs-6">
                          {entry.total_activities || entry.activity_count || 0}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="fw-bold text-danger">
                          {entry.total_calories || entry.calories_burned || 0}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="fw-bold text-primary">
                          {entry.total_duration || entry.duration || 0} min
                        </span>
                      </td>
                      <td className="text-center">
                        <button className="btn btn-outline-primary btn-sm">
                          <i className="bi bi-eye me-1"></i>View Profile
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
