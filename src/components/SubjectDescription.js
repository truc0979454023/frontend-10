import { Button, Input, Space, Table, Form, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const SubjectDescription = () => {
  // Tạo 1 biến subjects để chứa thông tin các môn thi và setSubjects để cập nhật lại biến subjects
  const [tests, setTests] = useState([]);
  const [subject, setSubject] = useState({});
  //   Tạo biến callback và setCallback để xét lại danh sách các môn thi
  const [callBack, setCallBack] = useState(true);
  //   Tạo biến để chứa dữ liệu cập nhật môn thi
  const [dataUpdate, setDataUpdate] = useState(null);
  //   Tạo biến để bắt quá trình lấy dữ liệu
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  //   Hàm lấy danh sách các môn thi và cập nhật nó vô biến subject hàm sẽ được gọi lần đầu component render
  //   và mỗi khi biến callback thay đổi trạng thái
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // gọi api lây danh sách các môn thi
        const res = await axios.get(
          `dethi/detail-dethi-by-monthi/${searchParams.get("subject_code")}`
        );
        console.log(res);
        setLoading(false);
        setTests(res.data.data.dethi);
        setSubject(res.data.data.monthi);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    fetchData();
  }, [callBack, searchParams]);

  //   Hàm giúp xóa các môn thi có tham số đầu vào là môn thi muốn xóa
  const handleDeleteSubject = async (data) => {
    try {
      // gọi api xóa danh sách các môn thi
      const res = await axios.delete(`/dethi/delete-dethi/${data.maDeThi}`);
      message.success(res.data.detail);
      setCallBack(!callBack);
    } catch (error) {}
  };

  //   hàm tạo và cập nhật môn thi có tham số đầu vào là dữ liệu môn thi muôn thêm
  const handleCreateSubject = async (data) => {
    try {
      let res;
      // dataUpdate nếu có dữ liệu thì chạy hàm cập nhật còn không có dữ liệu chạy hàm tạo
      dataUpdate
        ? (res = await axios.put(`dethi/update-dethi/${dataUpdate.maDeThi}`, {
            tenDeThi: data.tenDeThi,
            note: data.note,
            subject_code: subject?.subject_code,
          }))
        : (res = await axios.post("/dethi/create-dethi", {
            tenDeThi: data.tenDeThi,
            note: data.note,
            subject_code: subject?.subject_code,
          }));
      message.success(res.data.detail);
      setCallBack(!callBack);
    } catch (error) {}
  };

  //   Hàm giúp truyền dữ liệu muốn cập nhật vô form và xét dữ liệu
  const handleUpdateSubject = (record) => {
    form.setFieldsValue(record);
    setDataUpdate(record);
  };
  // Hàm giúp xóa dữ liệu trong form
  const handleReset = () => {
    form.resetFields();
    setDataUpdate(null);
  };

  //   biến khai báo cái cột của table
  const columns = [
    {
      title: "Mã đề thi",
      dataIndex: "maDeThi",
      key: "maDeThi",
    },
    {
      title: "Tên đề thi",
      dataIndex: "tenDeThi",
      key: "tenDeThi",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 200,
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleUpdateSubject(record)}>Sửa</Button>
          <Button onClick={() => handleDeleteSubject(record)}>Xóa</Button>
          <Button>
            <Link
              to={`/subject-description?subject_code=${record.subject_code}`}
            >
              Chi tiết
            </Link>
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
        onFinish={handleCreateSubject}
        autoComplete="off"
      >
        <Form.Item
          label="Tên đề thi"
          name="tenDeThi"
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
          label="Ghi chú"
          name="note"
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
      <Table loading={loading} columns={columns} dataSource={tests} />
    </div>
  );
};

export default SubjectDescription;
