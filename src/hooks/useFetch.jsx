import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        const msg = err && err.message ? err.message : String(err);
        setError(
          msg + " Recargue la Pagina para volver a intentar la carga de datos"
        );
      })
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
