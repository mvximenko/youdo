import { useState, useCallback } from 'react';

type UseToggle = (initialState: boolean) => [boolean, () => void];

const useToggle: UseToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState((state) => !state), []);
  return [state, toggle];
};

export default useToggle;
