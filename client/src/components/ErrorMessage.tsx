import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
    message: string | null;
    onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
    if (!message) return null;

    return (
        <div className="status-container" style={{ color: '#ff4757', padding: '2rem' }}>
            <AlertCircle size={48} style={{ marginBottom: '1rem' }} />
            <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>Oops! Something went wrong.</p>
            <p style={{ color: '#888', marginTop: '0.5rem', maxWidth: '400px', textAlign: 'center' }}>{message}</p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    style={{
                        marginTop: '1.5rem',
                        background: 'transparent',
                        border: '1px solid #ff4757',
                        color: '#ff4757',
                        padding: '8px 24px',
                        borderRadius: '20px',
                        cursor: 'pointer'
                    }}
                >
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
