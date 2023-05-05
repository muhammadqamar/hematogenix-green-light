import React from 'react';

import { TagsInput } from 'react-tag-input-component';

const Tags = ({ placeholder, name, setFieldValue, value }) => {

  return (
    <div>
      <TagsInput
        value={value || []}
        onChange={(e) => {
          if (setFieldValue) {
            setFieldValue(name, e);
          }
        }}
        name={name}
        placeHolder={placeholder}
      />
    </div>
  );
};

export default Tags;
