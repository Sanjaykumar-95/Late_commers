import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LineChart, ResponsiveContainer, Legend, Tooltip, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import Sidebar from '../components/Sidebar';
import axios from 'axios';


const pdata = [
  {
    month: 'January',
    late: 500,
    absent: 100,
    present: 3400,
  },
  {
    month: 'February',
    late: 490,
    absent: 60,
    present: 3450
  },
  {
    month: 'March',
    late: 450,
    absent: 10,
    present: 3540
  },
  {
    month: 'April',
    late: 400,
    absent: 5,
    present: 3505
  },
  {
    month: 'May',
    late: 300,
    absent: 150,
    present: 3550
  },
  {
    month: 'June',
    late: 200,
    absent: 200,
    present: 3600
  },
  {
    month: 'July',
    late: 0,
    absent: 10,
    present: 3990
  },
  {
    month: 'Agust',
    late: 900,
    absent: 15,
    present: 3085
  },
  {
    month: 'September',
    late: 500,
    absent: 0,
    present: 3450
  },
  {
    month: 'October',
    late: 50,
    absent: 5,
    present: 3555
  },
  {
    month: 'November',
    late: 300,
    absent: 10,
    present: 3690
  },
  {
    month: 'December',
    late: 100,
    absent: 0,
    present: 3900
  },
];

const DashBoard = () => {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [lat, setLateCount] = useState(0);

  useEffect(() => {
    // Fetch data from the "students" database
    axios
      .get('http://localhost:8585/students')
      .then((res) => {
        setData(res.data); // Set data for the morning batch
        setRecords(res.data); // Set records to include all data

        const lateStudents = res.data.filter((student) => {
          if (student.Time) {
            const timeParts = student.Time.split(":");
            const hour = parseInt(timeParts[0]);
            const minute = parseInt(timeParts[1]);
            return (hour >= 9 && minute >= 30) || (hour >= 1 && minute >= 30);
          }
          return false;
        });
        setLateCount(lateStudents.length)
      })
      .catch((err) => console.log(err));
  }, []);

  let pres = 0;
  let abs = 0;
  // let lat = 0;

  data.forEach((stat) => {
    if (stat.status === 1) {
      pres++;
    } else if (stat.status === 0) {
      abs++;
    }
  });

  const filterChart = (month) => {
    console.log(month);

  }
  return (
    <Sidebar>
      <div className="container-fluid" style={{ color: "white" }}>
        <div className='row'>
          <div className="col-lg-3 col-6">
            <div className="small-box" style={{ backgroundColor: "#DF992F" }}>
              <div className="inner">
                <h3>{data.flat().length}</h3>
                <p>Trainees</p>
              </div>


              <Link to="/trainees" className='small-box-footer'>
                More Info
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
              </Link>


            </div>
          </div>

          <div className="col-lg-3 col-6" id='all'>
            <div className="small-box" style={{ backgroundColor: "#11AC3C" }}>
              <div className="inner">
                <h3>{pres}</h3>
                <p>Present</p>
              </div>

              <Link to="/present" className='small-box-footer' onClick={pres}>
                More Info
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
              </Link>


            </div>
          </div>

          <div className="col-lg-3 col-6" id='all'>
            <div className="small-box" style={{ backgroundColor: "#D31818" }}>
              <div className="inner">
                <h3>{abs}</h3>
                <p>Absent</p>
              </div>

              <Link to="/absent" className='small-box-footer' onClick={abs}
              >
                More Info
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
              </Link>


            </div>
          </div>

          <div className="col-lg-3 col-6" id='all'>
            <div className="small-box" style={{ backgroundColor: "#332D2D" }}>
              <div class="inner">
                <h3>{lat}</h3>
                <p>Late</p>
              </div>

              <Link to="/late" className='small-box-footer' onClick={lat}>
                More Info
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
              </Link>

            </div>
          </div>
        </div>

        <div className='row' style={{ backgroundColor: '#6895BF', borderRadius: '10px' }}>
          <div className='row' style={{ padding: "10px" }} id='graph'>
            <div className='col-md-3'>

              <input type='month' onChange={filterChart(this)} />

            </div>

            <div className='col-md-7'></div>
            <div className='col-md-2'>
              <button style={{ backgroundColor: '#7439db', padding: '20px', borderRadius: '10px', color: 'whitesmoke', width: "100%" }}>Check</button>
            </div>
          </div>

          <div className="row">
            <div className="bg-body">
              <ResponsiveContainer width="100%" aspect={4}>
                <LineChart data={pdata}>
                  <CartesianGrid />
                  <XAxis dataKey="month" />
                  <YAxis></YAxis>
                  <Legend />
                  <Tooltip />
                  <Line dataKey="present"
                    stroke="green" activeDot={{ r: 5 }} />
                  <Line dataKey="late"
                    stroke="orange" activeDot={{ r: 5 }} />
                  <Line dataKey="absent"
                    stroke="red" activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </Sidebar>
  )
}

export default DashBoard;