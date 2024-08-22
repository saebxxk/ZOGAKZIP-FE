import React, { useEffect, useState } from 'react';
import { fetchGroups } from '../api/groupAPI';
import GroupList from '../components/Group/GroupList';

function PrivateGroupList() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGroups({ isPublic: false })
      .then(response => {
        setGroups(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load groups.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="private-group-list">
      <h1>Private Groups</h1>
      <GroupList groups={groups} />
    </div>
  );
}

export default PrivateGroupList;