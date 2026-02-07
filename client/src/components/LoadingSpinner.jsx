import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * LoadingSpinner Component
 * Minimal and elegant spinner for data fetching states.
 */
const LoadingSpinner = ({ message = "Loading..." }) => {
    return (
        <div className="status-container" style={{ minHeight: '200px' }}>
            <Loader2 className="spinner-icon" size={40} />
            <p style={{ marginTop: '1rem', color: '#888' }}>{message}</p>
        </div>
    );
};

export default LoadingSpinner;
