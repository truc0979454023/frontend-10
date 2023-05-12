import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Result = () => {
  // Tạo 1 biến subjects để chứa thông tin các môn thi và setSubjects để cập nhật lại biến subjects
  const [subjects, setSubjects] = useState([]);
  //   Tạo biến callback và setCallback để xét lại danh sách các môn thi
  //   Tạo biến để chứa dữ liệu cập nhật môn thi
  //   Tạo biến để bắt quá trình lấy dữ liệu
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  //   Hàm lấy danh sách các môn thi và cập nhật nó vô biến subject hàm sẽ được gọi lần đầu component render
  //   và mỗi khi biến callback thay đổi trạng thái
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // gọi api lây danh sách các môn thi
        const res = await axios.get(
          `/exam/detail-ac?subject_code=${searchParams.get("subject_code")}`
        );
        console.log(res);
        setLoading(false);
        setSubjects(res.data.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    fetchData();
  }, [searchParams]);

  //   biến khai báo cái cột của table
  const columns = [
    {
      title: "Tên đề thi",
      dataIndex: "tenDeThi",
      key: "tenDeThi",
    },
    {
      title: "Tên thí sinh",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Điểm",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "starttime",
      key: "starttime",
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "endtime",
      key: "endtime",
    },
  ];
  return (
    <div className="table">
      {/* <h2>Danh sách đề thi của môn {subject.subjectName}</h2> */}

      <Table loading={loading} columns={columns} dataSource={subjects} />
    </div>
  );
};

export default Result;
