import React, { useEffect, useState } from "react";

const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  return (
    <div className="clock-wrapper">
      <div className="analog-clock">
        <div
          className="hand hour"
          style={{ transform: `rotate(${hours * 30 + minutes / 2}deg)` }}
        />
        <div
          className="hand minute"
          style={{ transform: `rotate(${minutes * 6}deg)` }}
        />
        <div
          className="hand second"
          style={{ transform: `rotate(${seconds * 6}deg)` }}
        />
        <span className="center-dot" />
      </div>

      <div className="digital-time">
        {time.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default LiveClock;
