import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import DataTable from 'react-data-table-component';
import { Alert as BootstrapAlert, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import {
  Cancel,
  Confirm,
  ChangeReason,
  CheckReady,
} from '../../../HemeIconLibrary';
// Utils
import HemaHeadingWithSubText from '../../../utils/HemaHeadingWithSubText';
import {
  Alert,
  HemaLabel,
  HemaValue,
  FormText,
  FormSwitch,
  Button,
  FormTextarea,
} from '../../../utils';
import { showSuccessReducer } from '../../../Store/reducers/uiSettings';
// Actions
import {
  getPerimssionAction,
  createNewRoleAction,
  deleteRoleAction,
  updateRoleAction,
} from '../../../Actions/settings';

const customStyles = {
  rows: {
    style: {},
  },
  headCells: {
    style: {},
  },
  cells: {
    style: {},
  },
};

const RoleChanges = ({ setEditRole }) => {
  const dispatch = useDispatch();
  const { uisettings, settings } = useSelector((state) => state);

  /* form states */
  const [CTA, setCTA] = useState();
  const [formName, setformName] = useState();
  const [formIcon, setFormIcon] = useState();
  const [formValidation, setFormValidation] = useState();
  const [updatedData, setUpdatedData] = useState();

  const [searchQuery, setsearchQuery] = useState('');
  const [allItemsInTemplate, setAllItemsInTemplate] = useState();

  useEffect(() => {
    getPerimssionAction();
  }, []);

  const SkelatonCoponent = () => {
    return (
      <>
        <br />
        <Skeleton count={4} />
        <br />
        <Skeleton count={4} />
        <br />
        <Skeleton count={4} />
        <br />
      </>
    );
  };

  return (
    <>
      <div className="flex gap-[10px] justify-between items-end">
        <HemaHeadingWithSubText
          heading={
            uisettings.formName === 'edit role'
              ? 'Edit Role'
              : uisettings?.formName === 'delete role'
              ? 'Delete Role'
              : uisettings?.formName === 'copy role'
              ? 'Copy Role'
              : 'Add New Role'
          }
          sub="Manage your user management here,"
        />
      </div>
      <Alert />

      <div>
        <Formik
          enableReinitialize
          initialValues={{
            name:
              uisettings?.formName === 'copy role'
                ? uisettings.editForm?.name + ' Copy'
                : uisettings.editForm?.name || '',
            permissions:
              uisettings.editForm?.permissions || settings.permission || [],
            changeReason: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Required';
            }
            if (!values.changeReason) {
              errors.changeReason = 'Required';
            }

            return errors;
          }}
          onSubmit={async (values) => {

            if (uisettings.editForm && uisettings?.formName === 'edit role') {
              const result = await updateRoleAction(
                uisettings.editForm?.id,
                values
              );
              if (result.status === 200) {
                setEditRole(false);
                dispatch(showSuccessReducer(`${values.name} role is updated`));
              }
            } else if (
              uisettings.editForm &&
              uisettings?.formName === 'delete role'
            ) {
              const result = await deleteRoleAction(uisettings.editForm?.id);
              if (result.status === 200) {
                setEditRole(false);
                dispatch(showSuccessReducer(`${values.name} is removed`));
              }
            } else {
              const result = await createNewRoleAction(values);
              if (result.status === 200) {
                setEditRole(false);
                dispatch(
                  showSuccessReducer(`${values.name} is added as a new role`)
                );
              }
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
            <form onSubmit={handleSubmit} className="">
              <div className="bg-white rounded-[5px] px-[10px] py-[15px] mt-[27px] mb-[13px] inventory-tabs">
                <div className="flex gap-[10px] w-[400px]">
                  <HemaLabel
                    text="Role Name"
                    className="whitespace-nowrap"
                    required={true}
                  />
                  <FormText
                    type="text"
                    name="name"
                    placeholder="Enter Role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    value={values.name}
                    disabled={
                      uisettings?.formName === 'delete role' ? true : false
                    }
                  />
                </div>
                {errors.name && touched.name && (
                  <div className="error text-[red] text-[12px] pt-[2px]">
                    {errors.name}
                  </div>
                )}
              </div>
              <div className="bg-white rounded-[5px] pt-[21px] mt-[27px] mb-[13px] inventory-tabs permission-table">
                <div className=" flex items-center gap-[3px] pb-[21px] px-4 border-b-[1px] border-solid border-[#DEE2E6]">
                  <CheckReady />

                  <HemaHeadingWithSubText
                    HeadingFontSize="20px"
                    HeadingLineHeight="30px"
                    heading="Permission Assignment"
                  />
                  <sup className="font-medium text-xs leading-[18px] text-[#F20000]">
                    *
                  </sup>
                </div>
                {!settings?.permission ? (
                  <SkelatonCoponent />
                ) : settings?.permission?.length > 0 ? (
                  <DataTable
                    customStyles={customStyles}
                    data={values.permissions}
                    columns={[
                      {
                        name: (
                          <HemaValue
                            text={'Roles'}
                            className="font-normal text-[#000000]"
                          />
                        ),
                        sortable: true,
                        style: {
                          minWidth: '710px !important',
                        },
                        filterable: true,
                        selector: (row) => <HemaValue text={row?.name} />,
                      },
                      {
                        name: (
                          <HemaValue
                            text={'Create'}
                            className="font-normal text-[#000000]"
                          />
                        ),
                        sortable: true,
                        filterable: true,
                        selector: (row) => (
                          <FormSwitch
                            disabled={
                              uisettings?.formName === 'delete role'
                                ? true
                                : false
                            }
                            setFieldValue={(name, value) => {
                              setFieldValue(
                                'permissions',
                                values.permissions?.map((data) => {
                                  if (data.id === row.id) {
                                    return { ...row, write: value };
                                  } else {
                                    return data;
                                  }
                                })
                              );
                            }}
                            name="permissions"
                            initialValue={row?.write}
                          />
                        ),
                      },
                      {
                        name: (
                          <HemaValue
                            text={'Read'}
                            className="font-normal text-[#000000]"
                          />
                        ),
                        sortable: true,
                        filterable: true,
                        selector: (row) => (
                          <FormSwitch
                            setFieldValue={(name, value) => {
                              setFieldValue(
                                'permissions',
                                values.permissions?.map((data) => {
                                  if (data.id === row.id) {
                                    return { ...row, read: value };
                                  } else {
                                    return data;
                                  }
                                })
                              );
                            }}
                            name="permissions"
                            initialValue={row?.read}
                          />
                        ),
                      },
                      {
                        name: (
                          <HemaValue
                            text={'Update'}
                            className="font-normal text-[#000000]"
                          />
                        ),
                        sortable: true,
                        filterable: true,
                        selector: (row) => (
                          <FormSwitch
                            setFieldValue={(name, value) => {
                              setFieldValue(
                                'permissions',
                                values.permissions?.map((data) => {
                                  if (data.id === row.id) {
                                    return { ...row, update: value };
                                  } else {
                                    return data;
                                  }
                                })
                              );
                            }}
                            name="permissions"
                            initialValue={row?.update}
                          />
                        ),
                      },
                      {
                        name: (
                          <HemaValue
                            text={'Delete'}
                            className="font-normal text-[#000000]"
                          />
                        ),
                        sortable: true,
                        filterable: true,
                        selector: (row) => (
                          <FormSwitch
                            setFieldValue={(name, value) => {
                              setFieldValue(
                                'permissions',
                                values.permissions?.map((data) => {
                                  if (data.id === row.id) {
                                    return { ...row, delete: value };
                                  } else {
                                    return data;
                                  }
                                })
                              );
                            }}
                            name="permissions"
                            initialValue={row?.delete}
                          />
                        ),
                      },
                      {
                        name: (
                          <HemaValue
                            text={'Special'}
                            className="font-normal text-[#000000]"
                          />
                        ),
                        sortable: true,
                        filterable: true,
                        selector: (row) => (
                          <FormSwitch
                            setFieldValue={(name, value) => {
                              setFieldValue(
                                'permissions',
                                values.permissions?.map((data) => {
                                  if (data.id === row.id) {
                                    return { ...row, special: value };
                                  } else {
                                    return data;
                                  }
                                })
                              );
                            }}
                            name="permissions"
                            initialValue={row?.special}
                          />
                        ),
                      },
                    ]}
                  />
                ) : (
                  <BootstrapAlert
                    variant="warning"
                    className="mt-3 text-center"
                  >
                    No Area Exists for permission
                  </BootstrapAlert>
                )}

                <Alert type="error" />
              </div>
              <div className="w-full  bg-white p-[16px] rounded-[5px]">
                <div className=" gap-[15px] items-center w-full block mb-[16px]">
                  <HemaLabel
                    text={'Change Reason'}
                    Icon={<ChangeReason />}
                    required={true}
                    className={`mb-[10px]`}
                  />

                  <FormTextarea
                    placeholder="write edit reason"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'changeReason'}
                    value={values?.changeReason}
                  />

                  {errors.changeReason && touched.changeReason && (
                    <div className="error text-[red] text-[12px] pt-[2px]">
                      {errors.changeReason}
                    </div>
                  )}
                </div>

                <div className="flex gap-[8px] justify-end ">
                  <Button
                    cta={() => {
                      setEditRole(false);
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
                      text={uisettings?.editForm ? 'Update' : 'Create'}
                      bg="bg-primary1"
                      color="text-white"
                      Icon={<Confirm />}
                    />
                  )}
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default RoleChanges;
