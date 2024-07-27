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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTM5MTc2MjI0NTM2NjcxNTI3NGRiNyIsImlhdCI6MTcyMjAxNDA3OSwiZXhwIjoxNzIyMTAwNDc5fQ.N8TUdbC2vROvMrAeEOZYd50x_Jc7Gt6wJ5H0yS1oRQgda`,
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
        <Link to={'/AddNewFax'}>
          <button
            type="button"
            className="btn my-5 text-start d-block p-3 btn-secondary"
          >
            اضافة فاكس جديد
          </button>
        </Link>
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
        <table className="table text-center table-hover text-dark  p-5 my-5">
          <thead>
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">الاسم</th>
              <th className="p-4"> رقم الفاكس</th>
              <th className="p-4"> نوع الفاكس</th>
              <th className="p-4">التاريخ</th>
              <th className="p-4">الاحداث</th>
            </tr>
          </thead>
          <tbody className="text-center p-5 ">
            {/* {data?.filter(item => {
                return search.toLowerCase() ='' ? item :item.firstName.toLowerCase().includes(search)
            }).map((item, index) => (
              
            ))} */}

            {data?.data?.map((item, index) => (
              <tr>
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{item?.user?.username}</td>
                <td className="p-3">{item?.faxNumber}</td>
                <td className="p-3">{item?.faxType}</td>
                <td className="p-3">{item?.date.slice(2, 10)}</td>
                <td className="p-3">
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
