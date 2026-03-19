import { useState, useEffect } from "react";

const TvClock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className="font-display font-semibold text-foreground">{time}</span>
      <span className="hidden capitalize sm:inline">· {date}</span>
    </div>
  );
};

export default TvClock;
