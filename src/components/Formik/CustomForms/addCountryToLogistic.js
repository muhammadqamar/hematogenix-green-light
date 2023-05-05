import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import { HemaLabel, FormSelect, Button, FormTextarea, FormText, Alert, FormMultiSelect, FormTags, SingleSelect } from '../../../utils';
import {
  Language,
  Cancel,
  Confirm,
  Location,
  Country,
  StudyAlias,
  OutGoing,
  InComing,
  Broker,
  Telephone,
  Fax,
  Email,
  IORContact,
  PostShipping,
  ChangeReason,
} from '../../../HemeIconLibrary';
import Heading from '../../../pages/logistOrchestra/logisticComponents/heading';
import ShippingRules from '../../../pages/logistOrchestra/logisticComponents/shippingRules';
import KitConfiguration from '../../../pages/logistOrchestra/logisticComponents/kitConfiguration';
import { createNewCountryLogisticAction, updateCountryLogisticAction } from '../../../Actions/logistic';

import { setForm, showSuccessReducer } from '../../../Store/reducers/uiSettings';
import { setcountryConfigured } from '../../../Store/reducers/logistic';

const FormikForm = () => {
  const { common, assembly, logistic, uisettings } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        changeReason: '',
        counrtyId: uisettings.editForm?.country?.id || undefined,
        languageId: uisettings.editForm?.language?.id || undefined,
        outgoingHtsCode: uisettings.editForm?.outgoingHtsCode || undefined,
        incomingHtsCode: uisettings.editForm?.incomingHtsCode || undefined,
        shippingDepotId: uisettings.editForm?.shippingDepot?.id || undefined,

        contact: uisettings.editForm?.broker?.contact || undefined,
        address: uisettings.editForm?.broker?.address || undefined,
        phone: uisettings.editForm?.broker?.phone || undefined,
        fax: uisettings.editForm?.broker?.fax || undefined,
        email: uisettings.editForm?.broker?.email || undefined,

        contactIOR: uisettings.editForm?.ioR?.contact?.split(',') || [],
        addressIOR: uisettings.editForm?.ioR?.address || undefined,
        phoneIOR: uisettings.editForm?.ioR?.phone || undefined,
        faxIOR: uisettings.editForm?.ioR?.fax || undefined,
        emailIOR: uisettings.editForm?.ioR?.email || undefined,

        shippingRules:
          common.allShipping?.map((data) => {
            return {
              //  checked: uisettings.editForm?.shippingRules.filter((check) => check?.shippingCondition?.id === data.id)?.length || false,
              shippingConditionId: uisettings.editForm?.shippingRules.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.shippingCondition || data,
              inBoundCourierId: uisettings.editForm?.shippingRules.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.inBoundCourier,
              outBoundCourierId: uisettings.editForm?.shippingRules.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.outBoundCourier,
            };
          }) || [],
        initialRequestAssemblyId: uisettings.editForm?.initialRequestAssembly?.id || logistic?.selectedRegionDetail?.initialRequestAssembly?.id,
        shippingAssemblyId: uisettings.editForm?.shippingAssemblyId || undefined,
        IsPostShippingRequired: uisettings.editForm?.postShippingRequired || false,
        greenLightRequiredTypeId: uisettings.editForm?.greenLightRequiredType?.id || undefined,
        greenLightContact: uisettings.editForm?.greenLightContact?.split(',') || [],
        postShippingContact: uisettings.editForm?.postShippingContact?.split(',') || [],
      }}
      enableReinitialize
      validate={(values) => {
        const errors = {};

        // if (values.greenLightContact?.length === 0) {
        //   errors.greenLightContact = 'Required';
        // }
        if (values.languageId?.length === 0) {
          errors.languageId = 'Required';
        }
        // if (!values.changeReason) {
        //   errors.changeReason = 'Required';
        // }

        // if (values.shippingRules?.filter((ship) => ship.checked)?.length === 0) {
        //   errors.shippingRules = 'Required';
        // }

        return errors;
      }}
      onSubmit={async (values) => {
        console.log(values);
        if (!!uisettings.editForm) {
          const result = await updateCountryLogisticAction(logistic.selectedCountry?.id, {
            ...values,
            ioRContact: {
              address: values.addressIOR || undefined,
              phone: values.phoneIOR || undefined,
              fax: values.faxIOR || undefined,
              email: values.emailIOR || undefined,
              contact: values.contactIOR?.length > 0 ? values.contactIOR?.join(',') : undefined,
            },
            brokerContact: {
              contact: values.contact || undefined,
              address: values.address || undefined,
              phone: values.phone || undefined,
              fax: values.fax || undefined,
              email: values.email || undefined,
            },
            greenLightContact: values.greenLightContact?.length ? values.greenLightContact.join(',') : undefined,
            postShippingContact: values.postShippingContact?.length ? values.postShippingContact.join(',') : undefined,
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
            dispatch(showSuccessReducer(`${result?.data?.country?.name} information updated.`));
            dispatch(setcountryConfigured(result.data.country));
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
        <form onSubmit={handleSubmit} className="max-w-[600px]  overflow-auto m-auto flex flex-col justify-between h-[calc(100%-100px)]">
          <div className="pr-4">
            <Heading heading=" Country Details" />
            <div className="flex items-center gap-[16px] mb-3">
              <div className="w-full">
                <HemaLabel text="Country" className="mb-[10px]" Icon={<Country />} />
                <FormText
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  value={values.name}
                  placeholder={uisettings.editForm?.country?.name || 'Enter'}
                  disabled
                />
              </div>
              <div className="w-full">
                <HemaLabel text="Language" className="mb-[10px]" Icon={<Language />} />
                <FormSelect
                  options={common?.allInventorylanguages || []}
                  placeholder={uisettings.editForm?.language?.name || 'Single Select'}
                  setFieldValue={setFieldValue}
                  name={'languageId'}
                  value={values?.languageId}
                />
                {errors.languageId && touched.languageId && <div className="error text-[red] text-[12px] pt-[2px]">{errors.languageId}</div>}
              </div>
            </div>
            <div className="flex items-center gap-[16px] mb-3">
              <div className="w-full">
                <HemaLabel className="mb-[10px]" text="Outgoing HS/HTS Code" Icon={<OutGoing />} />
                <FormText
                  type="text"
                  name="outgoingHtsCode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  value={values.outgoingHtsCode}
                  placeholder="Enter"
                />
              </div>
              <div className="w-full">
                <HemaLabel text="Incoming HS/HTS Code" className="mb-[10px]" Icon={<InComing />} />
                <FormText
                  type="text"
                  name="incomingHtsCode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  value={values.incomingHtsCode}
                  placeholder="Enter "
                />
              </div>
            </div>
            <div className="flex items-center gap-[16px] mb-[25px]">
              <div className="w-[257.6px]">
                <HemaLabel className="mb-[10px]" text="Ship Through Depot" Icon={<OutGoing />} />
                <FormSelect
                  options={logistic?.allShippingDeports}
                  placeholder={values?.shippingDepot?.name || 'Single Select'}
                  setFieldValue={setFieldValue}
                  name={'shippingDepotId'}
                  value={values?.shippingDepotId}
                />
              </div>
            </div>
            <Heading heading=" Communication Plan Details" />
            <div className="flex items-center gap-[16px] mb-3">
              <div className="w-full">
                <HemaLabel className="mb-[10px]" text="Broker Contact" Icon={<Broker />} required />
                <FormText type="text" name="contact" onChange={handleChange} onBlur={handleBlur} setFieldValue={setFieldValue} value={values.contact} placeholder="Enter" />
              </div>
            </div>

            <div className="flex items-center gap-[16px] mb-3">
              <div className="w-full">
                <HemaLabel className="mb-[10px]" text="Broker Address" Icon={<Location />} />
                <FormText type="text" name="address" onChange={handleChange} onBlur={handleBlur} setFieldValue={setFieldValue} value={values.address} placeholder="Enter " />
              </div>
            </div>
            <div className="flex items-center gap-[16px] mb-3">
              <div className="w-full">
                <HemaLabel text="Broker Telephone" className="mb-[10px]" Icon={<Telephone />} />
                <FormText type="text" name="phone" onChange={handleChange} onBlur={handleBlur} setFieldValue={setFieldValue} value={values.phone} placeholder="Enter " />
              </div>
              <div className="w-full">
                <HemaLabel className="mb-[10px]" text="Broker Fax" Icon={<Fax />} />
                <FormText type="text" name="fax" onChange={handleChange} onBlur={handleBlur} setFieldValue={setFieldValue} value={values.fax} placeholder="Enter " />
              </div>
            </div>
            <div className="flex items-center gap-[16px] mb-3">
              <div className="w-full">
                <HemaLabel text="Broker Email" className="mb-[10px]" Icon={<Email />} />
                <FormText type="email" name="email" onChange={handleChange} onBlur={handleBlur} setFieldValue={setFieldValue} value={values.email} placeholder="Enter " />
              </div>
            </div>

            <div className="flex items-center gap-[16px] mb-3">
              <div className="w-full">
                <HemaLabel text="IOR Contact" className="mb-[10px]" Icon={<IORContact />} />

                <FormTags placeholder={'Multi Select'} name={'contactIOR'} setFieldValue={setFieldValue} value={values?.contactIOR} />
              </div>
            </div>

            <div className="flex items-center gap-[16px] mb-3">
              <div className="w-full">
                <HemaLabel className="mb-[10px]" text="IOR Address" Icon={<Location />} />
                <FormText type="text" name="addressIOR" onChange={handleChange} onBlur={handleBlur} setFieldValue={setFieldValue} value={values.addressIOR} placeholder="Enter " />
              </div>
            </div>
            <div className="flex items-center gap-[16px] mb-3">
              <div className="w-full">
                <HemaLabel text="IOR Telephone" className="mb-[10px]" Icon={<Telephone />} required />
                <FormText type="text" name="phoneIOR" onChange={handleChange} onBlur={handleBlur} setFieldValue={setFieldValue} value={values.phoneIOR} placeholder="Enter" />
              </div>
              <div className="w-full">
                <HemaLabel className="mb-[10px]" text="IOR Email" Icon={<Email />} />
                <FormText type="text" name="emailIOR" onChange={handleChange} onBlur={handleBlur} setFieldValue={setFieldValue} value={values.emailIOR} placeholder="Enter" />
              </div>
            </div>

            <div className="flex items-center gap-[16px] mb-3">
              <div className="w-full">
                <HemaLabel className="mb-[10px]" text="Post Shipping Required" Icon={<PostShipping />} />

                <FormSelect
                  options={[
                    { name: 'Yes', id: true },
                    { name: 'No', id: false },
                  ]}
                  placeholder="Single Select"
                  setFieldValue={setFieldValue}
                  name={'IsPostShippingRequired'}
                  value={values?.IsPostShippingRequired}
                />
              </div>
            </div>

            <div className="flex items-center gap-[16px] mb-3">
              <div className="w-full">
                <HemaLabel className="mb-[10px]" text="Post Shipping Contacts" Icon={<PostShipping />} />

                <FormTags placeholder={'Multi Select'} name={'postShippingContact'} setFieldValue={setFieldValue} value={values?.postShippingContact} />
              </div>
            </div>
            <div className="flex items-center gap-[16px] mb-3">
              <div className="w-full">
                <HemaLabel className="mb-[10px]" text="Green Light Required" Icon={<Location />} />
                <FormSelect
                  options={logistic?.allGreenTypeTypes}
                  placeholder={values?.greenLightRequiredType?.name || 'Single Select'}
                  setFieldValue={setFieldValue}
                  name={'greenLightRequiredTypeId'}
                  value={values?.greenLightRequiredTypeId}
                />
              </div>
            </div>
            <div className=" items-center gap-[16px] mb-[25px]">
              <div className="w-full">
                <HemaLabel className="mb-[10px]" text="Green Light Contact(s)" Icon={<IORContact />} required />

                <FormTags placeholder={'Multi Select'} name={'greenLightContact'} setFieldValue={setFieldValue} value={values?.greenLightContact} />
              </div>
              {errors.greenLightContact && <div className="error text-[red] text-[12px] pt-[2px]">{errors.greenLightContact}</div>}
            </div>
            <Heading heading="Shipping Rules" />
            <div className="mb-[25px]">
              <ShippingRules shipping={values.shippingRules} curiors={common.allCuriors} values={values} dispatch={dispatch} setFieldValue={setFieldValue} name={'shippingRules'} />

              {errors.shippingRules && touched.shippingRules && <div className="error text-[red] text-[12px] pt-[2px]">{errors.shippingRules}</div>}
            </div>

            <Heading heading="General Assemblies" />
            <div className={'flex items-center gap-[16px]'}>
              <div className="w-full">
                <HemaLabel text={'Initial Request Assembly'} Icon={<StudyAlias color="blue" />} className="mb-[10px]" />

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
              <div className="w-full">
                <HemaLabel text={'Shipping Assembly'} Icon={<PostShipping />} className="mb-[10px]" />

                <div className=" gap-[15px] items-center w-full block">
                  <SingleSelect
                    options={assembly?.allAssemblies?.filter((data) => data.assemblyType.name === 'General Assembly') || []}
                    placeholder="N/A"
                    setFieldValue={setFieldValue}
                    name={'shippingAssemblyId'}
                    value={values?.shippingAssemblyId}
                  />
                </div>
                {errors.shippingAssemblyId && touched.shippingAssemblyId && <div className="error text-[red] text-[12px] pt-[2px]">{errors.shippingAssemblyId}</div>}
              </div>
            </div>
            {logistic.selectedProtocolDetail?.qc?.status?.id === 3 && (
              <div className="mt-[20px] gap-[15px] items-center w-full block">
                <HemaLabel text={'Change Reason'} Icon={<ChangeReason />} required={true} className={`mb-[10px]`} />

                <FormTextarea placeholder="write edit reason" onChange={handleChange} onBlur={handleBlur} name={'changeReason'} value={values?.changeReason} />

                {errors.changeReason && touched.changeReason && <div className="error text-[red] text-[12px] pt-[2px]">{errors.changeReason}</div>}
              </div>
            )}
            <Alert type="error" />
            <div className="flex gap-[8px] justify-end mt-10 mb-[34px]">
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
