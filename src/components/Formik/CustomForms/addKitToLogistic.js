import React, { useState } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

import { HemaLabel, Button, Alert, FormMultiSelect, HemaValue } from '../../../utils';
import { NameKit, Cancel, Confirm, StudyAlias } from '../../../HemeIconLibrary';
import Heading from '../../../pages/logistOrchestra/logisticComponents/heading';
import KitRules from '../../../pages/logistOrchestra/logisticComponents/kitRules';
import { setForm, showSuccessReducer } from '../../../Store/reducers/uiSettings';
import { addBulkKitTemplateAction, addKitTemplateAssemblyAction } from '../../../Actions/logistic';

const AddtoKit = ({ assemblyOnly }) => {
  const [ViewDetail, setViewDetail] = useState(false);
  const { assembly, allItems, common, logistic, uisettings } = useSelector((state) => state);
  const dispatch = useDispatch();

  // table style

  const customStyles = {
    rows: {
      style: {
        minHeight: '40px',
      },
    },
    headCells: {
      style: {
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '18px',
        color: '#000000',
      },
    },
    cells: {
      style: {
        fontFamily: 'Inter',
        fontWeight: 500,
        fontSize: '12px',
        lineHeight: '18px',
        color: '#595959',
      },
    },
  };

  return (
    <Formik
      initialValues={{
        assemblies: [],
        itemId: assemblyOnly ? common.editForm?.id : [],
      }}
      enableReinitialize
      validate={(values) => {
        const errors = {};
        if (!values.assemblies.length) {
          errors.assemblies = 'Required';
        }

        if (values?.itemId?.filter((data) => !!data.outboundShippingConditionId).length !== values.itemId?.length && !assemblyOnly && ViewDetail) {
          errors.itemId = 'kindly select all outbound Condition for each kit template';
        }

        if (values?.itemId?.filter((data) => !!data.alias).length !== values.itemId?.length && !assemblyOnly && ViewDetail) {
          errors.itemId = 'kindly add all alias for each kit template';
        }

        if (!values.itemId?.length && !assemblyOnly) {
          errors.itemId = 'Required';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        if (ViewDetail) {
          if (assemblyOnly) {
            setSubmitting(true);
            const result = await addKitTemplateAssemblyAction(
              values.assemblies.map((assemb) => {
                return {
                  logisticBuilderKitId: uisettings.editForm?.id,
                  assemblyId: assemb.id,
                  items: assemb?.items.map((assemb) => {
                    return {
                      itemId: assemb.id,
                      quantity: assemb.quantity,
                    };
                  }),
                  changeReason: 'string',
                };
              }),
              uisettings.editForm?.id,
            );
            setSubmitting(false);
            if (result.status === 200) {
              dispatch(setForm({ state: false, type: '' }));
              dispatch(showSuccessReducer(`${logistic.selectedProtocol?.name} information updated.`));
            }
          } else {
            setSubmitting(true);
            const payload = values.itemId?.map((kit, index) => {
              return {
                alias: kit.alias,
                recordId: logistic.selectedProtocol?.id,
                logisticBuilderLevelId: 1,
                itemId: kit.id,
                outboundShippingConditionId: kit.outboundShippingConditionId,
                assemblies: values.assemblies.map((assemb) => {
                  return {
                    logisticBuilderKitId: kit.id,
                    assemblyId: assemb.id,
                    items: assemb?.items.map((assemb) => {
                      return {
                        itemId: assemb.id,
                        quantity: assemb.quantity,
                      };
                    }),
                    changeReason: 'string',
                  };
                }),
                changeReason: 'string',
              };
            });
            const result = await addBulkKitTemplateAction(payload);
            console.log('result', result);
            setSubmitting(false);
            if (result.status === 200) {
              dispatch(setForm({ state: false, type: '' }));
              dispatch(showSuccessReducer(`${logistic.selectedProtocol?.name} information updated.`));
            }
          }
        } else {
          console.log(values);
          setViewDetail(true);
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
        <form onSubmit={handleSubmit} className="max-w-[600px]  overflow-auto m-auto flex flex-col justify-between h-[calc(100%-100px)]">
          {ViewDetail ? (
            <div>
              <Heading heading="Kit Details" />
              {assemblyOnly ? (
                <div className="flex flex-col gap-[16px] mb-[16px]">
                  <div className="flex">
                    <HemaLabel className="w-[160px]" text={'Kit Template'} />
                    <HemaValue text={uisettings.editForm?.alias} />
                  </div>
                </div>
              ) : (
                <>
                  <KitRules shipping={common.allShipping} values={values} dispatch={dispatch} setFieldValue={setFieldValue} name={'itemId'} />
                  {errors.itemId && touched.itemId && <div className="error text-[red] text-[12px] pt-[2px]">{errors.itemId}</div>}
                </>
              )}
              <div className="mt-[22px]">
                <Heading heading="Assembly Details" />
              </div>
              {values.assemblies?.map((assemb) => {
                return (
                  <div>
                    <div className="flex flex-col gap-[16px] mb-[16px]">
                      <div className="flex">
                        <HemaLabel className="w-[160px]" text={'Assembly Name'} />
                        <HemaValue text={assemb.name} />
                      </div>
                      <div className="flex">
                        <HemaLabel className="w-[160px]" text={'Testing Lab'} />
                        <HemaValue text={assemb?.testingLab?.name} />
                      </div>
                      <div className="flex">
                        <HemaLabel className="w-[160px]" text={'Inbound Condition'} />
                        <HemaValue text={assemb?.inboundShippingCondition?.name} />
                      </div>
                    </div>
                    <div className="w-full h-auto rounded-2 border border-solid border-[#DEE2E6] overflow-hidden mb-[26px]">
                      <DataTable
                        customStyles={customStyles}
                        data={assemb?.items || []}
                        columns={[
                          {
                            name: 'Item Name',
                            selector: (row) => {
                              return (
                                <div className="flex-shrink-0 flex items-center gap-[10px] cursor-pointer">
                                  <HemaLabel text={row?.item?.name} />
                                </div>
                              );
                            },
                          },
                          {
                            name: 'Quantity',
                            cell: (row) => {
                              return (
                                <div className="block items-center gap-[10px] w-full cursor-pointer">
                                  <HemaLabel text={row?.quantity} />
                                </div>
                              );
                            },
                          },
                        ]}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <Heading heading="Kit Details" />
              <div className={'w-full'}>
                <HemaLabel text={'Kit Template'} Icon={<StudyAlias />} required={true} className={`mb-[10px]`} />
                <div className="mb-[21px]">
                  <div className=" gap-[15px] items-center w-full block">
                    {assemblyOnly ? (
                      <div className="flex flex-col gap-[16px] mb-[16px]">
                        <div className="flex">
                          <HemaLabel className="w-[160px]" text={'Kit Template'} />
                          <HemaValue text={uisettings.editForm?.alias} />
                        </div>
                      </div>
                    ) : (
                      <FormMultiSelect
                        options={allItems?.allItems?.filter((data) => data.kitId !== null) || []}
                        placeholder="Multi select"
                        setFieldValue={setFieldValue}
                        name={'itemId'}
                        value={values?.itemId}
                      />
                    )}
                  </div>
                  {errors.itemId && touched.itemId && <div className="error text-[red] text-[12px] pt-[2px]">{errors.itemId}</div>}
                </div>
                <Heading heading="Assembly Details" />
                <div className=" gap-[15px] items-center w-full block">
                  <HemaLabel text={'Return Kit Assembly'} Icon={<NameKit />} required={true} className={`mb-[10px]`} />

                  <FormMultiSelect
                    options={assembly?.allAssemblies?.filter((data) => data.assemblyType.id === 1) || []}
                    placeholder="Multi select"
                    setFieldValue={setFieldValue}
                    name={'assemblies'}
                    value={values?.assemblies}
                  />

                  {errors.assemblies && touched.assemblies && <div className="error text-[red] text-[12px] pt-[2px]">{errors.assemblies}</div>}
                </div>
              </div>
            </div>
          )}
          <Alert type="error" />
          <div className="flex gap-[8px] justify-end my-[20px]">
            <Button
              cta={() => {
                if (ViewDetail) {
                  setViewDetail(false);
                  console.log('values', values);
                } else {
                  dispatch(setForm({ state: false, type: '' }));
                }
              }}
              type="button"
              text={ViewDetail ? 'Back' : 'Cancel'}
              bg="bg-white"
              border="border-primary1"
              color="text-primary1"
              Icon={<Cancel />}
            />

            {isSubmitting ? (
              <Button
                type="button"
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
              <Button type="submit" text={ViewDetail ? 'Save' : 'Next'} bg="bg-primary1" color="text-white" Icon={<Confirm />} />
            )}
          </div>
        </form>
      )}
    </Formik>
  );
};

export default AddtoKit;
