import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { setDropdownValue } from '../../Store/reducers/common';
import Dropdown from 'react-bootstrap/Dropdown';
import { getIcon } from '../../helpers/commonHelper';
import { SelectDownArrow } from '../../HemeIconLibrary';
import './style.scss';

const FormSelect = forwardRef((props, ref) => {
  const { options, placeholder, setFieldValue, name, onChange, value, disabled, className, dispatch, notRefresh } = props;
  const [selectLabel, setSelectLabel] = useState(value !== '' ? value : placeholder);

  useImperativeHandle(ref, () => ({
    clearSelect() {
      setSelectLabel(placeholder);
    },
  }));
  const [Icon, setIcon] = useState();
  useEffect(() => {
    console.log(value)
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
    if (!notRefresh) {
      setSelectLabel(label);
    }
    const checkImage = getIcon(value)
    if(checkImage) {
      setIcon(getIcon(value));
    } else if(value?.length===2) {
      setIcon(<img
        width={20}
        height={20}
        alt="United States"
        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${value}.svg`}
      />)
    }

  }, [placeholder, value]);

  function viewWithIcon(val) {
    return (
      <>
        <span className="inline-block mr-2 align-middle">{val.icon}</span>
        <span className="">{val.name}</span>
      </>
    );
  }

  function onChangeHandler(event) {
    if (event?.target) {
      if (event.target.value) {
        setFieldValue(name, event?.target?.value);
      }
      if (onChange) {
        event.target.value = event.target.id;
        onChange(event);
      }
    }
  }

  return (
    <Dropdown
      className={`hema-form-dropdown-custom  `}
      disabled={disabled}
      onSelect={(ek, eo) => {
        onChangeHandler(eo);
      }}
      {...props}
    >
      <Dropdown.Toggle disabled={disabled} className={`hema-form-dropdown-custom ${className}`}>
        <div className={`flex gap-[10px] ${selectLabel === placeholder ? ' placeholderColor' : ' nonePlaceholderColor'}`}>
          {!!Icon && Icon}
          {selectLabel}
        </div>
        {props.crossIcon && (
          <span onClick={() => props?.setFieldValue(props.name, '')} className={`absolute top-[13px] right-[30px] cursor-pointer`}>
            {props.crossIcon}
          </span>
        )}

        <span className={`absolute top-[15px] right-[10px] cursor-pointer`}>{props.dropIcon ? props.dropIcon : <SelectDownArrow />}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options?.map((val) => {
          return (
            <Dropdown.Item
              key={val.id}
              className="bg-slate-950 "
              id={val.id}
              name={name}
              active={selectLabel === val.name}
              onClick={() => {
                console.log(val);
                if (val.icon) {
                  setIcon(val.icon);
                }
                if (val.iconName) {
                  setIcon(val.iconName);
                }
                if (setFieldValue) {
                  setFieldValue(name, val.id);
                }
                if (dispatch) {
                  dispatch(setDropdownValue({...val, name}));
                }
                setSelectLabel(val.name || val.lotNumber);
              }}
            >
              {' '}
              {val.icon ? viewWithIcon(val) : val.name || val.lotNumber}{' '}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
});

export default FormSelect;
