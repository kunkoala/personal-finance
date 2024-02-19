import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { Card } from "react-bootstrap";

const IncomeExpenseChart = ({ dataToPlot }) => {
  const aggregateData = [
    {
      name: "Total",
      income: dataToPlot
        .filter((item) => item.type === "income")
        .reduce((acc, item) => acc + item.amount, 0),
      expense: dataToPlot
        .filter((item) => item.type === "expense")
        .reduce((acc, item) => acc + item.amount, 0),
    },
  ];

  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <Card style={{ width: "40%" }}>
        <Card.Body>
          <Card.Title>Financial Overview</Card.Title>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              width={600}
              height={300}
              data={aggregateData}
              barGap={50}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid stroke="#4d4d4d" strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip  />
              <Legend
                width={100}
                wrapperStyle={{
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #d5d5d5",
                  borderRadius: 3,
                  lineHeight: "40px",
                }}
              />
              <Bar dataKey="income" label fill="#4e7442" barSize={40} />
              <Bar dataKey="expense" fill="#ad4747" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </div>
  );
};

export default IncomeExpenseChart;
