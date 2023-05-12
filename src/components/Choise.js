import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Space,
  Table,
  message,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Choise = () => {
  // Tạo 1 biến subjects để chứa thông tin các môn thi và setSubjects để cập nhật lại biến subjects
  const [questions, setQuestions] = useState([]);
  const [tests, setTests] = useState([]);
  const [subject, setSubject] = useState({});
  //   Tạo biến callback và setCallback để xét lại danh sách các môn thi
  const [callBack, setCallBack] = useState(true);
  //   Tạo biến để chứa dữ liệu cập nhật môn thi
  const [dataUpdate, setDataUpdate] = useState(null);
  //   Tạo biến để bắt quá trình lấy dữ liệu
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const [formModal] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // gọi api lây danh sách các môn thi
        const res = await axios.get(`/choise/lst-question-choice`);
        setLoading(false);
        setQuestions(
          res.data.data.reduce(
            (arr, data) =>
              (arr = [...arr, { ...data.question, choice: data.choice }]),
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
        `/question/delete-question/${data.questionCode}`
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
      dataUpdate
        ? (res = await axios.put(
            `question/update-question/${dataUpdate.questionCode}`,
            {
              title: data.title,
              question: data.question,
              result: data.result,
              point: data.point,
            }
          ))
        : (res = await axios.post("/question/create-question", {
            title: data.title,
            question: data.question,
            result: data.result,
            point: data.point,
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionCode, setQuestionCode] = useState(false);
  const [isDeleteModalItem, setIsDeleteModalItem] = useState(false);
  useEffect(() => {
    isDeleteModalItem &&
      formModal?.setFieldValue("choice", questionCode.choice);
  }, [isDeleteModalItem, questionCode]);

  const showModal = (record) => {
    setIsModalOpen(true);
    setQuestionCode(record);
  };

  const handleOk = () => {
    formModal?.resetFields();
    setIsModalOpen(false);
    setIsDeleteModalItem(false);
  };
  const handleCancel = () => {
    formModal?.resetFields();
    setIsModalOpen(false);
    setIsDeleteModalItem(false);
  };

  const onFinishModal = async (values) => {
    const dataSendCreate = values.choice.reduce(
      (arr, data) =>
        (arr = [...arr, { ...data, question: questionCode.questionCode }]),
      []
    );
    const dataSendDelete = values.choice.reduce(
      (arr, data) => (data.check ? (arr = [...arr, data.id]) : arr),
      []
    );

    try {
      // gọi api xóa danh sách các môn thi
      const res = isDeleteModalItem
        ? await axios.delete(`/choise/delete-choise`, { data: dataSendDelete })
        : await axios.post(`/choise/create-choise`, dataSendCreate);
      message.success(res.data.detail);
      setIsModalOpen(false);
      formModal?.resetFields();
      setIsDeleteModalItem(false);
      setCallBack(!callBack);
    } catch (error) {}
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
      title: "Đáp án đúng",
      dataIndex: "result",
      key: "result",
    },
    {
      title: "Điểm",
      dataIndex: "point",
      key: "point",
    },
    // Show các đáp án của câu hỏi
    {
      title: "Đáp án",
      dataIndex: "choice",
      key: "choice",
      render: (_, record) => {
        return (
          <>
            {record.choice.map((data) => (
              <p>{data.title + ": " + data.anwser}</p>
            ))}
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 200,
      render: (_, record) => (
        <Space style={{ display: "flex", flexWrap: "wrap" }}>
          <Button onClick={() => handleUpdateSubject(record)}>Sửa</Button>
          <Button onClick={() => handleDeleteSubject(record)}>Xóa</Button>
          <Button onClick={() => showModal(record)}>Thêm đáp án</Button>
          <Button
            onClick={() => {
              setIsDeleteModalItem(true);
              showModal(record);
            }}
          >
            Xóa đáp án
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="table">
      {/* <h2>Danh sách đề thi của môn {subject.subjectName}</h2> */}
      <Modal
        title="Thêm đáp án"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          name="modal"
          form={formModal}
          onFinish={onFinishModal}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.List name="choice">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    {isDeleteModalItem && (
                      <Form.Item
                        {...restField}
                        valuePropName="checked"
                        name={[name, "check"]}
                      >
                        <Checkbox />
                      </Form.Item>
                    )}
                    <Form.Item {...restField} name={[name, "title"]}>
                      <Input placeholder="Câu" />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "anwser"]}>
                      <Input placeholder="Nội dung đáp án" />
                    </Form.Item>
                    {!isDeleteModalItem && (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    )}
                  </Space>
                ))}
                {!isDeleteModalItem && (
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Thêm đáp án
                    </Button>
                  </Form.Item>
                )}
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Form
        layout="inline"
        form={form}
        name="basic"
        onFinish={handleCreateSubject}
        autoComplete="off"
      >
        <Form.Item
          label="Câu"
          name="title"
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
              message: "Please input your question!",
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
              message: "Please input your question!",
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

export default Choise;
