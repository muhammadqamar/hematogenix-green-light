import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import { HemaLabel, FormSelect, Button, Alert, FormTextarea, SingleSelect } from '../../../utils';
import { Cancel, Confirm, Country, StudyAlias, ChangeReason, CreateSite, SiteName } from '../../../HemeIconLibrary';
import Heading from '../../../pages/logistOrchestra/logisticComponents/heading';
import ShippingRules from '../../../pages/logistOrchestra/logisticComponents/shippingRules';
import { createSideLogisticAction, updateSiteLogisticAction, protocolDetailIdAction } from '../../../Actions/logistic';
import { setForm, showSuccessReducer } from '../../../Store/reducers/uiSettings';
import { getAllUnconfiguredSiteAction } from '../../../Actions/siteManagment';
import { setSelectedSite } from '../../../Store/reducers/logistic';
const AddSite = () => {
  const { common, assembly, logistic, sites, uisettings } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    // getAllUnconfiguredSiteAction(logistic.selectedProtocol?.studyId);
  }, []);
  return (
    <Formik
      initialValues={{
        siteCode: uisettings.editForm?.siteId || '',
        initialRequestAssemblyId: uisettings?.editForm ? uisettings.editForm?.initialRequestAssembly?.id : logistic.selectedCountryDetail?.initialRequestAssembly?.id,
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
                shippingConditionId: logistic.selectedCountryDetail?.shippingRules.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.shippingCondition || data,
                inBoundCourierId: logistic.selectedCountryDetail?.shippingRules.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.inBoundCourier,
                outBoundCourierId: logistic.selectedCountryDetail?.shippingRules.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.outBoundCourier,
              };
            }),
        changeReason: '',
      }}
      enableReinitialize
      validate={(values) => {
        const errors = {};
        // if (!values.initialRequestAssemblyId) {
        //   errors.initialRequestAssemblyId = 'Required';
        // }
        if (!values.siteCode && !uisettings.editForm?.siteId) {
          errors.siteCode = 'Required';
        }
        // if (!values.changeReason && uisettings.editForm?.siteId) {
        //   errors.changeReason = 'Required';
        // }

        // if (values.shippingRules?.filter((ship) => ship.checked)?.length === 0) {
        //   errors.shippingRules = 'Required';
        // }

        return errors;
      }}
      onSubmit={async (values, setFieldValue) => {
        if (uisettings.editForm?.siteId) {
          const result = await updateSiteLogisticAction(uisettings.editForm?.id, {
            ...values,
            shippingRules: values.shippingRules?.map((ship) => {
              return {
                shippingConditionId: ship.shippingConditionId?.id || ship?.shippingConditionId,
                outBoundCourierId: ship?.outBoundCourierId?.id || ship?.outBoundCourierId,
                inBoundCourierId: ship?.inBoundCourierId?.id || ship?.inBoundCourierId,
              };
            }),
          });
          if (result.status === 200) {
            dispatch(setForm({ state: false, type: '' }));
            dispatch(showSuccessReducer(`${result?.data?.siteName} information updated.`));
          }
        } else {
          const result = await createSideLogisticAction(logistic.selectedCountry?.id, values.siteCode, {
            ...values,
            shippingRules: values.shippingRules?.map((ship) => {
              return {
                shippingConditionId: ship.shippingConditionId?.id || ship?.shippingConditionId,
                outBoundCourierId: ship?.outBoundCourierId?.id || ship?.outBoundCourierId,
                inBoundCourierId: ship?.inBoundCourierId?.id || ship?.inBoundCourierId,
              };
            }),
          });
          if (result.status === 200) {
            dispatch(setForm({ state: false, type: '' }));
            dispatch(showSuccessReducer(`${result?.data?.siteName} information added.`));
            if (!uisettings?.editForm) {
              dispatch(setSelectedSite({ id: result?.data?.id, name: result?.data?.name }));
            }
          }
          await protocolDetailIdAction(logistic?.selectedProtocol?.id);
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
        <form onSubmit={handleSubmit} className="max-w-[600px]  overflow-auto m-auto flex flex-col ">
          <div className="pr-4">
            {!uisettings.editForm?.siteId && (
              <>
                <Heading heading="Site Details" />

                <div className=" items-center gap-[16px] mb-3">
                  <div className="w-full">
                    <HemaLabel text="Site Number" className="mb-[10px]" Icon={<SiteName />} required />
                    <FormSelect
                      options={logistic?.unConfigSite || []}
                      placeholder={uisettings.editForm?.siteName || 'Select Site'}
                      setFieldValue={setFieldValue}
                      name={'siteCode'}
                      value={values?.siteCode}
                    />
                  </div>
                  {errors.siteCode && <div className="error text-[red] text-[12px] pt-[2px]">{errors.siteCode}</div>}
                </div>
              </>
            )}

            <Heading heading="Shipping Rules" />
            <div className="mb-[25px]">
              <ShippingRules shipping={values.shippingRules} curiors={common.allCuriors} values={values} dispatch={dispatch} setFieldValue={setFieldValue} name={'shippingRules'} />

              {errors.shippingRules && touched.shippingRules && <div className="error text-[red] text-[12px] pt-[2px]">{errors.shippingRules}</div>}
            </div>

            <Heading heading="Initial Request" />
            <div className={'w-full h-full'}>
              <div className="">
                <HemaLabel text={'Select Kit Assembly'} Icon={<StudyAlias color="blue" />} className="mb-[10px]" />

                <div className=" gap-[15px] items-center w-full block">
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
                <div className=" gap-[15px] items-center w-full block mt-[20px]">
                  <HemaLabel text={'Change Reason'} Icon={<ChangeReason />} required={true} className={`mb-[10px]`} />

                  <FormTextarea placeholder="write edit reason" onChange={handleChange} onBlur={handleBlur} name={'changeReason'} value={values?.changeReason} />

                  {errors.changeReason && touched.changeReason && <div className="error text-[red] text-[12px] pt-[2px]">{errors.changeReason}</div>}
                </div>
              )}
              <Alert type="error" />
            </div>

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

export default AddSite;
