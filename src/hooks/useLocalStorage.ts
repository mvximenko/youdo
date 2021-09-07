import { useState, useEffect } from 'react';

export interface State {
  habit: string;
  day: number;
  graph: number[];
  date: string;
}

export type UseLocalStorage = (
  key: string,
  defaultVal: State[]
) => [State[], React.Dispatch<State[]>];

const useLocalStorage: UseLocalStorage = (key, defaultVal = []) => {
  const [state, setState] = useState(() =>
    JSON.parse(localStorage.getItem(key) || String(defaultVal))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorage;
