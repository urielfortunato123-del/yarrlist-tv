import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "yarrlist-session-counted";

export function useVisitCounter() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const counted = sessionStorage.getItem(SESSION_KEY);

    if (!counted) {
      // First visit this session: increment and get new count
      sessionStorage.setItem(SESSION_KEY, "1");
      supabase.rpc("increment_visit_count").then(({ data, error }) => {
        if (!error && data) {
          setCount(Number(data));
        }
      });
    } else {
      // Already counted this session: just read current count
      supabase
        .from("visit_counter")
        .select("count")
        .eq("id", 1)
        .single()
        .then(({ data }) => {
          if (data) setCount(Number(data.count));
        });
    }
  }, []);

  return count;
}
