import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Input, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const CreatePoll = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ text: "" }, { text: "" }]);
  const token = useSelector((state) => state.auth.isToken);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setQuestion("");
    setOptions([{ text: "" }, { text: "" }]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, { text: "" }]);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/poll/createPoll",
        { question, options },
        {
          headers: {
            Authorization: `${token}`,
          }
        }
      );
      console.log(response.data);
      handleCancel();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Poll
      </Button>
      <Modal
        title="Create Poll"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText="Save"
      >
        <Form layout="vertical">
          <Form.Item
            label="Question"
            rules={[{ required: true, message: "Please enter a question" }]}
          >
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question"
            />
          </Form.Item>
          <Form.Item label="Options">
            <Space direction="vertical">
              {options.map((option, index) => (
                <Input
                  key={index}
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
              ))}
              <Button type="dashed" onClick={handleAddOption}>
                <PlusOutlined /> Add Option
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreatePoll;
