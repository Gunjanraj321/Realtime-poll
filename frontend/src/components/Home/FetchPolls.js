import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, Card, Button, Radio, message } from "antd";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const socket = io("http://localhost:3001");

const FetchPolls = () => {
  const [polls, setPolls] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const token = useSelector(state => state.auth.isToken); // Assuming the token is stored in state.auth.token

  useEffect(() => {
    fetchPolls();

    // Setup socket listener for real-time updates
    socket.on("vote", updatedPoll => {
      setPolls(prevPolls =>
        prevPolls.map(poll => (poll._id === updatedPoll._id ? updatedPoll : poll))
      );
    });

    return () => {
      socket.off("vote");
    };
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await axios.get("http://localhost:3001/poll");
      setPolls(response.data);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

  const handleVote = async (pollId) => {
    const optionId = selectedOption[pollId];
    if (!optionId) {
      message.warning("Please select an option before voting.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/poll/vote/${pollId}/${optionId}`,
        {},
        {
          headers: {
            Authorization: `${token}`
          }
        }
      );
      console.log("Vote successful:", response.data);
      fetchPolls(); // Refresh polls after voting
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const handleOptionChange = (pollId, optionId) => {
    setSelectedOption(prev => ({ ...prev, [pollId]: optionId }));
  };

  return (
    <div>
      <h2>Polls</h2>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={polls}
        renderItem={poll => (
          <List.Item key={poll._id}>
            <Card title={poll.question}>
              <Radio.Group
                onChange={e => handleOptionChange(poll._id, e.target.value)}
              >
                {poll.options.map(option => (
                  <Radio key={option.id} value={option.id}>
                    {option.text} ({option.voteCount})
                  </Radio>
                ))}
              </Radio.Group>
              <Button
                type="primary"
                onClick={() => handleVote(poll._id)}
                style={{ marginTop: "10px" }}
              >
                Vote
              </Button>
              <Link to={`/poll/${poll._id}/results`}>
                <Button style={{ marginTop: "10px" }}>View Results</Button>
              </Link>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default FetchPolls;