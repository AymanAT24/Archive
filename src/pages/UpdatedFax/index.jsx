import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import axios from '@/api/axios';

const UpdatedFax = () => {
  const navigate = useNavigate();
  const item = useLocation()?.state?.item;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(item.name);
  const [data, setData] = useState([]);
  const [comment, setComment] = useState(item?.comment);
  const [faxNumber, setFaxNumber] = useState(item?.faxNumber);
  const [faxType, setFaxType] = useState(item?.faxType);
  const [about, setAbout] = useState(item?.about.name);
  const [files, setFiles] = useState(item?.files[0]);

  const handelSubmt = (e) => {
    e.preventDefault();
    setLoading(true);
    let token = localStorage.getItem('userToken');
    axios
      .patch(
        `faxes/${item?._id}`,
        {
          comment: comment,
          faxNumber: faxNumber,
          faxType: faxType,
          files: [
            'public\\uploads\\66a391bf200ed376eceb3d11\\user-66a391bf200ed376eceb3d11-1722004966074-0.jpeg',
          ],
          about: item?.about?._id,
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

  console.log('item', item);
  return (
    <div className="dashboard d-flex flex-row">
      <div className="container text-center">
        <div className="shadow-none p-3 mt-3 mb-5 bg-body rounded main-title">
          <h2 className="fs-1 fw-bold text-dark shadow p-3 mb-5 bg-body-tertiary rounded">
            تعديل
          </h2>
        </div>
        <form
          onSubmit={handelSubmt}
          className="container d-flex flex-row justify-content-center align-content-center flex-wrap my-4"
        >
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
          {/* <div className="col-12 text-end fw-bold fs-5 mb-4">
            <label htmlFor="input1" className="form-label">
              بشأن
            </label>
            <input
              name="input1"
              type="text"
              className="form-control"
              id="input1"
              required
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder=" اضف  موضوع الفاكس*"
            />
          </div> */}
          <div className="col-12 text-end fw-bold fs-5 mb-4">
            <label htmlFor="input1" className="form-label">
              ملف الفاكس
            </label>
            <input
              name="input1"
              type="text"
              className="form-control"
              id="input1"
              required
              value={files}
              onChange={(e) => setFiles(e.target.value)}
              placeholder=""
              disabled
            />
          </div>

          {!loading && (
            <button
              type="submit"
              className="d-grid col-3 py-3 fs-4 fw-bold align-content-center mx-auto btn btn-primary  mb-4"
            >
              تعديل بيانات
            </button>
          )}
          {loading && (
            <button className="d-grid col-3 py-3 fs-4 fw-bold align-content-center mx-auto btn btn-outline-primary mb-4">
              جاري التعديل ...
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

export default UpdatedFax;
