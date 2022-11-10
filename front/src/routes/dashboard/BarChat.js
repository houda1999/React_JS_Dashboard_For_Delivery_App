import React from 'react'
import { ResponsiveContainer, LineChart, Line,
     BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './Styles/BarChart.css';
const data = [
  { label: 'January', sales: 100, leads: 41 },
  { label: 'February', sales: 35, leads: 79 },
  { label: 'March', sales: 75, leads: 57 },
  { label: 'April', sales: 51, leads: 47 },
  { label: 'May', sales: 41, leads: 63 },
  { label: 'June', sales: 47, leads: 71 },
  { label: 'Julliet', sales: 47, leads: 71 },
  { label: 'Aout', sales: 47, leads: 71 },
  { label: 'Septembre', sales: 47, leads: 71 },
  { label: 'Octobre', sales: 47, leads: 71 },
  { label: 'Novembre', sales: 47, leads: 71 },
  { label: 'Decembre', sales: 47, leads: 71 }
];

export default function ChartBar() {
  return (
    <div className="row chart-principal">
      <div className="section col-md-12">
        <h3 className="section-title bar-title">Taux de commandes </h3>
        <div className="section-content">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 15, right: 15, bottom: 15, left: 0}}>
              <XAxis dataKey="label" />
              <YAxis />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Tooltip />
             
              <Bar dataKey="sales" fill="#11cdef" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}
