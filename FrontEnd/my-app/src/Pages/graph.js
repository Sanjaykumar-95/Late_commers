import React from "react";
import { LineChart, ResponsiveContainer, Legend, Tooltip, Line, XAxis, YAxis, CartesianGrid } from 'recharts';


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

function Graph(){
    return(
        <div className="bg-body">
            <ResponsiveContainer width="100%" aspect={4}>
              <LineChart data={pdata}>
                <CartesianGrid />
                <XAxis dataKey="month"/>
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
    )
}

export default Graph;