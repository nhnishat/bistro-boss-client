import { useQuery } from '@tanstack/react-query';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const getPath = (x, y, width, height) => {
	return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
		y + height / 3
	}
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
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index,
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? 'start' : 'end'}
			dominantBaseline="central"
		>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

const AdminHome = () => {
	const { user } = useAuth();
	const [axiosSecure] = useAxiosSecure();
	const { data: stats = [] } = useQuery({
		queryKey: ['admin-stats'],
		queryFn: async () => {
			const res = await axiosSecure('/admin-stats');
			return res.data;
		},
	});

	const { data: chartData = [] } = useQuery({
		queryKey: ['chart-data'],
		queryFn: async () => {
			const res = await axiosSecure('/order-stats');
			return res.data;
		},
	});
	console.log(chartData);
	return (
		<div className="w-full m-4">
			<h2 className="text-3xl">Hi, {user.displayName} !</h2>

			<div className="stats shadow">
				<div className="stat place-items-center">
					<div className="stat-title">Revenue</div>
					<div className="stat-value">${stats.revenue}</div>
					<div className="stat-desc">revenue</div>
				</div>

				<div className="stat place-items-center">
					<div className="stat-title">Users</div>
					<div className="stat-value text-secondary">{stats.users}</div>
					<div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
				</div>

				<div className="stat place-items-center">
					<div className="stat-title">Menu Items</div>
					<div className="stat-value">{stats.products}</div>
					<div className="stat-desc">↘︎ 90 (14%)</div>
				</div>

				<div className="stat place-items-center">
					<div className="stat-title">Orders</div>
					<div className="stat-value">{stats.orders}</div>
					<div className="stat-desc">↘︎ 90 (14%)</div>
				</div>
			</div>
			<div className="flex my-20">
				<div className="w-1/2">
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
							dataKey="total"
							fill="#8884d8"
							shape={<TriangleBar />}
							label={{ position: 'top' }}
						>
							{chartData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={colors[index % 20]} />
							))}
						</Bar>
					</BarChart>
				</div>
				<div className="w-1/2">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart width={400} height={400}>
							<Legend />
							<Pie
								data={chartData}
								cx="50%"
								cy="50%"
								labelLine={false}
								label={renderCustomizedLabel}
								outerRadius={80}
								fill="#8884d8"
								dataKey="count"
							>
								{chartData.map((entry, index) => (
									<Cell
										name={entry.category}
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};

export default AdminHome;
