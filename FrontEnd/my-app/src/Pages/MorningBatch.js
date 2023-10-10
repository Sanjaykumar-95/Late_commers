import React, { useState } from 'react';
import { useEffect } from "react";
import axios from "axios";
import XLSX from 'xlsx';
import DataTable from 'react-data-table-component'
import TextField from '@material-ui/core/TextField';
import Sidebar from '../components/Sidebar';

const Morning = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8585/Morningstudents')
      .then(res => {
        setData(res.data)
        setRecords(res.data.filter(student => student.Batch === "Morning"))
      }).catch(err => console.log(err))
  }, []);

  const formattedData = data.map(row => {
    return {
      ...row,
      formattedStatus: row.status === 1 ? "Present" : "Absent"
    }
  });

  const columns = [
    // {
    //   name:"S.No",
    //   selector:row => row.sno,
    //   sortable:true
    // },
    {
        name:'Roll No',
        selector:row => row.RollNo,
        sortable:true
    },
    {
      name:"Name",
      selector:row => row.Name,
      sortable:true
    },
    {
      name:"Batch",
      selector:row => row.Batch,
      sortable:true
    },
    {
        name:"Course",
        selector:row => row.Course,
        sortable:true
    }
    // {
    //       name:"Time",
    //       selector:row => row.Time,
    //       sortable:true
    // },
    // {
    //   name:"Status",
    //   selector:"formattedStatus",
    //   sortable:true
    // }
  ];

  const [selectedCourse, setSelectedCourse] = useState('');
  const [records,setRecords] = useState([]);
  

  function handleFilter(event) {
    setSelectedCourse(event.target.value);
  
    const filteredData = formattedData.filter((row) => {
      if (event.target.value === "All") {
        return row.Batch === 'Morning';
      }
      
      return (
        (row.Course.toLowerCase().includes(event.target.value.toLowerCase()) ||
          row.Name.toLowerCase().includes(event.target.value.toLowerCase()) ||
          row.RollNo.toLowerCase().includes(event.target.value.toLowerCase())) &&
        row.Batch === 'Morning'
      );
    });
    setRecords(filteredData);
  }
  


  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(records);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');
    XLSX.writeFile(workBook, 'data.xlsx');
  };



  return (
    <Sidebar>
      <div class="container-fluid">
        <div className="Mrng">
          <table class="table table-bordered border-primary">
            <thead>
              <tr><th scope="col" colspan="4"><h4>Morning Batch</h4></th>
              </tr>
              <tr>
                <td>
                  <div class="row">
                    <div class="form-group col-md-12">
                      <div class="input-group">
                        <div class="input-group-addon">
                          <i class="fa fa-black-tie" aria-hidden="true"></i>
                        </div>

                        <select name="number" class="form-control" onChange={handleFilter} value={selectedCourse}>
                          <option selected>All</option>
                          <option>FSD</option>
                          <option>Devops</option>
                          <option>ML</option>
                          <option>AWS Cloud</option>
                        </select>

                      </div>
                    </div>
                  </div>
                </td>


                <td>
                  <div class="row">
                    <div class="form-group col-md-12">
                      <div class="input-group">
                        <div class="input-group-addon">
                          <i class="fa fa-black-tie" aria-hidden="true"></i>
                        </div>
                        <select name="number" class="form-control" /*style={{ borderColor: 'transparent' }}*/>
                          <option selected>All</option>
                          <option>Late</option>
                          <option>Permission</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* <select style={{ borderColor: 'transparent' }}>


                <option value="">All</option>
                <option value="">Late</option>

                <option value="">Permission</option>


              </select> */}
                </td>

                <td>
                  <TextField
                    id="date"
                    type="date"
                    defaultValue=""
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </td>
              </tr>
            </thead>
          </table>



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

              <div className='col-md-4'></div>

              <div class="col-sm-12 col-md-4">
                <div id="example2_filter" class="dataTables_filter" style={{ color: "black", textAlign:"right" }}>
                  Search:
                  <label>
                    <input type="search" class="form-control" placeholder="Roll No Search" aria-controls="example2" onChange={handleFilter}></input>
                  </label>
                </div>
              </div>
            </div>

            <br></br>
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
      </div>
    </Sidebar>
  );
}

export default Morning;