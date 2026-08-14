import React from 'react';
import { useToast } from '../context/ToastContext';

const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      zIndex: 1000,
    }}>
      {toasts.map(toast => (
        <div key={toast.id} style={{
          backgroundColor: 'var(--bg-glass)',
          backdropFilter: 'blur(12px)',
          border: '1px solid ' + (toast.type === 'success' ? 'var(--success)' : 
                       toast.type === 'error' ? 'var(--error)' : 'var(--border-subtle)'),
          borderLeft: '5px solid ' + (toast.type === 'success' ? 'var(--success)' : 
                  toast.type === 'error' ? 'var(--error)' : 'var(--primary)'),
          color: 'var(--text-primary)',
          padding: '1rem 1.75rem',
          borderRadius: 'var(--radius-md)',
          animation: 'fadeUp 0.3s ease-out',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontWeight: '600',
          boxShadow: 'var(--shadow-md)',
          fontSize: '0.9rem',
          minWidth: '280px'
        }}>
          <span style={{ 
            width: '10px', 
            height: '10px', 
            borderRadius: '50%', 
            backgroundColor: toast.type === 'success' ? 'var(--success)' : 
                             toast.type === 'error' ? 'var(--error)' : 'var(--primary)' 
          }}></span>
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
