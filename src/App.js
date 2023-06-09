import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Account from "./components/Account";
import Course from "./components/Course";
import NotFound from "./components/NotFound";

import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import Choise from "./components/Choise";
import ExamLogin from "./components/ExamLogin";
import ExamSubject from "./components/ExamSubject";
import ExamTest from "./components/ExamTest";
import Home from "./components/Home";
import Subject from "./components/Subject";
import SubjectChoise from "./components/SubjectChoise";
import SubjectDescription from "./components/SubjectDescription";
import Result from "./components/Result";
const { Header, Content, Footer } = Layout;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(
    location.pathname.split("/")[location.pathname.split("/").length - 1] ||
      "account"
  );

  const dataMenu = [
    { key: "account", label: "Người dùng" },
    // { key: "course", label: "Câu hỏi" },
    { key: "choise", label: "Câu hỏi" },
    { key: "subject", label: "Môn thi" },
    { key: "exam-login", label: "Dự thi" },
  ];

  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["subject"]}
          items={dataMenu}
          onClick={onClick}
          selectedKeys={[current]}
        />
      </Header>
      <Content
        style={{
          padding: "25px 50px",
        }}
      >
        {/* <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          {/* content */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/course" element={<Course />} />
            <Route path="/choise" element={<Choise />} />
            <Route path="/subject-choise" element={<SubjectChoise />} />
            <Route path="subject" element={<Subject />}></Route>
            <Route path="/exam-login" element={<ExamLogin />}></Route>
            <Route path="/exam-subject" element={<ExamSubject />}></Route>
            <Route path="/exam-test" element={<ExamTest />}></Route>
            <Route path="/result" element={<Result />}></Route>
            <Route
              path="subject-description"
              element={<SubjectDescription />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default App;
