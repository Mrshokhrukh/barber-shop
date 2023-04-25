import "./chart.scss";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Yanvar", Total: 500 },
  { name: "Fevral", Total: 700 },
  { name: "Mart", Total: 600 },
  { name: "Aprel", Total: 900 },
  { name: "May", Total: 600 },
  { name: "Iyun", Total: 900 },
  { name: "Iyul", Total: 700 },
  { name: "August", Total: 800 },
  { name: "Sentabr", Total: 600 },
  { name: "Octabr", Total: 500 },
  { name: "Noyabr", Total: 900 },
  { name: "Dekabr", Total: 600 },
];

const Chart = ({ aspect, title }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 10, left: 5, bottom: 5 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgba(0, 119, 255,0.5)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="rgba(142, 169, 243,0.3)" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="rgb(0, 119, 255)"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
