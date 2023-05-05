import { useEffect, useState } from 'react';
import { setDropdownValue } from '../../Store/reducers/common';
import Multiselect from 'multiselect-react-dropdown';

import { Cancel } from '../../HemeIconLibrary';

import './style.scss';

function FormMultiSelect(props) {
  const { options, setFieldValue, name, value, dispatch } = props;
  const [selectLabel, setSelectLabel] = useState([]);
  useEffect(() => {
    setFieldValue(name, selectLabel);
  }, [selectLabel?.length]);
  useEffect(() => {
    if (value) {
      setSelectLabel(value);
    }
  }, []);
  // function viewWithIcon(val) {
  //   return (
  //     <>
  //       <span className="inline-block mr-2 align-middle">{val.icon}</span>
  //       <span className="">{val.name}</span>
  //     </>
  //   );
  // }

  // function onChangeHandler(event) {
  //   if (event?.target) {
  //     if (event.target.value) {
  //       setFieldValue(name, event?.target?.value);
  //     }
  //     if (onChange) {
  //       event.target.value = event.target.id;
  //       onChange(event);
  //     }
  //   }
  // }

  return (
    <Multiselect
      options={options}
      selectedValues={value}
      onSelect={(selectedList, selectedItem) => {
        setSelectLabel(selectedList);
        if (setFieldValue) {
          setFieldValue(name, selectedItem.id);
        }

        if (dispatch) {
          dispatch(setDropdownValue(selectedItem));
        }
      }} // Function will trigger on select event
      onRemove={(selectedList) => {
        setSelectLabel(selectedList);
      }}
      className="hema-form-dropdown-custom"
      displayValue="name"
      customCloseIcon={<Cancel />}
    />

    // <Dropdown
    //   className={`hema-form-dropdown-custom  `}
    //   disabled={disabled}
    //   onSelect={(ek, eo) => onChangeHandler(eo)}
    //   {...props}
    // >
    //   <Dropdown.Toggle
    //     disabled={disabled}
    //     className={`hema-form-dropdown-custom ${className}`}
    //   >
    //     <div className="flex gap-[10px] flex-wrap">
    //       {selectLabel?.length ? selectLabel?.map((data) => (
    //         <div className="flex bg-[#ccc] rounded-[5px] py-[5px] px-[10px] gap-[7px] items-center">
    //           <HemaLabel text={data.name} />
    //           <div
    //             onClick={() => {
    //               setSelectLabel(selectLabel.filter((rem) => rem.id !== data.id));
    //             }}
    //           >
    //             <CrossIcon />
    //           </div>
    //         </div>
    //       )) : placeholder}
    //     </div>
    //     {props.crossIcon && (
    //       <span
    //         onClick={() => props?.setFieldValue(props.name, '')}
    //         className={`absolute top-[13px] right-[30px] cursor-pointer`}
    //       >
    //         {props.crossIcon}
    //       </span>
    //     )}
    //     {props.dropIcon && (
    //       <span className={`absolute top-[15px] right-[10px] cursor-pointer`}>
    //         {props.dropIcon}
    //       </span>
    //     )}
    //   </Dropdown.Toggle>
    //   <Dropdown.Menu>
    //     {options?.map((val) => {
    //       return (
    //         <Dropdown.Item
    //           key={val.id}
    //           id={val.id}
    //           name={name}
    //           onClick={() => {
    //             setSelectLabel([...selectLabel, val]);
    //             if (setFieldValue) {
    //               setFieldValue(name, val.id);
    //             }

    //             if (dispatch) {
    //               dispatch(setDropdownValue(val));
    //             }
    //           }}
    //         >
    //           {' '}
    //           {val.icon ? viewWithIcon(val) : val.name || val.lotNumber}{' '}
    //         </Dropdown.Item>
    //       );
    //     }) }
    //   </Dropdown.Menu>
    // </Dropdown>
  );
}

export default FormMultiSelect;
