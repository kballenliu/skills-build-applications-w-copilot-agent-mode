import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
        console.log('Fetching users from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Users API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        setUsers(Array.isArray(usersData) ? usersData : []);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading users...</span>
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
        <h1 className="display-5 fw-bold text-primary">Users</h1>
        <button className="btn btn-success btn-lg">
          <i className="bi bi-person-plus me-2"></i>Add User
        </button>
      </div>
      
      {users.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">No Users Found</h4>
          <p>No users are currently registered in the system.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Team</th>
                <th scope="col">Join Date</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id || index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar me-2">
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                             style={{width: '40px', height: '40px'}}>
                          {(user.username || user.first_name || user.name || 'U').charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <div className="fw-bold">{user.username || user.name || 'Unknown User'}</div>
                        <small className="text-muted">{user.first_name} {user.last_name}</small>
                      </div>
                    </div>
                  </td>
                  <td>{user.email || 'N/A'}</td>
                  <td>
                    {user.team_name || user.team ? (
                      <span className="badge bg-primary">{user.team_name || user.team}</span>
                    ) : (
                      <span className="badge bg-secondary">No Team</span>
                    )}
                  </td>
                  <td>{user.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <span className={`badge ${user.is_active ? 'bg-success' : 'bg-danger'}`}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <button className="btn btn-outline-primary btn-sm">View</button>
                      <button className="btn btn-outline-secondary btn-sm">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
