import { useEffect, useState } from "react";

const useApiSearch = (query, fetchFunction, enabled = true) => {
  const [result, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await fetchFunction(query.trim());
        setResults(data);
        setError(false);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, enabled]);

  return { result, loading, error };
};

export default useApiSearch;
