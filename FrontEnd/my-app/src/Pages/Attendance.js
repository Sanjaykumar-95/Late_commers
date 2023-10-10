import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import atend from '../Pages/atend.jpg';

const Attendance = () => {
  const [values, setValues] = useState({
    RollNo: '',
    Name: '',
    Batch: '',
    Course: '',
  });

  const [rno, SetRno] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8585/students/${rno}`);
      const data = response.data;
      setValues({
        RollNo: data.RollNo,
        Name: data.Name,
        Batch: data.Batch,
        Course: data.Course,
      });
      console.log('Data fetched successfully:', data);
    } catch (error) {
      alert(error.message);
      console.log('Error occurred while fetching data:', error);
    }
  };

  return (
    <Sidebar>
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
        <div className="row">
          <div className="col-md-3">
            <img src={atend} alt="this is Student" style={{ width: '250px', height: '250px', border: '1px solid black' }} />
          </div>

          <div className="col-md-9">
            <form onSubmit={handleSubmit}>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>RollNo</th>
                    <td>
                      <input className="form-control" type="text" name="RollNo" value={rno} onChange={(e) => SetRno(e.target.value)} />
                    </td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{values.Name}</td>
                  </tr>
                  <tr>
                    <th>Batch</th>
                    <td>{values.Batch}</td>
                  </tr>
                  <tr>
                    <th>Course</th>
                    <td>{values.Course}</td>
                  </tr>
                </tbody>
              </table>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Attendance;
