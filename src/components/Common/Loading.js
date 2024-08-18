import React from 'react';
import './Loading.css';

function Loading() {
    return (
        <div className="loadingContainer">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
}

export default Loading;