"use client";

interface Props {
  rooms: string[];
  active: number;
  onNavigate: (i: number) => void;
}

export default function RoomNav({ rooms, active, onNavigate }: Props) {
  return (
    <nav
      className="fixed right-6 top-1/2 z-40 hidden flex-col items-center gap-3 md:flex md:right-8"
      style={{ transform: "translateY(-50%)" }}
      aria-label="Room navigation"
    >
      {rooms.map((room, i) => (
        <button
          key={room}
          onClick={() => onNavigate(i)}
          title={room}
          className="group flex items-center gap-2 transition-all duration-300"
          style={{ cursor: "pointer", background: "none", border: "none" }}
          aria-label={`Go to ${room}`}
        >
          {/* Label on hover */}
          <span
            className="font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
            style={{
              fontSize: "9px",
              color: "rgba(232,224,212,0.5)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {room}
          </span>
          {/* Dot */}
          <div
            className="rounded-full transition-all duration-300"
            style={{
              width: active === i ? "6px" : "4px",
              height: active === i ? "6px" : "4px",
              background: active === i ? "var(--xred)" : "rgba(232,224,212,0.25)",
              boxShadow: active === i ? "0 0 8px rgba(192,40,42,0.6)" : "none",
            }}
          />
        </button>
      ))}
    </nav>
  );
}
