import React, { useEffect, useState } from 'react';

function formatElapsedTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => value.toString().padStart(2, '0'))
    .join(':');
}

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return undefined;

    const timerId = window.setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleRestart = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <aside className="workout-timer" aria-label="Workout timer">
      <h3 className="timer-title">Workout Timer</h3>
      <div className="timer-display">{formatElapsedTime(seconds)}</div>
      <div className="timer-actions">
        <button type="button" className="timer-button timer-start" onClick={handleStart}>
          Start
        </button>
        <button type="button" className="timer-button timer-stop" onClick={handleStop}>
          Stop
        </button>
        <button type="button" className="timer-button timer-restart" onClick={handleRestart}>
          Restart
        </button>
      </div>
    </aside>
  );
}

export default Timer;
