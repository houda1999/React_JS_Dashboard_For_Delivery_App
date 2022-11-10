import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line, YAxis, XAxis, CartesianGrid } from 'recharts';



const data2 = [
    {
        "name": "Jan",
        "Client": 3432,
        "Livreur": 2342
    },
    {
        "name": "Feb",
        "Client": 2342,
        "Livreur": 3246
    },
    {
        "name": "Mar",
        "Client": 565,
        "Livreur": 4556
    },
    {
        "name": "Apr",
        "Client": 6654,
        "Livreur": 4465
    },
    {
        "name": "May",
        "Client": 8765,
        "Livreur": 4553
    },
    {
        "name": "Jui",
        "Client": 3432,
        "Livreur": 2342
    },
    {
        "name": "Juil",
        "Client": 2342,
        "Livreur": 3246
    },
    {
        "name": "Aout",
        "Client": 4565,
        "Livreur": 4556
    },
    {
        "name": "Sep",
        "Client": 6654,
        "Livreur": 4465
    },
    {
        "name": "Oct",
        "Client": 8765,
        "Livreur": 4553
    },
    {
        "name": "Nov",
        "Client": 8765,
        "Livreur": 4553
    },
    {
        "name": "Dec",
        "Client": 8765,
        "Livreur": 4553
    }
]

function LineRechartComponent() {

    return (
        <ResponsiveContainer idth="100%" height={300}>
            <LineChart  height={250} data={data2}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0}  />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Client" stroke="#0095FF" />
                <Line type="monotone" dataKey="Livreur" stroke="#FF0000" />
            </LineChart>
        </ResponsiveContainer>
    )

}
function CompenentChart() {
    return (
        <div className="row" style={{marginTop:30}}>
            <div className="col Line">
                <h3 className="section-title bar-title">Taux de clients et livreurs </h3>
                <LineRechartComponent />
            </div>
        </div>
    )
}

export default CompenentChart;