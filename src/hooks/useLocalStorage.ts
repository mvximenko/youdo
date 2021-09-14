import { useState, useEffect } from 'react';

export interface State {
  id: number;
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
  const [state, setState] = useState<State[]>(
    () => JSON.parse(localStorage.getItem(key)!) || defaultVal
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorage;
