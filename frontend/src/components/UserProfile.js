import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Card, Avatar, Spin, Alert } from "antd";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.isToken);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user/profile", {
          headers: {
            Authorization: `${token}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        setError("Error fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={error} type="error" />;

  return (
    <Card
      style={{ width: 300, margin: "auto", marginTop: 20 }}
      cover={
        <Avatar
          size={100}
          src={profile?.profilePicture || "https://via.placeholder.com/100"}
          alt={profile?.username}
        />
      }
    >
      <Card.Meta
        title={profile?.username}
        description={profile?.email}
      />
    </Card>
  );
};

export default UserProfile;
