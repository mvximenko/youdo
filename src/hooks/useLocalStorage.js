import { useState, useEffect } from 'react';

export default function useLocalStorage(key, defaultVal) {
  const [state, setState] = useState(() => {
    let value;
    try {
      value = JSON.parse(localStorage.getItem(key) || String(defaultVal));
    } catch (e) {
      value = defaultVal;
    }
    return value;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}
