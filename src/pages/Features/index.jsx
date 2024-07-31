import React, { useState, useEffect } from 'react';
import axios from '@/api/axios';
import './Features.css';
import { Header } from '@/layout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Features = () => {
  const [destinations, setDestinations] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [abouts, setAbouts] = useState([]);

  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedAbout, setSelectedAbout] = useState('');

  const [newDestination, setNewDestination] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newAbout, setNewAbout] = useState('');

  const [token, setToken] = useState(localStorage.getItem('userToken'));
  const [userRole, setUserRole] = useState('');

  const [destinationId, setDestinationId] = useState(null);
  const [subjectId, setSubjectId] = useState(null);
  const [aboutId, setAboutId] = useState(null);

  const [isSubjectEnabled, setIsSubjectEnabled] = useState(false);
  const [isAboutEnabled, setIsAboutEnabled] = useState(false);

  const [isDestinationSelected, setIsDestinationSelected] = useState(false);
  const [isSubjectSelected, setIsSubjectSelected] = useState(false);
  const [isAboutSelected, setIsAboutSelected] = useState(false);

  const [isTypingNewDestination, setIsTypingNewDestination] = useState(false);

  useEffect(() => {
    axios
      .get('destinations', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDestinations(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [token]);

  useEffect(() => {
    if (selectedDestination) {
      axios
        .get(`subjects/${selectedDestination}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setSubjects(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedDestination, token]);

  useEffect(() => {
    axios
      .get(`about/${selectedSubject}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAbouts(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [selectedSubject, token]);

  useEffect(() => {
    axios
      .get('user/myProfile', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setUserRole(res.data.data.role);
      })
      .catch((err) => console.log(err));
  }, [token]);

  const handleConfirmDestination = () => {
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
      .then((res) => {
        if (res.data.status) {
          setDestinationId(res.data._id);
          setIsSubjectEnabled(true);
          setIsDestinationSelected(true);
          toast.success('تم انشاء الجهة');

          // window.location.reload();
        } else {
          toast.error('اسم الجهه موجود من قبل');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('اسم الجهه موجود من قبل');
      });
  };

  const handleConfirmSubject = () => {
    if (!selectedDestination && !destinationId) {
      toast.error('الجهة غير محددة');
      return;
    }
    const selectedId = selectedDestination || destinationId;
    axios
      .post(
        'subjects/add',
        { name: newSubject, destination: selectedId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          setSubjectId(res.data.doc._id);
          setIsAboutEnabled(true);
          setIsSubjectSelected(true);
          toast.success('تم انشاء الموضوع');
          // window.location.reload();
        } else {
          toast.error('حدث خطأ أثناء الإنشاء');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('حدث خطأ أثناء الإنشاء');
      });
  };

  const handleConfirmAbout = () => {
    if (!selectedSubject && !subjectId) {
      toast.error('الموضوع غير محدد');
      return;
    }
    axios
      .post(
        'about/add',
        { name: newAbout, subject: subjectId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          toast.success('تم انشاء البشان');
          setIsAboutSelected(true);
          window.location.reload();
        } else {
          toast.error('حدث خطأ أثناء الإنشاء');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('حدث خطأ أثناء الإنشاء');
      });
  };

  const handleSelectDestination = (e) => {
    const selectedId = e.target.value;
    setSelectedDestination(selectedId);
    setIsDestinationSelected(!!selectedId);
    setIsTypingNewDestination();
    setIsSubjectEnabled(true);
    setDestinationId(selectedId);
    // Reset typing states and enable states for the next sections
    setIsTypingNewSubject(false);
    setIsTypingNewAbout(false);
    setIsSubjectEnabled(!!selectedId);
    setIsAboutEnabled(false);
  };

  const handleSelectSubject = (e) => {
    const selectedId = e.target.value;
    setSelectedSubject(selectedId);
    setIsSubjectSelected(!!selectedId);
    setIsAboutEnabled(true);
    setSubjectId(selectedId);
    // Reset typing state for the next section
    setIsTypingNewAbout(false);
  };

  const handleSelectAbout = (e) => {
    const selectedId = e.target.value;
    setSelectedAbout(selectedId);
    setIsAboutSelected(!!selectedId);
    setAboutId(selectedId);
  };

  const handleDestinationInputChange = (e) => {
    const value = e.target.value;
    setNewDestination(value);
    setIsTypingNewDestination(value.trim() !== '');

    if (value.trim() === '') {
      setIsSubjectEnabled(false);
      setIsAboutEnabled(false);
      setSelectedDestination('');
      setIsDestinationSelected(false);
    }
  };

  const handleSubjectInputChange = (e) => {
    const value = e.target.value;
    setNewSubject(value);
    if (value.trim() === '') {
      setIsAboutEnabled(false);
      setSelectedSubject('');
      setIsSubjectSelected(false);
    }
  };

  const handleAboutInputChange = (e) => {
    const value = e.target.value;
    setNewAbout(value);
    if (value.trim() === '') {
      setSelectedAbout('');
      setIsAboutSelected(false);
    }
  };

  const handleEditDestination = () => {
    if (!selectedDestination) {
      toast.error('يرجى تحديد الجهة لتعديلها');
      return;
    }

    axios
      .patch(
        `destinations/${selectedDestination}`,
        { name: newDestination },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          toast.success('تم تعديل الجهة بنجاح');
          // Optionally, update state to reflect changes
        } else {
          toast.error('حدث خطأ أثناء التعديل');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('حدث خطأ أثناء التعديل');
      });
  };

  const handleEditSubject = () => {
    if (!selectedSubject) {
      toast.error('يرجى تحديد الموضوع لتعديله');
      return;
    }
    axios
      .patch(
        `subjects/${selectedSubject}`,
        { name: newSubject },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          toast.success('تم تعديل الموضوع بنجاح');
          // Optionally, update state to reflect changes
        } else {
          toast.error('حدث خطأ أثناء التعديل');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('حدث خطأ أثناء التعديل');
      });
  };

  const handleEditAbout = () => {
    if (!selectedAbout) {
      toast.error('يرجى تحديد البشان لتعديله');
      return;
    }
    axios
      .patch(
        `about/${selectedAbout}`,
        { name: newAbout },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          toast.success('تم تعديل البشان بنجاح');
          // Optionally, update state to reflect changes
        } else {
          toast.error('حدث خطأ أثناء التعديل');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('حدث خطأ أثناء التعديل');
      });
  };

  const handleDeleteDestination = () => {
    if (!selectedDestination) {
      toast.error('يرجى تحديد الجهة لحذفها');
      return;
    }
    axios
      .delete(`destinations/${selectedDestination}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status) {
          toast.success('تم حذف الجهة بنجاح');
          // Optionally, update state to reflect changes
        } else {
          toast.error('حدث خطأ أثناء الحذف');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('حدث خطأ أثناء الحذف');
      });
  };

  const handleDeleteSubject = () => {
    if (!selectedSubject) {
      toast.error('يرجى تحديد الموضوع لحذفه');
      return;
    }
    axios
      .delete(`subjects/${selectedSubject}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status) {
          toast.success('تم حذف الموضوع بنجاح');
          // Optionally, update state to reflect changes
        } else {
          toast.error('حدث خطأ أثناء الحذف');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('حدث خطأ أثناء الحذف');
      });
  };

  const handleDeleteAbout = () => {
    if (!selectedAbout) {
      toast.error('يرجى تحديد البشان لحذفه');
      return;
    }
    axios
      .delete(`about/${selectedAbout}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status) {
          toast.success('تم حذف البشان بنجاح');
          // Optionally, update state to reflect changes
        } else {
          toast.error('حدث خطأ أثناء الحذف');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('حدث خطأ أثناء الحذف');
      });
  };

  return (
    <div className="features-container bg-light text-center p-5">
      <div className="shadow-none p-3 mb-5 bg-body-light rounded main-title">
        <Header />
        <h2 className="fs-1 fw-bold text-light shadow p-3 my-5 bg-body-light rounded">
          الخصائص
        </h2>
      </div>
      <div className="add-new-entry">
        <div className="d-flex flex-column mb-4">
          <select
            className="form-control mb-2"
            value={selectedDestination}
            onChange={handleSelectDestination}
          >
            <option value="">اختر جهة</option>
            {destinations.map((destination) => (
              <option key={destination._id} value={destination._id}>
                {destination.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="اضافة اسم جهة جديد"
            value={newDestination}
            onChange={handleDestinationInputChange}
          />
          <div className="btn-group">
            <button
              className="btn btn-primary confirm-btn"
              onClick={handleConfirmDestination}
              disabled={!isTypingNewDestination}
            >
              اضافة
            </button>
            {userRole !== 'user' && (
              <>
                <button
                  className="btn btn-success"
                  onClick={handleEditDestination}
                  disabled={!selectedDestination && !isTypingNewDestination}
                >
                  تعديل
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteDestination}
                  disabled={!selectedDestination && !isTypingNewDestination}
                >
                  حذف
                </button>
              </>
            )}
          </div>
        </div>

        <div className="d-flex flex-column mb-4">
          <select
            className="form-control mb-2"
            value={selectedSubject}
            onChange={handleSelectSubject}
            disabled={!isSubjectEnabled}
          >
            <option value="">اختر موضوع</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="اضافة اسم موضوع جديد"
            value={newSubject}
            onChange={handleSubjectInputChange}
          />
          <div className="btn-group">
            <button
              className="btn btn-primary"
              onClick={handleConfirmSubject}
              disabled={!isSubjectEnabled}
            >
              اضافة
            </button>
            {userRole !== 'user' && (
              <>
                <button
                  className="btn btn-success"
                  onClick={handleEditSubject}
                  disabled={!selectedSubject && !newSubject}
                >
                  تعديل
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteSubject}
                  disabled={!selectedSubject && !newSubject}
                >
                  حذف
                </button>
              </>
            )}
          </div>
        </div>

        <div className="d-flex flex-column mb-4">
          <select
            className="form-control mb-2"
            value={selectedAbout}
            onChange={handleSelectAbout}
            disabled={!isAboutEnabled}
          >
            <option value="">اختر بشان</option>
            {abouts.map((about) => (
              <option key={about._id} value={about._id}>
                {about.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="اضافة اسم بشان جديد"
            value={newAbout}
            onChange={handleAboutInputChange}
          />
          <div className="btn-group">
            <button
              className="btn btn-primary"
              onClick={handleConfirmAbout}
              disabled={!isAboutEnabled}
            >
              اضافة
            </button>
            {userRole !== 'user' && (
              <>
                <button
                  className="btn btn-success"
                  onClick={handleEditAbout}
                  disabled={!selectedAbout && !newAbout}
                >
                  تعديل
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteAbout}
                  disabled={!selectedAbout && !newAbout}
                >
                  حذف
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Features;
