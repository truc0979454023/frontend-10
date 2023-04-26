import { Button, Input, Space, Table, Form, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const [callBack, setCallBack] = useState(true);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get("Subject/list-subject");
        setLoading(false);
        setSubjects(res.data.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    fetchData();
  }, [callBack]);

  const handleDeleteSubject = async (data) => {
    try {
      const res = await axios.delete(
        `Subject/delete-subject/${data.subject_code}`
      );
      message.success(res.data.detail);
      setCallBack(!callBack);
    } catch (error) {}
  };

  const handleCreateSubject = async (data) => {
    try {
      let res;
      dataUpdate
        ? (res = await axios.put(
            `/Subject/update-subject/${dataUpdate.subject_code}`,
            {
              subjectName: data.subjectName,
            }
          ))
        : (res = await axios.post("Subject/create-subject", {
            subjectName: data.subjectName,
          }));
      message.success(res.data.detail);
      setCallBack(!callBack);
    } catch (error) {}
  };

  const handleUpdateSubject = (record) => {
    form.setFieldsValue(record);
    setDataUpdate(record);
  };

  const handleReset = () => {
    form.resetFields();
    setDataUpdate(null);
  };
  const columns = [
    {
      title: "Tên môn thi",
      dataIndex: "subjectName",
      key: "subjectName",
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleUpdateSubject(record)}>Sửa</Button>
          <Button onClick={() => handleDeleteSubject(record)}>Xóa</Button>
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
        onFinish={handleCreateSubject}
        autoComplete="off"
      >
        <Form.Item
          label="Tên môn thi"
          name="subjectName"
          rules={[
            {
              required: true,
              message: "Please input your question!",
            },
          ]}
        >
          <Input />
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
      <Table loading={loading} columns={columns} dataSource={subjects} />
    </div>
  );
};

export default Subject;
