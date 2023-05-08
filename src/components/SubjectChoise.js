import { Button, Input, Space, Table, Form, message, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const SubjectChoise = () => {
  // Tạo 1 biến subjects để chứa thông tin các môn thi và setSubjects để cập nhật lại biến subjects
  const [questions, setQuestions] = useState([]);
  const [questionsByTestCode, setQuestionsByTestCode] = useState([]);
  const [tests, setTests] = useState([]);
  //   Tạo biến callback và setCallback để xét lại danh sách các môn thi
  const [callBack, setCallBack] = useState(true);
  //   Tạo biến để chứa dữ liệu cập nhật môn thi
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
          `/dethi/detail-dethi-question/${searchParams.get("test_code")}`
        );
        console.log(res);
        setLoading(false);
        setQuestionsByTestCode(res.data.data.question);
        setTests(res.data.data.dethi);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    fetchData();
  }, [callBack, searchParams]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // gọi api lây danh sách các môn thi
        const res = await axios.get(`/question/list-question`);
        setLoading(false);
        setQuestions(
          res.data.data.reduce(
            (array, data) =>
              (array = [
                ...array,
                {
                  label: data.title + ": " + data.question,
                  value: data.questionCode,
                },
              ]),
            []
          )
        );
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
      const res = await axios.delete(
        `/exam question/delete-question-exam/${searchParams.get("test_code")}`,
        { data: [data.questionCode] }
      );
      message.success(res.data.detail);
      setCallBack(!callBack);
    } catch (error) {}
  };

  //   hàm tạo và cập nhật môn thi có tham số đầu vào là dữ liệu môn thi muôn thêm
  const handleCreateSubject = async (data) => {
    try {
      let res;
      // dataUpdate nếu có dữ liệu thì chạy hàm cập nhật còn không có dữ liệu chạy hàm tạo
      res = await axios.post("/exam question/create-examquestion", {
        questionCode: data.question,
        maDeThi: searchParams.get("test_code"),
      });
      message.success(res.data.detail);
      setCallBack(!callBack);
    } catch (error) {}
  };

  // Hàm giúp xóa dữ liệu trong form
  const handleReset = () => {
    form.resetFields();
  };

  //   biến khai báo cái cột của table
  const columns = [
    {
      title: "Câu",
      dataIndex: "title",
      key: "title",
    },
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
      title: "Điểm",
      dataIndex: "point",
      key: "point",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 200,
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleDeleteSubject(record)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="table w-full">
      <h2>Danh sách đề thi của môn {tests.tenDeThi}</h2>
      <Form
        layout="inline"
        form={form}
        name="basic"
        onFinish={handleCreateSubject}
        autoComplete="off"
        className="w-full flex"
      >
        <Form.Item
          label="Câu hỏi"
          name="question"
          className="w-full flex-1"
          rules={[
            {
              required: true,
              message: "Please input your question!",
            },
          ]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "500px",
            }}
            options={questions}
            placeholder="Please select"
          />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button disabled={loading} type="primary" htmlType="submit">
              Thêm
            </Button>
            <Button onClick={handleReset}>Làm mới</Button>
          </div>
        </Form.Item>
      </Form>
      <Table
        loading={loading}
        columns={columns}
        dataSource={questionsByTestCode}
      />
    </div>
  );
};

export default SubjectChoise;
