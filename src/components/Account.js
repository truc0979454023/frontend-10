import React from "react";

const Account = () => {
  return (
    <div className="table">
      <h2>Danh sách Account</h2>
      <form className="form">
        <div className="form-item">
          <label htmlFor="username">Username</label>
          <input id="username" />
        </div>

        <div className="form-item">
          <label htmlFor="password">Password</label>
          <input id="password" />
        </div>
        <button>Tạo</button>
      </form>
      <table>
        <tr>
          <th>Username</th>
          <th>Password</th>
          <th>Trạng thái</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>
            <button>Sửa</button>
            <button>Xóa</button>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Account;
