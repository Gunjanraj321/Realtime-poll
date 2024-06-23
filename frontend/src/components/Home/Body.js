import React from 'react';
import CreatePoll from './CreatePoll';
import FetchPolls from './FetchPolls';
import PollResults from './PollResults';

const Body = () => {

    return (
        <div>
            <h1>Polling App</h1>
            <CreatePoll />
            <FetchPolls />
            <PollResults />
        </div>
    );
};

export default Body;
