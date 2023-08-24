import { useState, useEffect } from "react";

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedvalue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedvalue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

//debounce is used to reduce network calls while searching.
