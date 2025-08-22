import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
        console.log('Fetching teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading teams...</span>
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
        <h1 className="display-5 fw-bold text-primary">Teams</h1>
        <button className="btn btn-success btn-lg">
          <i className="bi bi-plus-circle me-2"></i>Create Team
        </button>
      </div>
      
      {teams.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">No Teams Found</h4>
          <p>There are currently no teams available. Be the first to create one!</p>
        </div>
      ) : (
        <div className="row g-4">
          {teams.map((team) => (
            <div key={team.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">{team.name || 'Unnamed Team'}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted">
                    {team.description || 'No description available'}
                  </p>
                  <ul className="list-unstyled">
                    <li><strong>Members:</strong> {team.member_count || team.members?.length || 0}</li>
                    <li><strong>Created:</strong> {team.created_at ? new Date(team.created_at).toLocaleDateString() : 'N/A'}</li>
                    <li><strong>Captain:</strong> {team.captain_name || team.captain || 'N/A'}</li>
                  </ul>
                </div>
                <div className="card-footer bg-transparent">
                  <div className="btn-group w-100" role="group">
                    <button className="btn btn-outline-primary btn-sm">View Details</button>
                    <button className="btn btn-outline-success btn-sm">Join Team</button>
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

export default Teams;
