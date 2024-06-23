import React from 'react';
import CreatePoll from './CreatePoll';
import FetchPolls from './FetchPolls';
import UserProfile from '../UserProfile';

const Body = () => {

    return (
        <div>
            <h1>Polling App</h1>
            <UserProfile />
            <CreatePoll />
            <FetchPolls />

        </div>
    );
};

export default Body;
