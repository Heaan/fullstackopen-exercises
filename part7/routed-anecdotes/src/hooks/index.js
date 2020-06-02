import { useState } from 'react';

export const useField = (name) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return [{ name, value, onChange }, reset];
};

export const useTimeout = () => {
  const [timeoutId, setTimeoutId] = useState(null);

  const setup = (timeout, setState, state) => {
    if (typeof timeoutId === 'number') {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setTimeoutId(
      setTimeout(() => {
        setState(state);
      }, timeout * 1000),
    );
  };

  return setup;
};
