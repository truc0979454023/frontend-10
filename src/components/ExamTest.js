import { Button, Form, Input, List, Radio, Space, message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExamTest = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [examCode, setExamCode] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post("/exam/create-exam", {
          candicateCode: JSON.parse(Cookies.get("candicateCode")),
          subject_code: Cookies.get("subject_code"),
          maDeThi: Cookies.get("maDeThi"),
        });
        if (res.data.status_code === 204) {
          navigate("/exam-subject");

          message.error(res.data.detail);
        }
        setTests(res.data.data.question);
        setExamCode(res.data.data.examCode.examCode);
      } catch (error) {}
    }
    fetchData();
  }, []);

  const onFinish = async (data) => {
    console.log(data);
    const dataSend = Object.values(data).reduce(
      (arr, d, index) =>
        (arr = [
          ...arr,
          {
            anwser: d || "",
            examCode,
            questionCode: Number(Object.keys(data)[index]),
          },
        ]),
      []
    );
    console.log(dataSend);
    try {
      setLoading(true);
      const res = await axios.post("/exam/save-exam", dataSend);
      setLoading(false);
      if (res.data.status_code === 204) {
        message.error(res.data.detail);
      }
      message.success(
        res.data.detail + ". Kết quả thi : " + res.data.data + " điểm"
      );

      Cookies.remove("subject_code");
      Cookies.remove("maDeThi");
      navigate("/exam-subject");
    } catch (error) {}
  };

  return (
    <div>
      {tests && (
        <Form
          name="basic"
          layout="vertical"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <List
            className="demo-loadmore-list"
            // loading={loading}
            itemLayout="horizontal"
            dataSource={tests}
            renderItem={(item, index) => (
              <List.Item>
                Câu {index + 1} : {item.question?.question}
                <Form.Item
                  style={{
                    margin: 0,
                    padding: 0,
                  }}
                  layout={""}
                  label="Điền/Chọn đáp án:"
                  name={`${item.question.questionCode}`}
                >
                  {item.choise.length ? (
                    <Radio.Group disabled={loading}>
                      <Space direction="vertical">
                        {item.choise.map((data) => {
                          return (
                            <Radio value={data.anwser}>{data.anwser}</Radio>
                          );
                        })}
                      </Space>
                    </Radio.Group>
                  ) : (
                    <Input disabled={loading} />
                  )}
                </Form.Item>
              </List.Item>
            )}
          />
          <Form.Item style={{ marginTop: "12px" }}>
            <Button
              disabled={loading}
              loading={loading}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default ExamTest;
