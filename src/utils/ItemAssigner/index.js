import React from 'react';

import Spinner from 'react-bootstrap/Spinner';
const ButtonLoader = (props) => {
  const { text, bg } = props;

  return (
    <div
      type="button"
      disabled
      bg={bg}
      text={
        <>
          <text />

          <text />
        </>
      }
    />
  );
};
export default ButtonLoader;
