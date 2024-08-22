import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyGroupPassword } from '../api/groupAPI';



function CheckPrivateGroup() {
    const { groupId } = useParams();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      verifyGroupPassword(groupId, password)
        .then(() => {
          navigate(`/view-private-group-detail/${groupId}`);
        })
        .catch(() => {
          setError('Incorrect password.');
        });
    };
  
    return (
      <div className="check-private-group">
        <h1>Enter Password for Private Group</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Submit</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    );
  }
  
  export default CheckPrivateGroup;