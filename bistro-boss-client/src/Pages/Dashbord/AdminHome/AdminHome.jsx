import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import useAxios from "../../../Hooks/useAxios";
import { SlWallet } from "react-icons/sl";
import { FaUser } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Sector,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const AdminHome = () => {
  const { user, loading } = UseAuth();
  const axiossequre = useAxios();

  // if data  site ir trying to read data before it is loded we can use *** 1st option use optional chane [{stats?.revenue}] *** 2nd option ro add a default value [const { data: stats={} } = useQuery({ })]

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-state"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiossequre.get("/admin-state");
      console.log(res.data);
      return res?.data;
    },
  });
  const { data: chartData = [] } = useQuery({
    queryKey: ["ordderState"],
    queryFn: async () => {
      const res = await axiossequre.get("/ordderState");
      return res.data;
    },
  });

  // console.log( 'stats',stats);
  //   const{menuItems,orders,revenue,users}=data;
  //   console.log(menuItems,users,orders,revenue);


  // custom shape for the bar chart

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // custom shape for the pi chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  // customize our data to mach the data type of the pi chaart
  const pieChartdata = chartData.map(data=>{
    return {name:data.category, value:data.totalRevenue}
  });
  console.log(pieChartdata);

  return (
    <div>
      admin home
      <h2 className=" uppercase text-xl">
        Hi welcome {user?.displayName ? user.displayName : "Back"}
      </h2>
      <div className="stats shadow w-full ">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <SlWallet className="text-2xl"></SlWallet>
          </div>
          <div className="stat-value">${stats?.revenue} </div>
          <div className="stat-title">Revinew</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUser className="text-2xl"></FaUser>
          </div>
          <div className="stat-value">{stats?.users}</div>
          <div className="stat-title">New Users</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <MdOutlineMenuBook className="text-2xl"></MdOutlineMenuBook>
          </div>
          <div className="stat-value">{stats?.menuItems}</div>
          <div className="stat-title">menuItems</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaTruck className="text-2xl"></FaTruck>
          </div>
          <div className="stat-value">{stats?.orders}</div>
          <div className="stat-title">Orders</div>
        </div>
      </div>
      <div className="flex">
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Bar
            dataKey="quantity"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
        <PieChart width={400} height={400}>
          <Pie
            data={pieChartdata}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartdata.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>
      </div>
    </div>
  );
};

export default AdminHome;
