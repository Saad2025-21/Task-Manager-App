import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const INK = "#1a1a17";
const INK_MUTED = "#6b6b65";
const LINE = "#e8e8e2";

/* ---------- Stats (kept for compatibility; the dashboard now renders its own cards) ---------- */
export function Stats({ stats }) {
    return (
        <div className="flex flex-wrap gap-6">
            {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                    <span className="h-5 w-1.5 rounded-pill" style={{ backgroundColor: s.color }} />
                    <span className="text-heading font-bold text-ink">{s.value}</span>
                    <span className="text-small text-ink-muted">{s.label}</span>
                </div>
            ))}
        </div>
    );
}

/* ---------- Shared legend ---------- */
function Legend({ items }) {
    return (
        <ul className="shrink-0 flex flex-wrap justify-center gap-x-5 gap-y-1 pt-2">
            {items.map((d) => (
                <li key={d.name} className="flex items-center gap-2 text-small text-ink-muted">
                    <span className="h-2.5 w-2.5 rounded-pill" style={{ backgroundColor: d.color }} />
                    {d.name}
                    <span className="font-semibold text-ink">{d.value}</span>
                </li>
            ))}
        </ul>
    );
}

/* ---------- Task distribution (donut) ---------- */
export function TaskDistributionChart({ data }) {
    const total = data.reduce((sum, d) => sum + (Number(d.value) || 0), 0);

    return (
        <div className="flex flex-col h-full min-h-0">
            <h2 className="shrink-0 text-heading text-ink">Task Distribution</h2>

            {/* flex-1 + absolute inner box = chart always fits the card, never clipped */}
            <div className="relative flex-1 min-h-0">
                <div className="absolute inset-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                innerRadius="62%"
                                outerRadius="92%"
                                paddingAngle={2}
                                stroke="none"
                            >
                                {data.map((d) => (
                                    <Cell key={d.name} fill={d.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* total in the middle of the donut */}
                <div className="absolute inset-0 grid place-items-center pointer-events-none">
                    <div className="text-center leading-tight">
                        <p className="text-stat text-ink">{total}</p>
                        <p className="text-tiny text-ink-muted">Total</p>
                    </div>
                </div>
            </div>

            <Legend items={data} />
        </div>
    );
}

/* ---------- Task priority levels (bars) ---------- */
export function TaskPriorityChart({ data }) {
    return (
        <div className="flex flex-col h-full min-h-0">
            <h2 className="shrink-0 text-heading text-ink">Task Priority Levels</h2>

            <div className="relative flex-1 min-h-0 mt-2">
                <div className="absolute inset-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                            <CartesianGrid vertical={false} stroke={LINE} strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: INK_MUTED, fontSize: 12 }}
                            />
                            <YAxis
                                allowDecimals={false}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: INK_MUTED, fontSize: 12 }}
                            />
                            <Tooltip cursor={{ fill: "rgba(20,113,78,0.08)" }} />
                            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={56}>
                                {data.map((d) => (
                                    <Cell key={d.name} fill={d.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <Legend items={data} />
        </div>
    );
}