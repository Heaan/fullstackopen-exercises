import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message }) => {
  if (message !== null) {
    const style = message.match(/^[a-z]{5,7}(?=:)/);
    return <div className={`message ${style}`}>{message}</div>;
  }
  return null;
};
Notification.propTypes = {
  message: PropTypes.string,
};

export default Notification;
