import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <ul>
        <Link to={"/account"}>Danh sách tài khoản</Link>
        <Link to={"/course"}>Danh sách khóa học</Link>
      </ul>
    </div>
  );
};

export default Header;
