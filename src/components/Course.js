import { Button, Input, Space, Table, Form, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Course = () => {
  const [questions, setQuestions] = useState([]);
  const [callBack, setCallBack] = useState(true);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get("question/list-question");
        setLoading(false);
        setQuestions(res.data.data);
      } catch (error) {}
    }
    fetchData();
  }, [callBack]);

  const handleDeleteAccount = async (id) => {
    try {
      const res = await axios.delete(`question/delete-question/${id}`);
      message.success(res.data.detail);
      setCallBack(!callBack);
    } catch (error) {}
  };

  const handleCreateAccount = async (data) => {
    try {
      let res;
      !dataUpdate
        ? (res = await axios.post("question/create-question", {
            title: data.title,
            question: data.question,
            result: data.result,
            point: data.point,
          }))
        : (res = await axios.put(
            `question/update-question/${dataUpdate.questionCode}`,
            {
              title: data.title,
              question: data.question,
              result: data.result,
              point: data.point,
            }
          ));
      message.success(res.data.detail);
      setCallBack(!callBack);
    } catch (error) {}
  };

  const handleUpdateAccount = (account) => {
    form.setFieldsValue(account);
    setDataUpdate(account);
  };

  const handleReset = () => {
    form.resetFields();
    setDataUpdate(null);
  };

  const columns = [
    {
      title: "Câu hỏi",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Đáp án",
      dataIndex: "result",
      key: "result",
    },

    {
      title: "Đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Điểm",
      dataIndex: "point",
      key: "point",
    },

    {
      title: "Action",
      key: "action",
      width: 200,
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleUpdateAccount(record)}>Sửa</Button>
          <Button onClick={() => handleDeleteAccount(record.questionCode)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="table">
      <h2>Danh sách Câu hỏi</h2>
      <Form
        layout="inline"
        form={form}
        name="basic"
        onFinish={handleCreateAccount}
        autoComplete="off"
      >
        <Form.Item
          label="Câu hỏi"
          name="question"
          rules={[
            {
              required: true,
              message: "Please input your question!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Đáp án"
          name="result"
          rules={[
            {
              required: true,
              message: "Please input your result!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Đề"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input your title!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Điểm"
          name="point"
          rules={[
            {
              required: true,
              message: "Please input your point!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button disabled={loading} type="primary" htmlType="submit">
              {dataUpdate ? "Cập nhật" : "Thêm"}
            </Button>
            <Button onClick={handleReset}>Làm mới</Button>
          </div>
        </Form.Item>
      </Form>
      <Table loading={loading} columns={columns} dataSource={questions} />
    </div>
  );
};

export default Course;
