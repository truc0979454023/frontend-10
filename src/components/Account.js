import axios from "axios";
import React, { useEffect, useState } from "react";

const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const [callBack, setCallBack] = useState(true);
  const [accountData, setAccountData] = useState({ us: "", pw: "" });

  useEffect(() => {
    axios
      .get("/detail-ac")
      .then(function (response) {
        // handle success
        console.log(response);
        setAccounts(response.data.data && response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, [callBack]);

  const handleDeleteAccount = (us) => {
    axios
      .delete(`/delete-ac/${us}`)
      .then(function (response) {
        // handle success
        setCallBack(!callBack);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAccountData({ ...accountData, [name]: value });
  };

  const handleCreateAccount = () => {
    axios
      .post(`/insert`, {
        us: accountData.us,
        pw: accountData.pw,
      })
      .then(function (response) {
        // handle success
        setCallBack(!callBack);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const handleUpdateAccount = (account) => {
    setAccountData({ ...accountData, pw: account.pw, us: account.us });
  };

  const handleChange = () => {
    axios
      .put(`/update-pw`, {
        us: accountData.us,
        pw: accountData.pw,
      })
      .then(function (response) {
        // handle success
        setCallBack(!callBack);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  return (
    <div className="table">
      <h2>Danh sách Account</h2>
      <form className="form">
        <div className="form-item">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="us"
            onChange={handleChangeInput}
            value={accountData.us}
          />
        </div>

        <div className="form-item">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="pw"
            onChange={handleChangeInput}
            value={accountData.pw}
          />
        </div>
        <button onClick={handleCreateAccount}>Tạo</button>
        <button onClick={handleChange}>Cập nhật</button>
      </form>
      <table>
        <tr>
          <th>Username</th>
          <th>Password</th>
          <th>Trạng thái</th>
        </tr>
        {accounts.map((account) => (
          <tr key={account.us}>
            <td>{account.us}</td>
            <td>{account.pw}</td>
            <td>
              <button onClick={() => handleUpdateAccount(account)}>Sửa</button>
              <button onClick={() => handleDeleteAccount(account.us)}>
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Account;
