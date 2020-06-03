import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'Components/Button';
import { toggleTo } from 'Reducers/toggleReducer';

const Togglable = ({ text, children }) => {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.visible);

  const show = { display: visible ? '' : 'none' };
  const hide = { display: visible ? 'none' : '' };

  const toggle = () => {
    dispatch(toggleTo(!visible));
  };

  return (
    <div>
      <div style={hide}>
        <Button type="button" handleClick={toggle} text={text} />
      </div>
      <div style={show}>
        {children}
        <Button type="button" handleClick={toggle} text="cancel" />
      </div>
    </div>
  );
};

export default Togglable;
