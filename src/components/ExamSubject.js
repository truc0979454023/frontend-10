import { Button, List } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ExamSubject = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // gọi api lây danh sách các môn thi
        const res = await axios.get("Subject/list-subject");
        setLoading(false);
        setSubjects(res.data.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleStart = async (id) => {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    try {
      setLoading(true);
      // gọi api lây danh sách các môn thi
      const res = await axios.get(
        `/exam question/detail-subject-exam-question/${id}`
      );

      setLoading(false);
      Cookies.set("subject_code", id);
      Cookies.set(
        "maDeThi",
        res.data.data.deThi[getRandomInt(res.data.data.deThi.length)].maDeThi
      );
      navigate("/exam-test");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("candicateCode");
    navigate("/exam-login");
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <span
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            textTransform: "uppercase",
          }}
        >
          Danh sách môn thi
        </span>
        <Button onClick={handleLogout}>Đăng xuất</Button>
      </div>

      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={subjects}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                onClick={() => handleStart(item.subject_code)}
                key="list-loadmore-more"
              >
                Tham gia thi
              </Button>,
            ]}
          >
            {item.subjectName}
          </List.Item>
        )}
      />
    </div>
  );
};

export default ExamSubject;
