import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import Spinner from 'react-bootstrap/Spinner';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { setForm, showErrorReducer } from '../../../Store/reducers/uiSettings';
import { HemaLabel, FormText, FormSelect, Button, HemaValue, Alert } from '../../../utils';
import { Cancel, Add, AddInKit, DragDrop, Minus, DeleteBin, NameKit, Confirm, CrossIcon } from '../../../HemeIconLibrary';

export const NewRow = ({ addRow, dropDownItemList }) => {
  const selectRef = useRef();

  const {
    allItems,
    common: { dropdownItemList },
  } = useSelector((state) => state);
  return (
    <Formik
      initialValues={{ sort: '', itemName: '' }}
      enableReinitialize
      validate={(values) => {
        const errors = {};

        if (!values.itemName) {
          errors.itemName = 'Required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        addRow(values);
        resetForm({ values: '' });
        selectRef.current.clearSelect();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-[6px] border border-1 p-[10px] pr-[35px] w-full">
            <div className="flex">
              <Button type="button" cta={() => handleSubmit()} Icon={<AddInKit />} />
            </div>
            <div className="mr-[50px] grow-[2]">
              <FormSelect
                ref={selectRef}
                placeholder="Item name"
                setFieldValue={setFieldValue}
                onChange={(event) => {
                  handleChange(event);
                  // setTimeout(() => handleSubmit());
                }}
                onBlur={handleBlur}
                value={values.itemName}
                name="itemName"
                options={dropdownItemList?.[dropDownItemList] || allItems.allItems}
                notRefresh
              />
              {errors.itemName && touched.itemName && <div className="error text-[red] text-[12px] pt-[2px]">{errors.itemName}</div>}
            </div>
            <HemaValue text="Quantity Per Kit" />
          </div>
        </form>
      )}
    </Formik>
  );
};

export const DataTableRowItems = ({ index, item, setItems, allItems, items, hideSort, formName = '' }) => {
  return (
    <div className="flex items-center gap-[30px] border border-1 p-[10px] justify-between">
      {!hideSort && (
        <div className="flex">
          <Button type="button" Icon={<DragDrop />} />
          <div className="self-center">
            <div>
              <HemaValue text={++index} />
            </div>
          </div>
        </div>
      )}
      <div className="grow-[2] ml-[35px]  mr-[22px]">
        <FormSelect
          placeholder={item.name || item?.item?.name}
          value={item.itemName || item?.item?.id}
          options={allItems.allItems}
          setFieldValue={(name, data) => {
            setItems(
              items.map((up) => {
                if (up.id === item.id) {
                  return { ...up, itemId: data };
                } else {
                  return up;
                }
              }),
            );
          }}
          name="item-name-kil-builder"
        />
      </div>
      <div className="flex">
        <Button
          type="button"
          bg="bg-[#5DD099]"
          Icon={<Minus color="white" />}
          cta={() => {
            setItems(
              items.map((up) => {
                if (up.id === item.id) {
                  if (up.itemPerKit > 1 || up.qty > 1) {
                    // return {
                    //   ...up,
                    //   qty: up.qty - 1,
                    //   quantity: up.quantity - 1,
                    //   itemPerKit: up.itemPerKit -1
                    // };
                    return {
                      ...up,
                      qty: up.qty - 1,
                      quantity: up.quantity - 1,
                      itemPerKit: up.itemPerKit - 1,
                    };
                  } else {
                    return up;
                  }
                } else {
                  return up;
                }
              }),
            );
          }}
        />
        <HemaValue className="px-[15px] self-center" text={item.qty || item.quantity || item.itemPerKit} />
        {/* <input type='text' size={20} pattern="[0-9]+" className="px-[15px] max-w-fit" value={item.qty || item.quantity || item.itemPerKit} onChange={(e) => {
          setItems(
            items.map((up) => {
              if (up.id === item.id) {
                if (e.target.value > 1) {
                  return {
                    ...up,
                    qty: parseInt(e.target.value),
                    itemPerKit: parseInt(e.target.value)
                  };
                } else {
                  return up;
                }
              } else {
                return up;
              }
            })
          );
        }} /> */}
        <Button
          type="button"
          bg="bg-[#5DD099]"
          Icon={<Add color="white" />}
          cta={() => {
            setItems(
              items.map((up) => {
                if (up.id === item.id) {
                  console.log('up', up);
                  //return { ...up, qty: up.qty + 1, quantity: up.quantity + 1, itemPerKit: up.itemPerKit +1 };
                  return { ...up, qty: up.qty + 1, quantity: up.quantity + 1, itemPerKit: up.itemPerKit + 1 };
                } else {
                  return up;
                }
              }),
            );
          }}
        />
        <Button
          type="button"
          className="ml-[10px]"
          bg="bg-[#F54C3B]"
          Icon={<DeleteBin />}
          cta={() => {
            setItems(items.filter((up) => up.id !== item.id));
          }}
        />
      </div>
    </div>
  );
};

const FormikForm = ({ cta }) => {
  const [items, setItems] = useState([]);
  const mainName = useRef('');
  const { uisettings, allItems } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (uisettings.formName === 'copy-kit-template') {
      let obj = [...uisettings.editForm?.items];
      obj = obj.map((element) => {
        return { ...element, itemId: element.id, qty: element.itemPerKit };
      });
      setItems(obj);
      mainName.current = uisettings.editForm?.name + ' Copy';
    }
  }, [uisettings.formName]);

  const onDragEnd = (result) => {
    // dropped outside the lista
    console.log(result);
    if (!result.destination) {
      return;
    }

    const itemsData = reorder(items, result.source.index, result.destination.index);

    //const sortArray = itemsData.map((data) => data.sort).sort();
    // itemsData[result.source.index].sort = sortArray[result.destination.index];
    // itemsData[result.destination.index].sort = sortArray[result.source.index];
    setItems(itemsData);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  return (
    <Formik
      initialValues={{
        name: uisettings?.editForm?.name ? uisettings?.editForm?.name + ' copy' : '',
      }}
      enableReinitialize
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        console.log('errors', errors);
        return errors;
      }}
      onSubmit={(values, { resetForm }) => {
        dispatch(showErrorReducer(''));
        console.log('val', items);
        cta({ ...values, items });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        dirty,
        isValid,
        /* and other goodies */
      }) => (
        <>
          <form onSubmit={handleSubmit} className="max-w-[600px]  overflow-auto m-auto flex flex-col justify-between h-[calc(100%-100px)]">
            <div className={'w-full'}>
              <HemaLabel text={'Name '} Icon={<NameKit color="blue" />} required={true} className={`mb-[10px]`} />
              <div className="flex gap-[15px] items-center ">
                <FormText
                  type={'text'}
                  name={'name'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  setFieldValue={setFieldValue}
                  crossIcon={values?.name ? <CrossIcon /> : ''}
                  placeholder={'Enter template name'}
                />
              </div>
              {errors.name && <div className="error text-[red] text-[12px] pt-[2px]">{errors.name}</div>}
              <div className="">
                <div className="border-dashed border-t-2 border-[#DEE2E6] mb-[16px] mt-[16px]"></div>
                <div className="flex items-align py-[11px] border w-full rounded-t pl-[15px] pr-[35px]  justify-between ">
                  {/* <div>
                    <HemaValue className="" text="Sort Order" />
                  </div> */}
                  <div className="pl-[30px] ">
                    <HemaValue text="Item Name" />
                  </div>
                  <div>
                    <HemaValue text="Quantity Per Kit" />
                  </div>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {items.map((item, index) => {
                          return (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => (
                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                  <DataTableRowItems index={index} item={item} setItems={setItems} allItems={allItems} items={items} formName={uisettings.formName} />
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
              <NewRow
                addRow={(data) =>
                  setItems([
                    ...items,
                    {
                      id: String(Date.now()),
                      sort: items.length + 1,
                      itemId: data?.itemName,
                      qty: 1,
                      name: allItems.allItems.filter((itm) => String(itm.id) === data?.itemName)?.[0]?.name,
                    },
                  ])
                }
              />
              <div className="flex flex-wrap w-full gap-[16px] mt-[30px] ">
                <Alert type="error" />
              </div>
            </div>

            <div className="flex gap-[8px] justify-end my-[20px]">
              <Button
                cta={() => {
                  dispatch(setForm({ state: false, type: '' }));
                }}
                type="button"
                text="Cancel"
                bg="bg-white"
                border="border-primary1"
                color="text-primary1"
                Icon={<Cancel />}
              />

              {uisettings.formLoader ? (
                <Button
                  type="submit"
                  bg="bg-primary1"
                  text={
                    <>
                      <Spinner animation="grow" size="sm" variant="light" />
                      <Spinner animation="grow" size="sm" variant="light" />
                      <Spinner animation="grow" size="sm" variant="light" />
                    </>
                  }
                />
              ) : (
                <Button type="submit" text="Save" disabled={!(dirty && isValid)} bg="bg-primary1" color="text-white" Icon={<Confirm />} />
              )}
            </div>
          </form>
        </>
      )}
    </Formik>
  );
};

export default FormikForm;
