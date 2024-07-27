import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from '@/api/axios';

const AddNewFax = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [abouts, setAbouts] = useState([]);
  const [comment, setComment] = useState('');
  const [faxNumber, setFaxNumber] = useState('');
  const [faxType, setFaxType] = useState('');
  const [about, setAbout] = useState('');
  const [files, setFiles] = useState('');

  const token = localStorage.getItem('userToken');

  useEffect(() => {
    axios
      .get(`destinations`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDestinations(res?.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const handleDestinationChange = (e) => {
    const destinationId = e.target.value;
    setSelectedDestination(destinationId);

    axios
      .get(`subjects/${destinationId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSubjects(res?.data.data);
        setSelectedSubject('');
        setAbouts([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubjectChange = (e) => {
    const subjectId = e.target.value;
    setSelectedSubject(subjectId);

    axios
      .get(`about/${subjectId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAbouts(res?.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelSubmt = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(
        `faxes/add`,
        {
          comment,
          faxNumber,
          faxType,
          files: [
            'public\\uploads\\66a391bf200ed376eceb3d11\\user-66a391bf200ed376eceb3d11-1722004966074-0.jpeg',
          ],
          about,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="dashboard d-flex flex-row">
      <div className="container text-center">
        <div className="shadow-none p-3 mt-3 mb-5 bg-body rounded main-title">
          <h2 className="fs-1 fw-bold text-dark shadow p-3 mb-5 bg-body-tertiary rounded">
            اضافة فاكس جديد
          </h2>
        </div>

        <div className="drop-down mb-5 d-flex justify-content-between align-items-center">
          <select
            className="form-select ms-3"
            aria-label="Default select example"
            onChange={handleDestinationChange}
            value={selectedDestination}
          >
            <option value="">اسم الجهة</option>
            {destinations.map((destination) => (
              <option key={destination._id} value={destination._id}>
                {destination.name}
              </option>
            ))}
          </select>
          <select
            className="form-select ms-3"
            aria-label="Default select example"
            onChange={handleSubjectChange}
            value={selectedSubject}
            disabled={!selectedDestination}
          >
            <option value="">الموضوع</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            disabled={!selectedSubject}
          >
            <option value="">بشان</option>
            {abouts.map((aboutItem) => (
              <option key={aboutItem._id} value={aboutItem._id}>
                {aboutItem.name}
              </option>
            ))}
          </select>
        </div>

        <form
          onSubmit={handelSubmt}
          className="container d-flex justify-content-center align-items-center flex-wrap my-4"
        >
          <div className="col-12 text-end fw-bold fs-5 mb-4">
            <label htmlFor="input1" className="form-label">
              رقم الفاكس
            </label>
            <input
              name="input1"
              type="text"
              className="form-control"
              id="input1"
              required
              value={faxNumber}
              onChange={(e) => setFaxNumber(e.target.value)}
              placeholder="اضف رقم الفاكس*"
            />
          </div>
          <div className="col-12 text-end fw-bold fs-5 mb-4">
            <label htmlFor="input1" className="form-label">
              نوع الفاكس
            </label>
            <input
              name="input1"
              type="text"
              className="form-control"
              id="input1"
              required
              value={faxType}
              onChange={(e) => setFaxType(e.target.value)}
              placeholder=" اضف نوع الفاكس *"
            />
          </div>
          <div className="col-12 text-end fw-bold fs-5 mb-4">
            <label htmlFor="input1" className="form-label">
              تعليق
            </label>
            <input
              name="input1"
              type="text"
              className="form-control"
              id="input1"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="اضف تعليق*"
            />
          </div>
          <div className="col-12 text-end fw-bold fs-5 mb-4">
            <label htmlFor="input1" className="form-label">
              ملف الفاكس
            </label>
            <input
              name="input1"
              type="file "
              className="form-control"
              id="input1"
              required
              value={files}
              onChange={(e) => setFiles(e.target.value)}
              placeholder=""
            />
          </div>

          {!loading && (
            <button
              onClick={() => navigate('/')}
              type="submit"
              className="d-grid col-3 py-3 fs-4 fw-bold align-content-center mx-auto btn btn-primary  mb-4"
            >
              اضافة
            </button>
          )}
          {loading && (
            <button className="d-grid col-3 py-3 fs-4 fw-bold align-content-center mx-auto btn btn-outline-primary mb-4">
              جاري الاضافة ...
            </button>
          )}
          <button
            onClick={() => navigate(`/`)}
            className="d-grid col-3 py-3 fs-4 fw-bold align-content-center mx-auto btn btn-danger mb-4"
          >
            الغاء
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewFax;
