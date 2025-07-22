import { useEffect, useState } from "react";
import Button from "../../components/Button";

const timeFormat = (time) => {
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 100);
  const miliSeconds = Math.floor((time % 1000) / 10);
  const pad = (n) => (n < 10 ? "0" + n : n);
  return (
    <span>
      {pad(minutes)}:{pad(seconds)}.{pad(miliSeconds)}
    </span>
  );
};

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };
  const stopTimer = () => {
    setIsRunning(false);
  };
  const startTimer = () => {
    setIsRunning(true);
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div>
      <div className="flex justify-center items-center w-full text-6xl mb-12">
        <span>{timeFormat(time)}</span>
      </div>
      <div className="flex gap-2">
        {isRunning ? (
          <Button onClick={stopTimer}>Stop</Button>
        ) : (
          <Button onClick={startTimer}>Start</Button>
        )}
        {time !== 0 && <Button onClick={resetTimer}>Reset</Button>}
      </div>
    </div>
  );
};
export default Stopwatch;
