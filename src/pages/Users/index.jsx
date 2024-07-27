import { Header } from '@/layout';
import axios from '@/api/axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import './users.css';

const Users = () => {
  const { username } = useParams();
  const [data, setData] = useState([]); // Ensure initial state is an array
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    axios
      .get('user/getAllUsers', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // Check the structure of res.data and update accordingly
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else if (Array.isArray(res.data.data)) {
          setData(res.data.data);
        } else {
          toast.error('Unexpected data format');
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('حدث خطأ');
      });
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handlePasswordChange = () => {
    if (password !== passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    }

    const token = localStorage.getItem('userToken');
    axios
      .put(
        `user/updatePassword/${selectedUser._id}`,
        { password, passwordConfirm },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success('Password updated successfully');
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to update password');
      });
  };

  const handleDelete = (userId) => {
    const token = localStorage.getItem('userToken');
    axios
      .delete(`user/deleteUser/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success('User deleted successfully');
        setData((prevData) => prevData.filter((user) => user._id !== userId));
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to delete user');
      });
  };

  return (
    <div className="container">
      <Header />
      <ToastContainer />
      <h1 className="text-center my-5 text-dark fw-bolder shadow p-3 mb-5 rounded main-color">
        جميع المستخدمين
      </h1>
      <Link to={'/addnewuser'}>
        <button
          type="button"
          className="btn fw-bolder p-3 d-block ms-auto btn-primary"
        >
          + اضافة مستخدم جديد
        </button>
      </Link>
      <table className="table text-center table-hover text-dark p-5 my-5">
        <thead>
          <tr>
            <th className="p-4">#</th>
            <th className="p-4">اسم المستخدم</th>
            <th className="p-4">الدور</th>
            <th className="p-4">الاحداث</th>
          </tr>
        </thead>
        <tbody className="text-center p-5">
          {data?.map((item, index) => (
            <tr key={item._id}>
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{item.username}</td>
              <td className="p-3">{item.role}</td>
              <td className="p-3">
                <button
                  onClick={() => openModal(item)}
                  className="btn btn-outline-success mx-2 px-4"
                >
                  تعديل المستخدم
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-outline-danger mx-2 px-4"
                >
                  حذف المستخدم
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Edit User Password"
          className="dark-mode-modal text-end container p-5"
          overlayClassName="dark-mode-overlay"
        >
          <h2>تعديل كلمة المرور للمستخدم {selectedUser?.username}</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="password ms-auto">كلمة المرور الجديدة</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirm">تأكيد كلمة المرور</label>
              <input
                type="password"
                id="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="form-control"
              />
            </div>
            <button
              type="button"
              onClick={handlePasswordChange}
              className="btn btn-primary mt-3"
            >
              حفظ التعديلات
            </button>
          </form>
          <button onClick={closeModal} className="btn btn-secondary mt-3">
            إلغاء
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Users;
