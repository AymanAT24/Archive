import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '@/api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.scss';
import { useAuth } from '@/context/Auth';

const Login = () => {
  const { user, setuser } = useAuth();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  // const notify = () =>
  //   toast.error('من فضلك تأكد من رقم الهاتف او الرقم السري', {
  //     position: 'top-right',
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: 'colored',
  //   });

  const handelSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const { data } = await axios.post(
        'user/login',
        {
          username: userName,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('تم تسجيل الدخول بنجاح');
      setuser(data.data);
      localStorage.setItem('userToken', data.token);
      // console.log(data);
      setIsPending(false);
    } catch (err) {
      console.log(err);
      setIsPending(false);
      toast.error('من فضلك تأكد من اسم المستخدم او كلمة المرور ');
      // toast.error(err?.response?.data?.message);
      // < ToastContainer />
      // console.log('response', err?.response?.data?.message);
    } finally {
      if (
        user?.role == 'admin' ||
        user?.role == 'godAdmin' ||
        user?.role == 'manager'
      ) {
        navigate('/dash/dashboard');
      }
    }
  };
  return (
    <>
      {isPending && <div className="loading"></div>}
      <div className="login-page">
        <div className="Container pt-5 login">
          <div className="container text-end d-flex flex-column justify-content-center m-auto body-card">
            <div className="shadow-lg p-3 mb-5 bg-body rounded">
              <h3 className="text-center pt-3 fs-2 fw-bold">تسجيل الدخول </h3>
              <form className="pb-5 pt-2" onSubmit={handelSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputuserName1"
                    className="form-label fs-4 fw-bold"
                  >
                    اسم المستخدم
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="exampleInputuserName1"
                    aria-describedby="userNameHelp"
                    value={userName}
                    onChange={(e) => setuserName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label fs-4 fw-bold"
                  >
                    كلمه المرور*
                  </label>
                  <input
                    required
                    type="password"
                    className="form-control fw-bold"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid gap-2">
                  <ToastContainer />
                  <button>تسجيل الدخول</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
