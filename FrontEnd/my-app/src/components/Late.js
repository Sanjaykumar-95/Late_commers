import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component'
import TimePicker from 'react-time-picker';
import XLSX from 'xlsx';
import Sidebar from './Sidebar';

function Late() {

  const columns = [
    // {
    //   name:"S.No",
    //   selector:row => row.sno,
    //   sortable:true
    // },
    {
      name: 'Roll No',
      selector: row => row.RollNo,
      sortable: true
    },
    {
      name: "Name",
      selector: row => row.Name,
      sortable: true
    },
    {
      name: "Batch",
      selector: row => row.Batch,
      sortable: true
    },
    {
      name: "Course",
      selector: row => row.Course,
      sortable: true
    },
    {
      name: "Time",
      selector: row => row.Time,
      sortable: true
    }
  ];


  const [data, setData] = useState([])
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Fetch data from the "students" database
    axios
      .get('http://localhost:8585/students')
      .then((res) => {
        const allStudents = res.data;
        const filteredStudents = allStudents.filter((student) => {
        if (student.status === 0 && student.Time) {
          const timeParts = student.Time.split(":");
          const hour = parseInt(timeParts[0]);
          const minute = parseInt(timeParts[1]);
          return (hour >= 9 && minute >= 30) || (hour >= 1 && minute >= 30);
        }
        return false;
      });
      setData(allStudents); // Set all students
      setRecords(filteredStudents);
      })
      .catch((err) => console.log(err));
  }, []);

  let pres = 0;
  let abs = 0;
  let lat = 0;

  data.map((stat) => {
    if (stat.status === 1) {
      pres++;
    }
    else if(stat.status === 0){
      abs++;
    }
  });

  function handleFilter(event) {
    const filterText = event.target.value.toLowerCase();
    const filteredData = data.filter((student) => {
      if (student.status === 0 && student.Time) {
        const timeParts = student.Time.split(":");
        const hour = parseInt(timeParts[0]);
        const minute = parseInt(timeParts[1]);
        return (
          student.RollNo.toLowerCase().includes(filterText) &&
          ((hour >= 9 && minute >= 30) || (hour >= 1 && minute >= 30))
        );
      }
      return false;
    });
    setRecords(filteredData);
  }
  


  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(records);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');
    XLSX.writeFile(workBook, 'data.xlsx');
  };

  const [time, setTime] = useState('10:00');

  function handleChange(value) {
    setTime(value);
  }

  return (
    <Sidebar>
      <div>
        <div className='row' style={{ color: "white" }}>
          <div className="col-lg-3 col-6">
            <div className="small-box" style={{ backgroundColor: "#DF992F" }}>
              <div className="inner">
                <h3>{data.length}</h3>
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

              <Link to="/present" className='small-box-footer'>
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

              <Link to="/absent" className='small-box-footer'>
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
                <h3>{records.length}</h3>
                <p>Late</p>
              </div>


              <Link to="/late" className='small-box-footer'>
                More Info
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
              </Link>

            </div>
          </div>
        </div>
        <br></br>

        <div className='card'>

          <div className='card-body'>

            {/* <div className='table-responsive' style={{ display: "block", width: "100%"  , paddingLeft: "0"}}></div> */}

            <div class="row" style={{ display: "flex", flexWrap: "wrap" }}>

              <div class="col-sm-12 col-md-4" style={{ paddingLeft: "0" }}>
                <div class="dt-buttons btn-group">
                  <button class="btn btn-outline-secondary buttons-copy buttons-html5" tabindex="0" aria-controls="example2" type="button">
                    <span>Copy</span>
                  </button>
                  <button class="btn btn-outline-secondary buttons-excel buttons-html5" tabindex="0" aria-controls="example2" type="button" onClick={downloadExcel}>
                    <span>Excel</span>
                  </button>
                  <button class="btn btn-outline-secondary buttons-pdf buttons-html5" tabindex="0" aria-controls="example2" type="button">
                    <span>PDF</span>
                  </button>
                  <button class="btn btn-outline-secondary buttons-print" tabindex="0" aria-controls="example2" type="button">
                    <span>Print</span>
                  </button>
                </div>
              </div>

              <div className='col-md-4' style={{ textAlign: "center" }}><h1 style={{ fontSize: "35px" }}>
                Late Comers

                {/* <TimePicker
                  onChange={handleChange}
                  value={time}
                  style={{textAlign:"right"}}
                /> */}
              </h1></div>

              <div class="col-sm-12 col-md-4">
                <div id="example2_filter" class="dataTables_filter" style={{ color: "black", textAlign: "right" }}>
                  Search:
                  <label>
                    <input type="search" class="form-control" placeholder="Roll No Search" aria-controls="example2" onChange={handleFilter}></input>
                  </label>
                </div>
              </div>
            </div>

            <div className='row'>
              <DataTable columns={columns}
                data={records}
                fixedHeader
                pagination
              ></DataTable>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  )

}

export default Late;