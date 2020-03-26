import React from 'react';

const LoadingSpinner = () => {
    const styling = {
        position: 'absolute',
        left: '50%',
        top: '50%'
    };
    return (
        <div className="spinner-border text-primary" role="status" style={styling}>
            <span className="sr-only">Loading...</span>
        </div>
    );
}

export default LoadingSpinner;