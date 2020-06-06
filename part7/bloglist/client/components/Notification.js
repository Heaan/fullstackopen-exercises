import React from 'react';
import { useSelector } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification = () => {
  const message = useSelector((state) => state.message);

  if (message !== null) {
    const style = message.match(/^[a-z]{5,7}(?=:)/);
    return <Alert severity={style[0]}>{message}</Alert>;
  }
  return null;
};

export default Notification;
