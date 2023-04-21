import { Route, Routes, useNavigate } from "react-router-dom";
import Account from "./components/Account";
// import Header from "./components/Header";
import Course from "./components/Course";
import NotFound from "./components/NotFound";

// function App() {
//   return (
//     <div className="app">
//       <Header />
//       <main className="main">
//         <Routes>
//           <Route path="/account" element={<Account />} />
//           <Route path="/course" element={<Course />} />

//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }

// export default App;

import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
import Home from "./components/Home";
import Choise from "./components/Choise";
const { Header, Content, Footer } = Layout;
const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const [current, setCurrent] = useState("account");

  const dataMenu = [
    { key: "account", label: "Người dùng" },
    { key: "course", label: "Câu hỏi" },
    { key: "choise", label: "Câu trả lời" },
    // Cũng phải thêm {key:"todolist", label:"ABC"} vào đây
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
          defaultSelectedKeys={["2"]}
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
