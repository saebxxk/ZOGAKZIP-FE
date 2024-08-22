import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBadgeById } from '../../api/badgeAPI';

function BadgeDetail() {
  const { badgeId } = useParams();
  const [badge, setBadge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBadgeById(badgeId)
      .then(response => {
        setBadge(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load badge details.');
        setLoading(false);
      });
  }, [badgeId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="badge-detail">
      <img src={badge.image} alt={badge.name} style={{ width: '100px', height: '100px' }} />
      <h1>{badge.name}</h1>
      <p>{badge.description}</p>
    </div>
  );
}

export default BadgeDetail;