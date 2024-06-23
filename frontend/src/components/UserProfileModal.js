// components/UserProfileModal.js
import React, { useState } from "react";
import { Modal, Button } from "antd";
import UserProfile from "./UserProfile";

const UserProfileModal = ({ userId , username}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="link" onClick={showModal}>
        {username}
      </Button>
      <Modal
        title="User Profile"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <UserProfile userId={userId} displayMode="modal" />
      </Modal>
    </>
  );
};

export default UserProfileModal;
