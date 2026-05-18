"use client";

import { useEffect, useState } from "react";
import type { BusinessHour } from "@/lib/intefaces";

const DAY_LABELS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

interface Props {
  hours: BusinessHour[];
}

export function HoursWidget({ hours }: Props) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  const today = now?.getDay() ?? -1;

  const schedule = DAY_LABELS.map((label, i) => ({
    label,
    ...(hours[i] ?? { isOpen: false, open: "", close: "" }),
  }));

  const todayEntry = schedule[today];
  let isOpenNow = false;
  if (now && todayEntry?.isOpen && todayEntry.open && todayEntry.close) {
    const [oh, om] = todayEntry.open.split(":").map(Number);
    const [ch, cm] = todayEntry.close.split(":").map(Number);
    const cur = now.getHours() * 60 + now.getMinutes();
    isOpenNow = cur >= oh * 60 + om && cur < ch * 60 + cm;
  }

  return (
    <div className="hours">
      <div className="hours-head">
        <span className="ttl">Horario</span>
        {now !== null && (
          <span className={`live${isOpenNow ? "" : " closed"}`}>
            <span className="pulse"></span>
            <span className="txt">{isOpenNow ? "Abierto ahora" : "Cerrado"}</span>
          </span>
        )}
      </div>
      <ul className="hours-list">
        {schedule.map((h, i) => (
          <li key={i} className={i === today ? "today" : ""}>
            <span className="day">{h.label}</span>
            <span className="h">
              {h.isOpen && h.open && h.close ? `${h.open} — ${h.close}` : "Cerrado"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
