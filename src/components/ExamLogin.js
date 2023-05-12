import { Button, Form, Input, message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ExamLogin = () => {
  const navigate = useNavigate();
  const candicateCode = Cookies.get("candicateCode");

  useEffect(() => {
    candicateCode && navigate("/exam-subject");
  }, [candicateCode, navigate]);

  const onFinish = async (values) => {
    try {
      // gọi api xóa danh sách các môn thi
      const res = await axios.post(`/login`, {
        username: values.username,
        password: values.password,
      });
      if (res.data.status_code === 204) {
        return message.error(res.data.detail);
      }
      message.success(res.data.detail);
      Cookies.set("candicateCode", JSON.stringify(res.data.data.candicateCode));
      navigate("/exam-subject");
    } catch (error) {}
  };

  return (
    // <Form
    //   name="basic"
    //   labelCol={{
    //     span: 8,
    //   }}
    //   wrapperCol={{
    //     span: 16,
    //   }}
    //   style={{
    //     maxWidth: 600,
    //     margin: "auto",
    //   }}
    //   initialValues={{
    //     remember: true,
    //   }}
    //   onFinish={onFinish}
    //   autoComplete="off"
    // >
    //   <Form.Item
    //     style={{
    //       display: "flex",
    //       justifyContent: "center",
    //       width: "full",
    //       whiteSpace: "nowrap",
    //     }}
    //   >
    //     <span
    //       style={{
    //         textTransform: "uppercase",
    //         margin: "auto",
    //         fontWeight: "bold",
    //         fontSize: "20px",
    //       }}
    //     >
    //       Đăng nhập để dự thi
    //     </span>
    //   </Form.Item>
    //   <Form.Item
    //     label="Username"
    //     name="username"
    //     rules={[
    //       {
    //         required: true,
    //         message: "Please input your username!",
    //       },
    //     ]}
    //   >
    //     <Input />
    //   </Form.Item>

    //   <Form.Item
    //     label="Password"
    //     name="password"
    //     rules={[
    //       {
    //         required: true,
    //         message: "Please input your password!",
    //       },
    //     ]}
    //   >
    //     <Input.Password />
    //   </Form.Item>

    //   <Form.Item
    //     wrapperCol={{
    //       offset: 8,
    //       span: 16,
    //     }}
    //   >
    //     <Button type="primary" htmlType="submit">
    //       Submit
    //     </Button>
    //   </Form.Item>
    // </Form>

    <Form
      name="basic"
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
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default ExamLogin;
