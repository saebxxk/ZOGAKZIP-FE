import React, { useEffect, useState } from 'react';
import { fetchGroups } from '../api/groupAPI';


function PublicGroupList() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGroups()
            .then(response => {
                setGroups(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching public groups:', error);
                setError('Failed to load public groups.');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Public Groups</h1>
            <ul>
                {groups.map(group => (
                    <li key={group.id}>
                        <img src={group.image} alt={group.name} style={{ width: '50px', height: '50px' }} />
                        <h2>{group.name}</h2>
                        <p>{group.description}</p>
                        <p>디데이: {group.dDay}일</p>
                        <p>배지 수: {group.badgeCount}</p>
                        <p>추억 수: {group.postCount}</p>
                        <p>공감 수: {group.likeCount}</p>
                    </li>
                ))}
            </ul>

        </div>
    );
}


export default PublicGroupList