import React from 'react';
import useFetchUser from '../api/userFecth';

const UserDetails = ({ userId }) => {
    const { user, loading, error, refetch } = useFetchUser(userId);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {user && (
                <div>
                    <h2>User Details</h2>
                    <p>ID: {user.id}</p>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    {/* Add other user details as needed */}
                </div>
            )}
            <button onClick={refetch}>Refresh</button>
        </div>
    );
};

export default UserDetails;