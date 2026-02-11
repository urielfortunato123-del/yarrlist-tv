import { useState, useEffect } from "react";

const TvClock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const seconds = now.toLocaleTimeString("pt-BR", { second: "2-digit" }).slice(-2);
  const date = now.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-baseline gap-1">
        <span className="font-display text-3xl font-bold tracking-wider text-foreground xl:text-4xl">
          {time}
        </span>
        <span className="font-display text-lg text-muted-foreground xl:text-xl">
          :{seconds}
        </span>
      </div>
      <div className="h-8 w-px bg-border" />
      <span className="font-body text-sm capitalize text-muted-foreground xl:text-base">
        {date}
      </span>
    </div>
  );
};

export default TvClock;
