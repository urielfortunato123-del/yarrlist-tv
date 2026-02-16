import { useState, useEffect } from "react";

const STORAGE_KEY = "yarrlist-visit-count";
const BASE_COUNT = 1247; // base offset

export function useVisitCounter() {
  const [count, setCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        return data.count;
      }
      return BASE_COUNT;
    } catch {
      return BASE_COUNT;
    }
  });

  useEffect(() => {
    // Increment on first visit of this session
    const sessionKey = "yarrlist-session-counted";
    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, "1");
      const newCount = count + 1;
      setCount(newCount);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: newCount }));
    }
  }, []);

  return count;
}
