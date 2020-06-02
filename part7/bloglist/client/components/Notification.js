import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const message = useSelector((state) => state.message);

  if (message !== null) {
    const style = message.match(/^[a-z]{5,7}(?=:)/);
    return <div className={`message ${style}`}>{message}</div>;
  }
  return null;
};

export default Notification;
