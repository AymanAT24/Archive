import { useState, useEffect } from 'react';
import axios from '@/api/axios';
import './Features.css';
import { Header } from '@/layout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Features = () => {
  const [destinations, setDestinations] = useState([]);
  const [newDestination, setNewDestination] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [abouts, setAbouts] = useState([]);
  const [newAbout, setNewAbout] = useState('');
  const [token, setToken] = useState(localStorage.getItem('userToken'));

  useEffect(() => {
    axios
      .get('destinations', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setDestinations(res.data.data))
      .catch((err) => console.log(err));

    axios
      .get('subjects', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSubjects(res.data.data);
      })
      .catch((err) => console.log(err));

    axios
      .get('about', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAbouts(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [token]);

  const handleAddFeatures = () => {
    const addDestination = axios.post(
      'destinations/add',
      { name: newDestination },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const addSubject = axios.post(
      'subjects/add',
      { name: newSubject },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const addAbout = axios.post(
      'about/add',
      { name: newAbout },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    Promise.all([addDestination, addSubject, addAbout])
      .then((responses) => {
        const allSuccessful = responses.every(
          (response) => response.data.status === true
        );

        if (allSuccessful) {
          toast.success('تم الانشاء');
          setNewDestination('');
          setNewSubject('');
          setNewAbout('');
        } else {
          toast.error('حدث خطأ أثناء الإنشاء');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('حدث خطأ أثناء الإنشاء');
      });
  };

  return (
    <div className="features-container bg-dark text-center p-5">
      <div className="shadow-none p-3 mb-5 bg-body-dark rounded main-title">
        <Header />
        <h2 className="fs-1 fw-bold text-light shadow p-3 mb-5 bg-body-dark rounded">
          اضافة خصائص
        </h2>
      </div>
      <div className="add-new-entry">
        <div className="d-flex flex-column mb-4">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="اضافة اسم الجهة"
            value={newDestination}
            onChange={(e) => setNewDestination(e.target.value)}
          />
        </div>
        <div className="d-flex flex-column mb-4">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="اضافة موضوع"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
        </div>
        <div className="d-flex flex-column mb-4">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="اضافة بشان"
            value={newAbout}
            onChange={(e) => setNewAbout(e.target.value)}
          />
        </div>
        <button
          className="btn btn-secondary"
          onClick={handleAddFeatures}
          disabled={!newDestination || !newSubject || !newAbout}
        >
          انشاء الخصائص
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Features;
