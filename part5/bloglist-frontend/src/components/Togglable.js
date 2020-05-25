import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Togglable = React.forwardRef(({ text, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const show = { display: visible ? '' : 'none' };
  const hide = { display: visible ? 'none' : '' };

  const toggle = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({ toggle }));

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
});
Togglable.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Togglable;
