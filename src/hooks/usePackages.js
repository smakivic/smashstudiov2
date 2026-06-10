import { useState, useEffect } from "react";
import { fetchPackages } from "../api/packages";

/**
 * Encapsulates loading state for the packages endpoint.
 * Swap fetchPackages() implementation to connect a real backend.
 */
export function usePackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchPackages()
      .then((data) => {
        if (!cancelled) setPackages(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { packages, loading, error };
}
