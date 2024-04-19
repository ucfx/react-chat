import { useState, useEffect } from "react";

const useSearch = (url, searchTerm) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchTerm === "") return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${url}/${searchTerm}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, searchTerm]);

  return { data, isLoading, error };
};

export default useSearch;
