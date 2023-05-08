import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const [callBack, setCallBack] = useState(true);
  const [accountData, setAccountData] = useState({
    us: "",
    pw: "",
    candicateCode: "",
    name: "",
    age: 0,
  });

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
      .delete(`/delete-ac/${us.Account.us}`)
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

  const handleCreateAccount = async () => {
    try {
      let res;
      // dataUpdate nếu có dữ liệu thì chạy hàm cập nhật còn không có dữ liệu chạy hàm tạo
      res = await axios.post(`/insert`, {
        account: {
          us: accountData.us,
          pw: accountData.pw,
        },
        candicate: {
          candicateCode: accountData.candicateCode,
          name: accountData.name,
          age: Number(accountData.age),
        },
      });
      message.success(res.data.detail);
      setCallBack(!callBack);
    } catch (error) {}
  };

  const handleUpdateAccount = (account) => {
    setAccountData({
      ...accountData,
      pw: account.Account.pw,
      us: account.Account.us,
      candicateCode: account.Candicate.candicateCode,
      name: account.Candicate.name,
      age: account.Candicate.age,
    });
  };

  const handleChange = () => {
    axios
      .put(`/update`, {
        account: {
          us: accountData.us,
          pw: accountData.pw,
        },
        candicate: {
          candicateCode: accountData.candicateCode,
          name: accountData.name,
          age: Number(accountData.age),
        },
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
          <label htmlFor="id">Mã</label>
          <input
            id="id"
            name="candicateCode"
            onChange={handleChangeInput}
            value={accountData.candicateCode}
          />
        </div>
        <div className="form-item">
          <label htmlFor="username">Họ và tên</label>
          <input
            id="username"
            name="name"
            onChange={handleChangeInput}
            value={accountData.name}
          />
        </div>
        <div className="form-item">
          <label htmlFor="age">Tuổi</label>
          <input
            id="age"
            name="age"
            onChange={handleChangeInput}
            value={accountData.age}
          />
        </div>
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
          <th>Mã</th>
          <th>Họ và tên</th>
          <th>Tuổi</th>
          <th>Username</th>
          <th>Password</th>
          <th>Trạng thái</th>
        </tr>
        {accounts.map((account) => (
          <tr key={account.us}>
            <td>{account.Candicate.us}</td>
            <td>{account.Candicate.name}</td>
            <td>{account.Candicate.age}</td>
            <td>{account.Account.us}</td>
            <td>{account.Account.pw}</td>
            <td>
              <button onClick={() => handleUpdateAccount(account)}>Sửa</button>
              <button onClick={() => handleDeleteAccount(account)}>Xóa</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Account;
