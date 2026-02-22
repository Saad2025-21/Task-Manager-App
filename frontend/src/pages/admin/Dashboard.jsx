import { useState } from "react";

// --- Sidebar ---
function Sidebar() {
  const [active, setActive] = useState(1);
  const icons = [
    <svg key="home" viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
    <svg key="mail" viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
    <svg key="chart" viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M5 9h2v11H5zm6-5h2v16h-2zm6 8h2v8h-2z"/></svg>,
    <svg key="star" viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>,
    <svg key="chat" viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>,
  ];

  return (
    <div className="w-16 flex flex-col items-center pt-4 gap-1"
      style={{ background: "#6c5fb7", boxShadow: "2px 0 12px rgba(108,95,183,0.15)" }}>
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-4 relative">
        <svg viewBox="0 0 24 24" fill="#6c5fb7" width="24" height="24">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
        </svg>
        <div className="w-2.5 h-2.5 rounded-full absolute bottom-0.5 right-0.5 border-2 border-white"
          style={{ background: "#4fc96a" }} />
      </div>

      {icons.map((icon, i) => (
        <button
          key={i}
          onClick={() => setActive(i)}
          className="w-11 h-11 rounded-xl border-none cursor-pointer flex items-center justify-center mb-0.5 transition-all duration-200 relative"
          style={{
            background: active === i ? "rgba(255,255,255,0.22)" : "transparent",
            color: active === i ? "#fff" : "rgba(255,255,255,0.55)",
          }}
        >
          {icon}
          {i === 1 && (
            <div className="w-2 h-2 rounded-full absolute top-2 right-2 border border-white"
              style={{ background: "#e85d8a" }} />
          )}
          {i === 4 && (
            <div className="w-2 h-2 rounded-full absolute top-2 right-2 border border-white"
              style={{ background: "#ff6b3d" }} />
          )}
        </button>
      ))}
    </div>
  );
}

// --- Calendar ---
const days = ["S", "M", "T", "W", "T", "F", "S"];
const aprilDays = [
  [null, 1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27],
  [28, 29, 30, 31, null, null, null],
];

