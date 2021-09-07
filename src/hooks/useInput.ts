import { useState } from 'react';

type UseInput = (
  initialState: string
) => [string, (e: React.ChangeEvent<HTMLInputElement>) => void, () => void];

type HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => void;

const useInput: UseInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const handleChange: HandleChange = (e) => setValue(e.target.value);
  const reset = () => setValue('');
  return [value, handleChange, reset];
};

export default useInput;
