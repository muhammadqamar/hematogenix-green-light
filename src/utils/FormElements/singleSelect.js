import React, { useEffect, useState } from 'react';
import Select from 'react-select';
// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];
const SingleSelect = (props) => {
  const { options, placeholder, setFieldValue, name, onChange, value, disabled, className, dispatch, notRefresh } = props;
  const [selectOptions, setselectOptions] = useState([]);
  const [selectLabel, setSelectLabel] = useState(value !== '' ? value : placeholder);
  console.log('va', value, options);
  useEffect(() => {
    let label = placeholder;
    if (value !== '') {
      const selected = options?.find((ele) => ele.id === value);
      if (selected) {
        label = selected.name;
      }
    }
    if (!notRefresh) {
      setSelectLabel(label);
    }
  }, [placeholder, value]);
  useEffect(() => {
    if (options) {
      setselectOptions(
        options?.map((op) => {
          return {
            label: op.name,
            value: op.id,
          };
        }),
      );
    }
  }, [props.options]);
  return (
    <Select
      options={selectOptions}
      placeholder={selectLabel}
      onChange={(e) => {
        setFieldValue(name, e?.value);
      }}
      isClearable
      isSearchable
      disabled={disabled}
    />
  );
};

export default SingleSelect;
