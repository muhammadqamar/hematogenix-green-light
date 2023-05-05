import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import { HemaLabel, FormSelect, Button, FormTextarea, Alert, SingleSelect } from '../../../utils';
import { StudyAlias, Cancel, Confirm, ChangeReason } from '../../../HemeIconLibrary';
import Heading from '../../../pages/logistOrchestra/logisticComponents/heading';
import ShippingRules from '../../../pages/logistOrchestra/logisticComponents/shippingRules';
import { updateProtocolLogisticBuilderAction } from '../../../Actions/logistic';
import { setForm, showSuccessReducer } from '../../../Store/reducers/uiSettings';

const FormikForm = () => {
  const { common, assembly, logistic, uisettings } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        shippingRules:
          common.allShipping?.map((data) => {
            return {
              //    checked: uisettings.editForm?.shippingRules.filter((check) => check?.shippingCondition?.id === data.id)?.length || false,
              shippingConditionId: uisettings.editForm?.shippingRules.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.shippingCondition || data,
              inBoundCourierId: uisettings.editForm?.shippingRules.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.inBoundCourier,
              outBoundCourierId: uisettings.editForm?.shippingRules.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.outBoundCourier,
            };
          }) || [],
        initialRequestAssemblyId: uisettings?.editForm ? uisettings?.editForm?.initialRequestAssembly?.id : '',
        changeReason: '',
      }}
      enableReinitialize
      validate={(values) => {
        const errors = {};
        // if (!values.initialRequestAssemblyId) {
        //   errors.initialRequestAssemblyId = 'Required';
        // }
        // if (!values.changeReason && logistic.selectedProtocolDetail?.qc?.status?.id===3) {
        //   errors.changeReason = 'Required';
        // }
        // if (values.shippingRules?.filter((ship) => ship.checked)?.length === 0) {
        //   errors.shippingRules = 'Required';
        // }

        return errors;
      }}
      onSubmit={async (values) => {
        const result = await updateProtocolLogisticBuilderAction(logistic.selectedProtocol?.id, {
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
          dispatch(showSuccessReducer(`Study ${result.data?.study.name} is updated.`));
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
          <div>
            <Heading heading="Shipping Rules" />

            <div className="mb-[29px]">
              <ShippingRules shipping={values.shippingRules} curiors={common.allCuriors} values={values} dispatch={dispatch} setFieldValue={setFieldValue} name={'shippingRules'} />
              {errors.shippingRules && touched.shippingRules && <div className="error text-[red] text-[12px] pt-[2px]">{errors.shippingRules}</div>}
            </div>

            <Heading heading="Initial Request" />
            <div className={'w-full'}>
              <div className="mb-[30px]">
                <HemaLabel text={'Select Kit Assembly'} Icon={<StudyAlias color="blue" />} required={true} className={`mb-[10px]`} />

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
                <div className=" gap-[15px] items-center w-full block">
                  <HemaLabel text={'Change Reason'} Icon={<ChangeReason />} required={true} className={`mb-[10px]`} />

                  <FormTextarea placeholder="write edit reason" onChange={handleChange} onBlur={handleBlur} name={'changeReason'} value={values?.changeReason} />

                  {errors.changeReason && touched.changeReason && <div className="error text-[red] text-[12px] pt-[2px]">{errors.changeReason}</div>}
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
