import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import { HemaLabel, FormSelect, Button, FormTextarea, FormText, Alert, FormMultiSelect, SingleSelect } from '../../../utils';
import { Cancel, Confirm, ChangeReason, Location, Country, StudyAlias } from '../../../HemeIconLibrary';
import Heading from '../../../pages/logistOrchestra/logisticComponents/heading';
import ShippingRules from '../../../pages/logistOrchestra/logisticComponents/shippingRules';
import KitConfiguration from '../../../pages/logistOrchestra/logisticComponents/kitConfiguration';
import { addNewRegionProtocolLogistic, updateRegionProtocolLogistic, getAllLogisticLevelNode, getAllCountryForRegionAction } from '../../../Actions/logistic';

import { setForm, showSuccessReducer } from '../../../Store/reducers/uiSettings';
import { setSelectedRegion } from '../../../Store/reducers/logistic';

const FormikForm = () => {
  const { common, assembly, logistic, uisettings } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    setCountries(uisettings.editForm?.countries || []);
  }, [uisettings.editForm]);
  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: uisettings?.editForm?.name || '',
        countryIds: countries,
        shippingRules: uisettings.editForm
          ? common.allShipping?.map((data) => {
              return {
                //  checked: uisettings.editForm?.shippingRules.filter((check) => check?.shippingCondition?.id === data.id)?.length || false,
                shippingConditionId: uisettings.editForm?.shippingRules.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.shippingCondition || data,
                inBoundCourierId: uisettings.editForm?.shippingRules.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.inBoundCourier,
                outBoundCourierId: uisettings.editForm?.shippingRules.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.outBoundCourier,
              };
            })
          : common.allShipping?.map((data) => {
              return {
                //   checked: logistic.selectedRegionDetail?.shippingRules.filter((check) => check?.shippingCondition?.id === data.id)?.length || false,
                shippingConditionId: logistic.selectedProtocolDetail?.shippingRules.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.shippingCondition || data,
                inBoundCourierId: logistic.selectedProtocolDetail?.shippingRules.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.inBoundCourier,
                outBoundCourierId: logistic.selectedProtocolDetail?.shippingRules.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.outBoundCourier,
              };
            }),
        initialRequestAssemblyId: uisettings?.editForm ? uisettings?.editForm?.initialRequestAssembly?.id : logistic?.selectedProtocolDetail?.initialRequestAssembly?.id,
        logisticBuilderKits: logistic.selectedProtocolDetail?.logisticBuilderKits,
        changeReason: '',
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        if (values.countryIds?.length === 0) {
          errors.countryIds = 'Required';
        }
        // if (!values.initialRequestAssemblyId) {
        //   errors.initialRequestAssemblyId = 'Required';
        // }
        // if (!values.changeReason) {
        //   errors.changeReason = 'Required';
        // }
        // if (values.shippingRules?.filter((ship) => ship.checked)?.length === 0) {
        //   errors.shippingRules = 'Required';
        // }

        return errors;
      }}
      onSubmit={async (values, setFieldValue) => {
        var result;
        if (uisettings.editForm) {
          result = await updateRegionProtocolLogistic(logistic.selectedRegionDetail?.id, {
            ...values,
            shippingRules: values.shippingRules?.map((ship) => {
              return {
                shippingConditionId: ship.shippingConditionId?.id || ship?.shippingConditionId,
                outBoundCourierId: ship?.outBoundCourierId?.id || ship?.outBoundCourierId,
                inBoundCourierId: ship?.inBoundCourierId?.id || ship?.inBoundCourierId,
              };
            }),
            countryIds: values?.countryIds?.map((country) => country.id),
          });
        } else {
          result = await addNewRegionProtocolLogistic(logistic.selectedProtocol?.id, {
            ...values,
            shippingRules: values.shippingRules?.map((ship) => {
              return {
                shippingConditionId: ship.shippingConditionId?.id || ship?.shippingConditionId,
                outBoundCourierId: ship?.outBoundCourierId?.id || ship?.outBoundCourierId,
                inBoundCourierId: ship?.inBoundCourierId?.id || ship?.inBoundCourierId,
              };
            }),
            countryIds: values?.countryIds?.map((country) => country.id),
          });

          if (result.status === 200) {
            getAllLogisticLevelNode(logistic?.selectedProtocol?.id);
          }
        }

        if (result.status === 200) {
          dispatch(setForm({ state: false, type: '' }));
          dispatch(showSuccessReducer(`Region ${result.data?.name} is ${uisettings.editForm ? 'updated' : 'Added'}.`));
          if (logistic?.selectedRegion?.id) {
            getAllCountryForRegionAction(logistic?.selectedRegion?.id);
          }
          if (!uisettings?.editForm) {
            dispatch(setSelectedRegion({ id: result?.data?.id, name: result?.data?.name }));
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
        <form onSubmit={handleSubmit} className="max-w-[600px]  overflow-auto m-auto h-[calc(100%-100px)]">
          <div className="pr-[10px]">
            <Heading heading="Details" />

            <div className="flex items-center gap-[16px] mb-[25px]">
              <div className="w-full">
                <HemaLabel className="mb-[10px]" text="Region Name" Icon={<Location />} required />
                <FormText type="text" name="name" onChange={handleChange} onBlur={handleBlur} setFieldValue={setFieldValue} value={values.name} placeholder="Enter region name" />
                {errors.name && touched.name && <div className="error text-[red] text-[12px] pt-[2px]">{errors.name}</div>}
              </div>
              <div className="w-full">
                <HemaLabel text="Country" className="mb-[10px]" Icon={<Country />} required />
                <FormMultiSelect options={common?.allCountries || []} placeholder="Multi select" setFieldValue={setFieldValue} name={'countryIds'} value={values?.countryIds} />
                {errors.countryIds && touched.countryIds && <div className="error text-[red] text-[12px] pt-[2px]">{errors.countryIds}</div>}
              </div>
            </div>
            <Heading heading="Shipping Rules" />
            <div className="mb-[25px]">
              <ShippingRules shipping={values.shippingRules} curiors={common.allCuriors} values={values} dispatch={dispatch} setFieldValue={setFieldValue} name={'shippingRules'} />

              {errors.shippingRules && touched.shippingRules && <div className="error text-[red] text-[12px] pt-[2px]">{errors.shippingRules}</div>}
            </div>

            {/*  <Heading heading="Available Kit Assemblies" />
            <div className="mb-[29px]">
              <KitConfiguration
                allKits={logistic?.selectedProtocolDetail}
                values={values}
                dispatch={dispatch}
                setFieldValue={setFieldValue}
                name={'shippingRules'}
                type="add-region"
              />
            </div>
           */}
            <Heading heading="Initial Request" />
            <div className={'w-full h-full'}>
              <div className="mb-[25px]">
                <HemaLabel text={'Select Kit Assembly'} Icon={<StudyAlias color="blue" />} required={true} className="mb-[10px]" />

                <div className=" gap-[15px] items-center w-full block">
                  {/* <FormSelect
                    options={assembly?.allAssemblies?.filter((data) => data.assemblyType.name === 'General Assembly') || []}
                    placeholder="N/A"
                    setFieldValue={setFieldValue}
                    name={'initialRequestAssemblyId'}
                    value={values?.initialRequestAssemblyId}
                  /> */}
                  <SingleSelect
                    options={assembly?.allAssemblies?.filter((data) => data.assemblyType.name === 'General Assembly') || []}
                    placeholder="N/A"
                    setFieldValue={setFieldValue}
                    name={'initialRequestAssemblyId'}
                    value={values?.initialRequestAssemblyId}
                  />
                </div>
                {errors.initialRequestAssemblyId && touched.initialRequestAssemblyId && (
                  <div className="error text-[red] text-[12px] pt-[2px]">{errors.initialRequestAssemblyId}</div>
                )}
              </div>
              {logistic.selectedProtocolDetail?.qc?.status?.id === 3 && (
                <>
                  <Heading heading="Change Details" />
                  <div className=" gap-[15px] items-center w-full block">
                    <HemaLabel text={'Change Reason'} Icon={<ChangeReason />} required={true} className={`mb-[10px]`} />

                    <FormTextarea placeholder="write edit reason" onChange={handleChange} onBlur={handleBlur} name={'changeReason'} value={values?.changeReason} />

                    {errors.changeReason && touched.changeReason && <div className="error text-[red] text-[12px] pt-[2px]">{errors.changeReason}</div>}
                  </div>
                </>
              )}
            </div>
            <Alert type="error" />
            <div className="flex gap-[8px] justify-end pt-10 pb-[34px]">
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
                <Button type="submit" text="Save" bg="bg-primary1" color="text-white" Icon={<Confirm />} />
              )}
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default FormikForm;