function Calendar() {
  const [month] = useState("APRIL");
  return (
    <div className="flex-none w-52">
      {/* Month header */}
      <div className="flex items-center justify-between rounded-3xl px-3 py-1.5 mb-2.5"
        style={{ background: "#f5c842" }}>
        <button className="bg-transparent border-none cursor-pointer text-white font-bold text-base">‹</button>
        <span className="font-bold text-white tracking-widest text-sm">{month}</span>
        <button className="bg-transparent border-none cursor-pointer text-white font-bold text-base">›</button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 mb-0.5">
        {days.map((d, i) => (
          <div key={i} className="text-center text-xs font-bold py-0.5"
            style={{ color: i === 0 ? "#e85d8a" : "#6c5fb7" }}>
            {d}
          </div>
        ))}
      </div>

      {/* Dates */}
      {aprilDays.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7">
          {week.map((d, di) => (
            <div key={di}
              className="text-center text-xs flex items-center justify-center w-6 h-6 mx-auto my-px"
              style={{
                color: d === 9 ? "#fff" : di === 0 ? "#e85d8a" : "#555",
                background: d === 9 ? "#6c5fb7" : "transparent",
                borderRadius: d === 9 ? "50%" : 0,
                fontWeight: d === 9 ? 700 : 400,
                cursor: d ? "pointer" : "default",
              }}
            >
              {d || ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// --- Event List ---
const events = [
  { color: "#3ec9c0" },
  { color: "#e85d8a" },
  { color: "#f5c842" },
];

function EventList() {
  return (
    <div className="flex-1 flex flex-col gap-2.5 pl-3">
      {events.map((ev, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="w-1 rounded-sm shrink-0 mt-0.5" style={{ minHeight: 48, background: ev.color }} />
          <div className="text-xs leading-relaxed" style={{ color: "#aaa" }}>
            Lorem ipsum dolor sit amet, consec-<br />tuer adipiscing elit.
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Donut Chart (SVG) ---
function DonutChart({ percent, color, size = 70 }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#eee" strokeWidth={9} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
          strokeWidth={9} strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold"
        style={{ color: "#444" }}>
        {percent}%
      </div>
    </div>
  );
}

// --- Visits ---
const visits = [
  { label: "Lorem ipsum dolor sit amet.", pct: 70, color: "#3ec9c0" },
  { label: "Lorem ipsum dolor sit amet.", pct: 50, color: "#e85d8a" },
];

function Visits() {
  return (
    <div style={{ flex: "0 0 190px" }}>
      <h3 className="font-bold text-sm uppercase tracking-wide mb-3.5" style={{ color: "#333" }}>Visits</h3>
      <div className="flex flex-col gap-4">
        {visits.map((v, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="text-xs leading-snug" style={{ color: "#aaa", maxWidth: 80 }}>{v.label}</div>
            <DonutChart percent={v.pct} color={v.color} />
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Messages ---
const messages = [
  { name: "Helen" },
  { name: "Anny" },
  { name: "Jhon" },
];

function Messages() {
  return (
    <div style={{ flex: "0 0 200px" }}>
      <h3 className="font-bold text-sm uppercase tracking-wide mb-3.5" style={{ color: "#333" }}>Messages</h3>
      <div className="flex flex-col gap-2.5">
        {messages.map((m, i) => (
          <div key={i} className="rounded-xl p-2.5"
            style={{
              background: i < 2 ? "#f5f4fc" : "#fff",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}>
            <div className="font-bold text-xs mb-0.5" style={{ color: "#333" }}>{m.name}</div>
            <div className="text-xs leading-relaxed mb-1.5" style={{ color: "#aaa" }}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa...
            </div>
            <div className="flex justify-end">
              <button className="text-white border-none rounded cursor-pointer font-semibold tracking-wide"
                style={{
                  background: i === 0 ? "#3ec9c0" : i === 1 ? "#6c5fb7" : "#999",
                  padding: "3px 10px",
                  fontSize: 10,
                }}>
                READ MORE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Statistics (Line Chart SVG) ---
const statPoints = [40, 55, 45, 60, 48, 65, 70, 58, 75, 68, 80, 72, 78, 70, 82];
const statLabels = [40, 45, 45, 52, 20, 33, 86];

function StatChart() {
  const W = 340, H = 100, pad = 16;
  const minV = Math.min(...statPoints), maxV = Math.max(...statPoints);
  const xs = statPoints.map((_, i) => pad + (i / (statPoints.length - 1)) * (W - pad * 2));
  const ys = statPoints.map(v => H - pad - ((v - minV) / (maxV - minV)) * (H - pad * 2));
  const lineD = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ");
  const areaD = `${lineD} L${xs[xs.length - 1]},${H} L${xs[0]},${H} Z`;

  return (
    <div className="flex-1 min-w-0">
      <h3 className="font-bold text-sm uppercase tracking-wide mb-2.5" style={{ color: "#333" }}>Statistics</h3>
      <div className="flex gap-3 items-start">
        <svg width={W} height={H} className="overflow-visible shrink-0">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f5c842" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f5c842" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d={areaD} fill="url(#areaGrad)" />
          <path d={lineD} fill="none" stroke="#f5c842" strokeWidth={2.5} strokeLinejoin="round" />
          {xs.map((x, i) => (
            <circle key={i} cx={x} cy={ys[i]} r={5} fill="#6c5fb7" stroke="#fff" strokeWidth={2} />
          ))}
          <line x1={pad} y1={H} x2={W - pad} y2={H} stroke="#e0e0e0" strokeWidth={1} />
        </svg>

        {/* Right text */}
        <div className="flex-1 flex flex-col gap-2">
          {[0, 1, 2].map(i => (
            <div key={i} className="text-xs leading-relaxed" style={{ color: "#bbb" }}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              {i === 2 ? " commodo ligula eget. Cum" : ""}
            </div>
          ))}
        </div>
      </div>

      {/* X labels */}
      <div className="flex justify-between mt-1" style={{ paddingLeft: pad, paddingRight: pad }}>
        {statLabels.map((l, i) => (
          <span key={i} className="text-xs" style={{ color: "#bbb" }}>{l}</span>
        ))}
      </div>
    </div>
  );
}

// --- Topbar ---
function Topbar() {
  return (
    <div className="flex items-center justify-end px-6 py-3 border-b border-gray-100">

      <div className="flex items-center gap-2.5">
        <div className="relative">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#f4f3fb" }}>
            <svg viewBox="0 0 24 24" fill="#6c5fb7" width="22" height="22">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
            <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white"
              style={{ background: "#4fc96a" }} />
          </div>
        </div>
        <div>
          <span className="font-semibold text-xs" style={{ color: "#333" }}>Mary Smith </span>
        </div>
      </div>
    </div>
  );
}

// --- Main Dashboard ---
export default function Dashboard() {
  return (
    <div className="flex h-screen" style={{ fontFamily: "'Nunito', 'Segoe UI', sans-serif", background: "#f4f4f9" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">
          {/* Top row */}
          <div className="flex gap-5 bg-white rounded-2xl p-5"
            style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            <Calendar />
            <EventList />
            <div className="w-px bg-gray-100 shrink-0" />
            <Visits />
            <div className="w-px bg-gray-100 shrink-0" />
            <Messages />
          </div>

          {/* Bottom row */}
          <div className="bg-white rounded-2xl p-5"
            style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            <StatChart />
          </div>
        </div>
      </div>
    </div>
  );
}