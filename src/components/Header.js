import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <ul>
        <Link to={"/account"}>
          <li>Danh sách tài khoản</li>
        </Link>
        <li>
          <Link to={"/course"}>Danh sách khóa học</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
