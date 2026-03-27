import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";
import { BarChart, Bar, XAxis, YAxis} from "recharts";
import { Cell } from "recharts";

export  function Stats({ stats }) {
  return (
    <div className="flex flex-wrap gap-8 mt-5">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-2">
          <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: stat.color }} />
          <span className="text-gray-800 font-bold text-lg">{stat.value}</span>
          <span className="text-gray-400 text-sm">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}



 export  function TaskDistributionChart({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Task Distribution</h2>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [value, name]} />
        </PieChart>
      </ResponsiveContainer>
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-gray-500 text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}



export  function TaskPriorityChart({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Task Priority Levels</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barSize={60}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 13 }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            ticks={[0, 2, 4, 6, 8]}
          />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

