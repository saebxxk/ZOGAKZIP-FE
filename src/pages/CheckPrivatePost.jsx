import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyPostPassword } from '../api/postAPI';

function CheckPrivatePost() {
  const { postId } = useParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyPostPassword(postId, password)
      .then(() => {
        navigate(`/view-post-detail/${postId}`);
      })
      .catch(() => {
        setError('Incorrect password.');
      });
  };

  return (
    <div className="check-private-post">
      <h1>Enter Password for Private Post</h1>
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

export default CheckPrivatePost;
