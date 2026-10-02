import React, { useState, useEffect } from "react";
import { Timer, Play, Pause, RotateCcw, Volume2 } from "lucide-react";

export const CookingTimer: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState<number>(180);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedDuration, setSelectedDuration] = useState<number>(180);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      // Play a quick pleasant beep using Web Audio API
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);
      } catch {
        // AudioContext may be blocked prior to user interaction
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft]);

  const setTimer = (sec: number) => {
    setIsActive(false);
    setSelectedDuration(sec);
    setSecondsLeft(sec);
  };

  const toggle = () => setIsActive(!isActive);

  const reset = () => {
    setIsActive(false);
    setSecondsLeft(selectedDuration);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="bg-stone-100 rounded-xl p-3 border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-stone-200 text-stone-700">
          <Timer className="w-4 h-4" />
        </div>
        <div>
          <span className="font-semibold text-stone-900 block">Dorm Cook Timer</span>
          <span className="text-stone-500 text-[11px]">Instant Noodle / Pan Sauté helper</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setTimer(180)}
          className={`px-2.5 py-1 rounded-md font-medium transition ${
            selectedDuration === 180
              ? "bg-amber-600 text-white shadow-xs"
              : "bg-white text-stone-700 hover:bg-stone-200 border border-stone-200"
          }`}
        >
          3m Noodle
        </button>
        <button
          onClick={() => setTimer(300)}
          className={`px-2.5 py-1 rounded-md font-medium transition ${
            selectedDuration === 300
              ? "bg-amber-600 text-white shadow-xs"
              : "bg-white text-stone-700 hover:bg-stone-200 border border-stone-200"
          }`}
        >
          5m Pan
        </button>
        <button
          onClick={() => setTimer(600)}
          className={`px-2.5 py-1 rounded-md font-medium transition ${
            selectedDuration === 600
              ? "bg-amber-600 text-white shadow-xs"
              : "bg-white text-stone-700 hover:bg-stone-200 border border-stone-200"
          }`}
        >
          10m Simmer
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-mono text-base font-bold text-stone-800 tracking-wider">
          {formatTime(secondsLeft)}
        </span>
        <button
          onClick={toggle}
          id="timer-toggle-btn"
          className={`p-1.5 rounded-lg font-medium text-white transition ${
            isActive ? "bg-amber-600 hover:bg-amber-700" : "bg-stone-800 hover:bg-stone-900"
          }`}
          title={isActive ? "Pause" : "Start"}
        >
          {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={reset}
          id="timer-reset-btn"
          className="p-1.5 rounded-lg bg-white hover:bg-stone-200 text-stone-600 border border-stone-200 transition"
          title="Reset"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
