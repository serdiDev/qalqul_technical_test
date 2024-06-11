import { useState, useEffect, useCallback } from 'react';
import {uri} from "../config/api";

const cache = {};

const useFetchUser = (userId) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUser = useCallback(async () => {
        if (!userId) return;

        setLoading(true);
        setError(null);

        // Check cache first
        if (cache[userId]) {
            setUser(cache[userId]);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${uri}/users/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            cache[userId] = data;
            setUser(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return { user, loading, error, refetch: fetchUser };
};

export default useFetchUser;