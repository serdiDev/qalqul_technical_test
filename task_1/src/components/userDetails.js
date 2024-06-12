import React from 'react';
import useFetchUser from '../api/userFecth';

const UserDetails = ({ userId }) => {
    const { user, loading, error, refetch } = useFetchUser(userId);

    return (
        <div className="user-details-container">
            <div className="user-details-header">
                <h2>User Details</h2>
                <button className="refresh-button" onClick={() => refetch()}>Refresh</button>
            </div>
            {loading && <p className="user-details-loading">Loading...</p>}
            {error && <p className="user-details-error">{error}</p>}
            {user && (
                <div className="user-details-body">
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {/* Add other user details as needed */}
                </div>
            )}
        </div>
    );
};

export default UserDetails;