import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {  Spinner } from 'react-bootstrap';

import {
  HemaLabel,
  FormSelect,
  Button,
  Alert,
  FormText,
} from '../../../utils';
import { Cancel, Confirm, NameKit } from '../../../HemeIconLibrary';
import {createPackageAction, updatePackageAction} from "../../../Actions/order"

import {
  setForm,
  showSuccessReducer,
} from '../../../Store/reducers/uiSettings';
import DataTable from 'react-data-table-component';

const CreatePackge = ({ approve }) => {
  const { orders, uisettings } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [newPackage, setNewPackage] = useState([]);
  const [itemsAvailable, setItemsAvailable] = useState([]);

  useEffect(() => {
    if (orders?.activeShipment?.unAssignedItems) {
      setItemsAvailable(orders?.activeShipment?.unAssignedItems || []);
    }
  }, [orders?.activeShipment]);

  useEffect(()=>{
    if(uisettings?.editForm?.items) {
      setNewPackage(uisettings?.editForm?.items)
    }
  },[uisettings?.editForm?.items])

  return (
    <Formik
      initialValues={{
        name: uisettings?.editForm?.name || '',
        parcelId: '',
        size: uisettings?.editForm?.size || '',
        ids: newPackage,
      }}
      enableReinitialize
      validate={(values) => {
        const errors = {};
        if (!values.size) {
          errors.size = 'Required';
        }
        if (!values.name) {
          errors.name = 'Required';
        }

        if (values.ids?.length === 0) {
          errors.ids = 'atleast  assign one item from available items';
        }

        return errors;
      }}
      onSubmit={async (values) => {
        console.log(values);
        if(uisettings?.editForm?.id) {
          updatePackageAction(orders.activeOrder?.id, orders.activeShipment?.id,uisettings?.editForm?.id,  {...values, ids:values.ids?.map(data=>data.id)})

        } else {


        createPackageAction(orders.activeOrder?.id, orders.activeShipment?.id, {...values, ids:values.ids?.map(data=>data.id)})

      }
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
        /* and other goodies */
      }) => (
        <form
          onSubmit={handleSubmit}
          className="max-w-[600px]  overflow-auto m-auto flex flex-col justify-between h-[calc(100%-100px)]"
        >
          <div>
            <div className={'w-full'}>
              <div className="mb-[30px]">
                <HemaLabel
                  text={'Package Name'}
                  required={true}
                  className={`mb-[10px]`}
                />
                <FormText
                  value={values.name}
                  placeholder="Package name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="name"
                ></FormText>
                 {errors.name && touched.name && (
                  <div className="error text-[red] text-[12px] pt-[2px]">
                    {errors.name}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full flex gap-[16px] items-center">
              <div className="mb-[30px]">
                <HemaLabel
                  text={'Package Size'}
                  Icon={<NameKit />}
                  className={`mb-[10px]`}
                />
                <FormSelect
                  placeholder={'Single Select'}
                  name="size"
                  setFieldValue={setFieldValue}
                  value={values.size}
                  options={[
                    { id: 'small', name: 'Small' },
                    { id: 'medium', name: 'Medium' },
                    { id: 'large', name: 'Large' },
                  ]}
                ></FormSelect>
                {errors.size && touched.size && (
                  <div className="error text-[red] text-[12px] pt-[2px]">
                    {errors.size}
                  </div>
                )}
              </div>
            </div>
            <div className={'w-full flex gap-[10px]'}>
              <div className="border border-[#ccc]">
                <div className="border-b border-[#ccc] p-[10px] text-primary1 bold">
                  Available Items
                </div>
                <DataTable
                  data={itemsAvailable || []}
                  columns={[
                    {
                      name: 'Item Name',
                      selector: (row) => {
                        return (
                          <div className="flex-shrink-0 flex items-center gap-[10px] cursor-pointer">
                            <HemaLabel text={row?.name} />
                          </div>
                        );
                      },
                    },
                    {
                      name: 'Lot Number',
                      selector: (row) => {
                        return (
                          <div className="flex-shrink-0 flex items-center gap-[10px] cursor-pointer">
                            <HemaLabel text={row?.lotNumber} />
                          </div>
                        );
                      },
                    },
                  ]}
                />
              </div>
              <div className="">
                <div className="border py-[10px] px-[20px] border-[#ccc] mb-[8px]">
                  sl
                </div>
                <div className="border py-[10px] px-[20px] border-[#ccc] mb-[8px]">
                  sr
                </div>
                <button
                  disabled={!setItemsAvailable.length ? false : false}
                  onClick={() => {
                    setItemsAvailable([]);
                    setNewPackage(orders?.activeShipment?.unAssignedItems);
                  }}
                  type="button"
                  className="border py-[10px] px-[20px] border-[#ccc] mb-[8px]"
                >
                  all
                </button>

                <button
                type="button"
                  disabled={!setNewPackage.length ? true : false}
                  onClick={() => {
                    setItemsAvailable(orders?.activeShipment?.unAssignedItems);
                    setNewPackage([]);
                  }}
                  className="border py-[10px] px-[20px] border-[#ccc] mb-[8px]"
                >
                  arr
                </button>
              </div>
              <div className="border border-[#ccc]">
                <div className="border-b border-[#ccc] p-[10px] text-primary1 bold">
                  Package 1
                </div>
                <DataTable
                  data={newPackage || []}
                  columns={[
                    {
                      name: 'Item Name',
                      selector: (row) => {
                        return (
                          <div className="flex-shrink-0 flex items-center gap-[10px] cursor-pointer">
                            <HemaLabel text={row?.name} />
                          </div>
                        );
                      },
                    },
                    {
                      name: 'Lot Number',
                      selector: (row) => {
                        return (
                          <div className="flex-shrink-0 flex items-center gap-[10px] cursor-pointer">
                            <HemaLabel text={row?.lotNumber} />
                          </div>
                        );
                      },
                    },
                  ]}
                />
              </div>
            </div>
            {errors.ids && touched.ids && (
                  <div className="error text-[red] text-[12px] pt-[2px]">
                    {errors.ids}
                  </div>
                )}
          </div>

          <Alert type="error" />
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

            {isSubmitting ? (
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
              <Button
                type="submit"
                text="Save"
                bg="bg-primary1"
                color="text-white"
                Icon={<Confirm />}
              />
            )}
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CreatePackge;
