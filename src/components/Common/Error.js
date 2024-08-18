import React from 'react';
import './Error.css';

function Error({ message = "An error occurred. please try again later." }) {
    return (
        <div className="errorContainer">
            <h2>Error</h2>
            <p>{message}</p>
        </div>
    );
}

export default Error;
