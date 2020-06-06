import React, { useState, Children, cloneElement, isValidElement } from 'react';
import { Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    margin: 10,
  },
});

const Togglable = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  const marginStyle = useStyles();

  const show = { display: visible ? '' : 'none' };
  const hide = { display: visible ? 'none' : '' };

  const toggle = () => {
    setVisible(!visible);
  };

  return (
    <Container>
      <div style={hide}>
        <Button
          classes={{ root: marginStyle.root }}
          variant="contained"
          color="default"
          onClick={toggle}
        >
          {text}
        </Button>
      </div>
      <div style={show}>
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, { toggle });
          }
          return child;
        })}
        <Button
          classes={{ root: marginStyle.root }}
          variant="contained"
          color="default"
          onClick={toggle}
        >
          cancel
        </Button>
      </div>
    </Container>
  );
};

export default Togglable;
