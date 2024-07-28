import { useState, useEffect } from 'react';
import axios from '@/api/axios';
import './Features.css';
import { Header } from '@/layout';

const Features = () => {
  const [destinations, setDestinations] = useState([]);
  const [newDestination, setNewDestination] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
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
  }, [token]);

  const handleAddNewDestination = () => {
    axios
      .post(
        'destinations/add',
        { name: newDestination },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setDestinations((prev) => [...prev, response.data.data]);
        setNewDestination('');
      })
      .catch((error) => console.log(error));
  };

  const handleAddNewSubject = () => {
    axios
      .post(
        'subjects/add',
        { name: newSubject, destinationId: selectedDestination },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setSubjects((prev) => [...prev, response.data.data]);
        setNewSubject('');
      })
      .catch((error) => console.log(error));
  };

  const handleAddNewAbout = () => {
    axios
      .post(
        'about/add',
        { name: newAbout, subjectId: selectedSubject },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setAbouts((prev) => [...prev, response.data.data]);
        setNewAbout('');
      })
      .catch((error) => console.log(error));
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
          <button
            className="btn btn-secondary"
            onClick={handleAddNewDestination}
          >
            اضافة الجهة
          </button>
        </div>
        <div className="d-flex flex-column mb-4">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="اضافة موضوع"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
          <button className="btn btn-secondary" onClick={handleAddNewSubject}>
            اضافة الموضوع
          </button>
        </div>
        <div className="d-flex flex-column mb-4">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="اضافة بشان"
            value={newAbout}
            onChange={(e) => setNewAbout(e.target.value)}
          />
          <button className="btn btn-secondary" onClick={handleAddNewAbout}>
            اضافة بشان
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;
