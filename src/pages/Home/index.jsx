import { useAuth } from '@/context/Auth';
import { useState, useEffect } from 'react';
import axios from '@/api/axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  // console.log(search);

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`faxes`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTM5MTc2MjI0NTM2NjcxNTI3NGRiNyIsImlhdCI6MTcyMjAxNDA3OSwiZXhwIjoxNzIyMTAwNDc5fQ.N8TUdbC2vROvMrAeEOZYd50x_Jc7Gt6wJ5H0yS1oRQg`,
        },
      })
      .then((res) => {
        setData(res?.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error('حدث خطا ');
      });
  }, []);
  console.log('data from fax admin', data?.data);
  return (
    <>
      <div className="container">
        <h1 className="text-center my-5 text-dark fw-bolder shadow p-3 mb-5 rounded main-color ">
          جميع الفكسات
        </h1>
        <input
          className="form-control"
          list="datalistOptions"
          id="exampleDataList"
          placeholder="أكتب للبحث ..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <datalist id="datalistOptions">
          <option value="San Francisco" />
          <option value="New York" />
          <option value="Seattle" />
          <option value="Los Angeles" />
          <option value="Chicago" />
        </datalist>
        <table className="table hover text-dark  p-5 my-5">
          <thead>
            <tr>
              <th>#</th>
              <th>الاسم</th>
              <th>النوع</th>
              <th>الرقم</th>
              <th>الايميل</th>
              <th className="text-end">الاحداث</th>
            </tr>
          </thead>
          <tbody>
            {/* {data?.filter(item => {
                return search.toLowerCase() ='' ? item :item.firstName.toLowerCase().includes(search)
            }).map((item, index) => (
            ))} */}

            {data?.data?.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item?.user?.username}</td>
                <td>{item?.faxNumber}</td>
                <td>{item?.faxType}</td>
                <td>{item?.about?.name}</td>
                <td>
                  <Link to={`/update/${item._id}`} state={{ item: item }}>
                    <button className="btn btn-outline-success mx-2 px-4">
                      تعديل
                    </button>
                  </Link>
                  <Link to={`/Details/${item._id}`} state={{ item: item }}>
                    <button className="btn btn-outline-info mx-2 px-4">
                      التفاصيل
                    </button>
                  </Link>
                  <button
                    // onClick={() => handelDelete(item._id)}
                    className="btn btn-outline-danger mx-2 px-4"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
