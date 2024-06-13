import React from 'react';
import {useUsername} from "../provider/UsernameContext";

const Navbar = () => {
    const { username } = useUsername();

    return (
        <nav className="navbar">
            <div className="logo">QALQUL</div>
            <h1>Real-Time Collaborative Document Editing App</h1>
            <div className="current-user">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
                </svg>
                <span>{username}</span>
            </div>
        </nav>
    );
};

export default Navbar;
