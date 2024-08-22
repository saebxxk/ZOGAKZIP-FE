import React from 'react';
import { Link } from 'react-router-dom';

function Not() {
    return(
        <div className="not-found">
            <h1>404 Not Found</h1>
            <Link to="/">Go back</Link>
        </div>
    );
}

export default Not