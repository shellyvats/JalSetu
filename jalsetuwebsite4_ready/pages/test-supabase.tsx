import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function TestSupabase() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase.from("cities").select("*").limit(5);
      setData(data);
      setError(error);
    }
    loadData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🔌 Supabase Test Page</h1>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
