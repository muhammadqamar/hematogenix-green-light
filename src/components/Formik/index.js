import React, { useEffect, useState, useRef } from 'react';
import { Formik } from 'formik';
import {
  HemaLabel,
  FormText,
  FormSelect,
  FormTextarea,
  ImageUpload,
  FormSwitch,
  Button,
  HemaValue,
  LocationExplorer,
  FormCheckbox,
  SingleSelect,
  ScreeningKitTable,
  KitpreparationTable,
  FormMultiSelect,
  FormTags,
} from '../../utils';
import DataTable from 'react-data-table-component';
import { Confirm, Cancel, CrossIcon, SelectDownArrow, ImportIcon } from '../../HemeIconLibrary';

import { useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { Alert } from '../../utils';
import { setForm, showErrorReducer } from '../../Store/reducers/uiSettings';
import { useSelector } from 'react-redux';
import { formats } from '../../utils/DummyData/formats';
import KitBuilder, { NewRow, DataTableRowItems } from './CustomForms/kit';
import EditKitBuilder from './CustomForms/editKit';
import StorageLocationForm from './CustomForms/StorageExporer';
import AssignShippingRules from './CustomForms/assignShippingRules';
import AssignShippingtoLower from './CustomForms/shippingToLeveltree';
import AddTOKit from './CustomForms/addKitToLogistic';
import UnconfiSite from './CustomForms/showUnconfigSite';
import AddNewRegion from './CustomForms/addregionToLogistic';
import AddNewCountry from './CustomForms/addCountryToLogistic';
import AddNewSite from './CustomForms/addSiteToLogistic';
import CheckboxTable from '../../utils/tableCheckbox';
import Acknowledgment from './CustomForms/acknowledge';
import CreatePackge from "./CustomForms/createPackage"

import Heading from '../../pages/logistOrchestra/logisticComponents/heading';
const FormikForm = ({
  data,
  cta,
  formValidation,
  formName,
  onFormChange,
  setformName,
  setFormIcon,
  setUpdatedData,
  onFormClose,
  subheadingComponent,
  allItemsInTemplate,
  dropDownItemList,
  cancelBtnIcon,
  cancelBtnText,
  okBtnIcon,
  okBtnText,
  setokBtnIcon,
  setokBtnText,
}) => {
  const [intialValuesFromProp, setIntialValuesFromProp] = useState();
  const [mediaInputOne, setMediaInputOne] = useState();
  const [showStorage, setShowStorage] = useState(false);
  const { uisettings, allItems, storageLocation, common, settings } = useSelector((state) => state);
  const [items, setItems] = useState([]);
  const [storageCheck, setstoragecheck] = useState();
  const formikRef = useRef();
  const dispatch = useDispatch();
  const stateRedux = useSelector((state) => state);
  useEffect(() => {
    const initialValues = data?.map((value) => {
      return {
        [value.name]: !!value.initialValue ? value.initialValue : undefined,
      };
    });

    setIntialValuesFromProp(initialValues?.reduce((obj, item) => Object.assign(obj, item), {}));
  }, [JSON.stringify(data)]);

  useEffect(() => {
    if (allItemsInTemplate) {
      setItems(allItemsInTemplate);
    }
  }, [allItemsInTemplate]);

  const handleFormChange = (event) => {
    if (onFormChange) {
      if (event?.target?.name && event.target.name === 'isParentLocation') {
        data[2].disabled = event.target.checked;
      }

      if (event?.target?.name && event.target.name === 'formatId') {
        const formatId = parseInt(event?.target?.value);
        const validTypes = ['Single Select', 'Multiple Select'];
        const validFormatIds = formats.filter((ele) => validTypes.includes(ele.name)).map((ele) => ele.id);
        if (formatId && validFormatIds.includes(formatId)) {
          data[2].disabled = false;
          data[2].required = true;
        } else {
          data[2].disabled = true;
          data[2].required = false;
        }
      }
      onFormChange(event);
    }
  };

  return uisettings.formName === 'create-kit-template' || uisettings.formName === 'copy-kit-template' ? (
    <KitBuilder cta={cta} />
  ) : uisettings.formName === 'edit-kit-template' ? (
    <EditKitBuilder setUpdatedData={setUpdatedData} setformName={setformName} setFormIcon={setFormIcon} setokBtnIcon={setokBtnIcon} setokBtnText={setokBtnText} cta={cta} />
  ) : uisettings.formName === 'assign-shipping-rule' ? (
    <AssignShippingRules />
  ) : uisettings.formName === 'addKitToLogistic' ? (
    <AddTOKit />
  ) : uisettings.formName === 'addKitToLogisticAssemlyOnly' ? (
    <AddTOKit assemblyOnly />
  ) : uisettings.formName === 'add-new-region' || uisettings.formName === 'edit-region' ? (
    <AddNewRegion />
  ) : uisettings.formName === 'assign-shipping-region-level' ||
    uisettings.formName === 'assign-shipping-study-level' ||
    uisettings?.formName === 'assign-shipping-country-level' ||
    uisettings?.formName === 'assign-kit-study-level' ||
    uisettings?.formName === 'assign-kit-region-level' ||
    uisettings?.formName === 'assign-kit-country-level' ||
    uisettings?.formName === 'assign-initial-kit-study-level' ||
    uisettings?.formName === 'assign-initial-kit-region-level' ||
    uisettings?.formName === 'assign-initial-kit-country-level' ? (
    <AssignShippingtoLower />
  ) : uisettings.formName === 'add-new-country' ? (
    <AddNewCountry />
  ) : uisettings.formName === 'add-new-site' ? (
    <AddNewSite />
  ) : uisettings.formName === 'un-configured-site' ? (
    <UnconfiSite />
  ) : uisettings.formName === 'approve-acknowledge' ? (
    <Acknowledgment approve />
  ) : uisettings.formName === 'reject-acknowledge' ? (
    <Acknowledgment />
  ) :
   uisettings.formName === 'create-package' ? (
    <CreatePackge />
  ) :



(
    <Formik
      initialValues={{
        ...intialValuesFromProp,
        target: storageCheck || undefined,
      }}
      innerRef={formikRef}
      enableReinitialize
      validate={(values) => {
        const errors = {};
        data?.forEach((fields) => {
          if ((values?.[fields.name] === '' || values?.[fields.name] === null || values?.[fields.name] === undefined) && fields.required) {
            errors[fields.name] = 'Required';
          }
          if (fields.name === 'abbreviation' && values?.[fields.name]?.length > 6) {
            errors.abbreviation = 'Sponsor Abbreviation cannot be greater than 6 character';
          }
          if ((fields.name === 'change_reason' || fields.name === 'changeReason') && !values?.[fields.name]?.trim() && fields.required) {
            errors[fields.name] = 'Required';
          }
          if ((fields.name === 'change_reason' || fields.name === 'changeReason') && values?.[fields.name]?.trim()?.length > 200 && fields.required) {
            errors[fields.name] = 'max 200 character allowed';
          }

          // if(fields.name === "CloseToExpiryAlert" && values?.["CloseToExpiryAlert"]){
          //   errors["ExpirationDate"] = 'Required';
          //   errors["CloseToExpiryNumberOfDays"] = 'Required';
          // }else{
          //   errors["ExpirationDate"] = '';
          //   errors["CloseToExpiryNumberOfDays"] = 'Required';
          // }
        });
        if (formValidation) {
          formValidation(errors, values, uisettings);
        }
        return errors;
      }}
      onSubmit={(values) => {
        dispatch(showErrorReducer(''));
        if (uisettings.formName === 'addInventory') {
          var addInevntoryPayload = {};

          Object.keys(values).forEach((data) => {
            if (isNaN(data)) {
              var nonCustomId = storageLocation.itemCategories?.fields?.filter((field) => field.mergeFieldKey === data)[0]?.id;
              if (data === 'StorageLocation') {
                addInevntoryPayload[String(nonCustomId)] = String(values[data]?.id);
              } else {
                if (data !== 'locationId') {
                  addInevntoryPayload[String(nonCustomId)] = values[data] ? String(values[data]) : undefined;
                }
              }
            } else {
              addInevntoryPayload[String(data)] = values[data] ? String(values[data]?.id || values[data]) : undefined;
            }
          });

          cta(values.ItemName, addInevntoryPayload, stateRedux);
        } else {
          cta(values, items, stateRedux);
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
        dirty,
        isValid,
        /* and other goodies */
      }) => (
        <>
          {/* {formName === "Add Inventory" && (
            <div className="mb-[25px] pb-[10px] border-b ">
              <HemaValue text="Standard Fields" />
            </div>
          )} */}
          {uisettings.formName === 'confirm-kit-template' && (
            <DataTable
              columns={[
                {
                  name: 'Name',
                  selector: (row) => row?.name,
                  sortable: true,
                },
                {
                  name: 'Quantity',
                  selector: (row) => row?.selectedQuantity,
                  sortable: true,
                },
                {
                  name: 'Lot Number',
                  selector: (row) => row?.name,
                  sortable: true,
                },
                {
                  name: 'Expiration Date',
                  selector: (row) => row?.name,
                  sortable: true,
                },
              ]}
              data={[uisettings.editForm]}
            />
          )}

          <form onSubmit={handleSubmit} onChange={handleFormChange} className="max-w-[600px] overflow-auto m-auto pr-4 flex flex-col  h-[calc(100%-50px)] justify-between">
            <div className="flex flex-wrap w-full gap-[16px] ">
              {showStorage && (
                <div className="absolute top-[170px] z-30 h-screen w-full bg-white ">
                  <StorageLocationForm controller={formikRef} setShowStorage={setShowStorage} />
                </div>
              )}
              {data?.map((fields, counter) => {
                return (
                  <div key={counter} className={` ${fields?.fluid ? 'w-full' : 'w-[calc(50%-8px)]'}  ${fields?.type === 'table' && 'flex '}`}>
                    {/* {fields.type === 'textarea' && uisettings?.formName === 'delete-inventory' && (
                      <div className="border-dashed border-t-2 border-[#DEE2E6] mb-[21px] mt-[10px]"></div>
                    )}
                    {fields.name === 'closeToExpiryNumberOfDays' && uisettings?.formName === 'expire-inventory' && (
                      <div className="border-dashed border-t-2 border-[#DEE2E6] mb-[21px] mt-[10px]"></div>
                    )} */}
                    <HemaLabel
                      type={fields.type}
                      text={fields.label}
                      Icon={fields.Icon}
                      required={fields.required}
                      className={`${fields.type === 'table' ? 'table' : 'mb-[10px]'} ${fields.className}`}
                    />
                    {(fields.type === 'text' ||
                      fields.type === 'number' ||
                      fields.type === 'date' ||
                      fields.type === 'email' ||
                      fields.type === 'datetime-local' ||
                      fields.type === 'time' ||
                      fields.type === 'color') && (
                      <div className="flex gap-[15px] items-center">
                        <FormText
                          type={fields.type}
                          name={fields.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          setFieldValue={setFieldValue}
                          value={values?.[fields.name]}
                          placeholder={fields.placeholder}
                          min={fields.min}
                          step={fields.step}
                          disabled={fields.disabled}
                          showTotal={fields.showTotal}
                          onClick={fields.onClick}
                          crossIcon={values?.[fields.name] ? <CrossIcon /> : ''}
                          className="w-full"
                        />
                        {fields.showTotal && <HemaValue className="whitespace-nowrap" text={`/ ${uisettings.editForm?.quantity || uisettings.editForm?.availableToBuild || 0}`} />}
                      </div>
                    )}

                    {fields.type === 'checkbox' && (
                      <FormCheckbox
                        type={fields.type}
                        name={fields.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.[fields.name]}
                        disabled={fields.disabled}
                        checked={values?.[fields.name]}
                      />
                    )}

                    {fields.type === 'select' &&
                      (uisettings?.formName === 'create-site' ? (
                        <SingleSelect
                          setFieldValue={setFieldValue}
                          name={fields.name}
                          value={values?.[fields.name]}
                          placeholder={fields.placeholder}
                          options={fields.options}
                          disabled={fields.disabled}
                          dispatch={dispatch}
                        />
                      ) : (
                        <FormSelect
                          setFieldValue={setFieldValue}
                          name={fields.name}
                          onChange={handleFormChange}
                          value={values?.[fields.name]}
                          placeholder={fields.placeholder}
                          options={fields.options}
                          disabled={
                            uisettings?.formName === 'create-assembly' && common?.activeDropdownValue?.id === 2
                              ? fields?.name === 'testingLabId' || fields?.name === 'inboundShippingConditionId'
                                ? true
                                : false
                              : fields.disabled
                          }
                          dispatch={dispatch}
                          crossIcon={values?.[fields.name] ? <CrossIcon /> : ''}
                          dropIcon={<SelectDownArrow />}
                        />
                      ))}
                    {fields.type === 'multiSelect' && (
                      <FormMultiSelect options={fields.options} placeholder={fields.options} setFieldValue={setFieldValue} name={fields.name} value={values?.[fields.name]} />
                    )}
                    {fields.type === 'multiSelecttags' && <FormTags placeholder={fields.options} setFieldValue={setFieldValue} name={fields.name} value={values?.[fields.name]} />}
                    {fields.type === 'textarea' && (
                      <FormTextarea
                        name={fields.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.[fields.name]}
                        placeholder={fields.placeholder}
                        options={fields.options}
                      />
                    )}
                    {fields.type === 'download-bulk' && (
                      <>
                        <div className="border-dashed border-t-2 border-[#DEE2E6] mb-[20px] mt-[16px]"></div>
                        <div className="flex justify-between w-full">
                          <Button
                            cta={fields.onClick}
                            type="button"
                            Icon={<ImportIcon />}
                            className="text-[#605DAF] bg-white text-center flex justify-center  w-full"
                            text={fields.buttonText}
                          />
                        </div>
                      </>
                    )}

                    {fields.type === 'upload-image' && (
                      <ImageUpload
                        name={fields.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.[fields.name]}
                        placeholder={fields.placeholder}
                        options={fields.options}
                        setFieldValue={setFieldValue}
                        setMediaInputOne={setMediaInputOne}
                        mediaInputOne={mediaInputOne}
                        accept={fields.accept}
                        storageUrl={fields.storageUrl}
                      />
                    )}

                    {fields.type === 'switch' && (
                      <FormSwitch
                        name={fields.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.[fields.name]}
                        placeholder={fields.placeholder}
                        options={fields.options}
                        setFieldValue={setFieldValue}
                        initialValue={fields.initialValue}
                        values={values}
                      />
                    )}
                    {fields.type === 'heading-only' && (
                      <div className=""><Heading heading={fields?.initialValue} border  /></div>
                    )}
                    {fields.type === 'Storage-Locations' && (
                      <>
                        <div className="flex items-center justify-between">
                          <HemaValue text={values?.[fields.name]?.name} className="py-[10px]" />
                          {values?.[fields.name]?.name && (
                            <span onClick={() => setFieldValue(fields.name, '')} className={`cursor-pointer`}>
                              <CrossIcon />
                            </span>
                          )}
                        </div>

                        <Button
                          type="button"
                          cta={() => {
                            setShowStorage(true);
                          }}
                          text={fields.placeholder}
                          className="w-full text-center border-2 border-[#605DAF] flex justify-center text-[#605DAF] "
                        />
                      </>
                    )}

                    {fields.type === 'formTable' && (
                      <CheckboxTable
                        name={fields.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.[fields.name]}
                        // placeholder={fields.placeholder}
                        // options={fields.options}
                        setFieldValue={setFieldValue}
                        // setMediaInputOne={setMediaInputOne}
                        // mediaInputOne={mediaInputOne}
                        // accept={fields.accept}
                        allSites={values?.[fields.name]}
                      />
                    )}
                    {fields.type === 'ScreeningKitTable' && (
                      <ScreeningKitTable
                        name={fields.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.[fields.name]}
                        // placeholder={fields.placeholder}
                        // options={fields.options}
                        setFieldValue={setFieldValue}
                        // setMediaInputOne={setMediaInputOne}
                        // mediaInputOne={mediaInputOne}
                        // accept={fields.accept}
                        allItems={values?.[fields.name]}
                      />
                    )}
                    {fields.type === 'kitpreparationTable' && (
                      <KitpreparationTable
                        name={fields.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.[fields.name]}
                        // placeholder={fields.placeholder}
                        // options={fields.options}
                        setFieldValue={setFieldValue}
                        allSites={values?.[fields.name]}
                      />
                    )}
                    {fields.type === 'table' && <HemaValue className={`${fields.type === 'table' ? 'table' : 'mb-[10px]'}`} text={fields.initialValue || ''} />}

                    {fields.type === 'explorer' && (
                      <LocationExplorer
                        disabled={fields.disabled}
                        onClick={() => handleFormChange(fields)}
                        width={`w-${fields.width}`}
                        height={`h-${fields.height}`}
                        text={fields.text || fields.placeholder}
                        setFieldValue={() => {
                          setstoragecheck(fields.data);
                        }}
                        name={fields.name}
                        initialValue={fields.initialValue}
                      />
                    )}
                    {errors[fields.name] && touched[fields.name] && <div className="error text-[red] text-[12px] pt-[2px]"> {errors[fields.name]}</div>}
                    {fields.name === 'isActive' && uisettings?.formName === 'create-site' && (
                      <>
                        <div className="border-dashed border-t-2 border-[#DEE2E6] mb-[21px] w-full mt-[10px]"></div>
                        <HemaLabel text="Principal Investigator" textSize="text-[14px]" className="font-bold" />
                      </>
                    )}
                  </div>
                );
              })}
              {uisettings.formName === 'create-assembly' || formName === 'request-details' ? (
                <div class="w-full">
                  <div className="border border-dotted my-[11px] " />
                  <div className="flex items-align py-[11px] border w-full rounded-t pl-[15px] pr-[35px]  justify-between ">
                    <div className="pl-[30px]">
                      <HemaValue text="Item Name" />
                    </div>
                    <div>
                      <HemaValue text="Quantity Per Kit" />
                    </div>
                  </div>
                  {items.map((item, index) => (
                    <DataTableRowItems index={index} item={item} setItems={setItems} allItems={allItems} items={items} hideSort />
                  ))}
                  <NewRow
                    dropDownItemList={dropDownItemList}
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
                </div>
              ) : null}
              <Alert type="error" />
            </div>

            <div className="flex gap-[8px] justify-end my-[20px]">
              <Button
                cta={() => {
                  if (onFormClose) {
                    onFormClose();
                  }
                  dispatch(setForm({ state: false, type: '' }));
                }}
                type="button"
                text={cancelBtnText || 'Cancel'}
                bg="bg-white"
                border="border-primary1"
                color="text-primary1"
                Icon={<Cancel />}
              />
              <Button type="submit" text={okBtnText || 'Save'} bg="bg-primary1" color="text-white" Icon={okBtnIcon || <Confirm />} />
            </div>
          </form>
        </>
      )}
    </Formik>
  );
};

export default FormikForm;
