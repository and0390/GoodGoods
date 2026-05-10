import { useState, useEffect, useCallback } from "react";

export const useCountdown = (initialSeconds: number) => {
  const [secondsLeft, setSecondsLeft] = useState(0);

  const startCountdown = useCallback(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timeout = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timeout);
  }, [secondsLeft]);

  return { secondsLeft, startCountdown, isRunning: secondsLeft > 0 };
};
