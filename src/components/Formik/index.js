import React, { useEffect, useState, useRef } from 'react';
import { Formik } from 'formik';
import {
  HemaLabel,
  FormText,
  FormTextarea,
  Button,
  HemaValue,
} from '../../utils';
import DataTable from 'react-data-table-component';
import { Confirm, Cancel, CrossIcon } from '../../HemeIconLibrary';
import { useDispatch } from 'react-redux';
import { Alert } from '../../utils';
import { setForm, showErrorReducer } from '../../Store/reducers/uiSettings';
import { useSelector } from 'react-redux';

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
  const { uisettings, allItems, storageLocation, common, settings } =
    useSelector((state) => state);
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

    setIntialValuesFromProp(
      initialValues?.reduce((obj, item) => Object.assign(obj, item), {})
    );
  }, [JSON.stringify(data)]);

  useEffect(() => {
    if (allItemsInTemplate) {
      setItems(allItemsInTemplate);
    }
  }, [allItemsInTemplate]);

  return (
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
          if (
            (values?.[fields.name] === '' ||
              values?.[fields.name] === null ||
              values?.[fields.name] === undefined) &&
            fields.required
          ) {
            errors[fields.name] = 'Required';
          }
          if (
            fields.name === 'abbreviation' &&
            values?.[fields.name]?.length > 6
          ) {
            errors.abbreviation =
              'Sponsor Abbreviation cannot be greater than 6 character';
          }
          if (
            (fields.name === 'change_reason' ||
              fields.name === 'changeReason') &&
            !values?.[fields.name]?.trim() &&
            fields.required
          ) {
            errors[fields.name] = 'Required';
          }
          if (
            (fields.name === 'change_reason' ||
              fields.name === 'changeReason') &&
            values?.[fields.name]?.trim()?.length > 200 &&
            fields.required
          ) {
            errors[fields.name] = 'max 200 character allowed';
          }
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
              var nonCustomId = storageLocation.itemCategories?.fields?.filter(
                (field) => field.mergeFieldKey === data
              )[0]?.id;
              if (data === 'StorageLocation') {
                addInevntoryPayload[String(nonCustomId)] = String(
                  values[data]?.id
                );
              } else {
                if (data !== 'locationId') {
                  addInevntoryPayload[String(nonCustomId)] = values[data]
                    ? String(values[data])
                    : undefined;
                }
              }
            } else {
              addInevntoryPayload[String(data)] = values[data]
                ? String(values[data]?.id || values[data])
                : undefined;
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

          <form
            onSubmit={handleSubmit}
            // onChange={handleFormChange}
            className="max-w-[600px] overflow-auto m-auto pr-4 flex flex-col  h-[calc(100%-50px)] justify-between"
          >
            <div className="flex flex-wrap w-full gap-[16px] ">
              {data?.map((fields, counter) => {
                return (
                  <div
                    key={counter}
                    className={` ${
                      fields?.fluid ? 'w-full' : 'w-[calc(50%-8px)]'
                    }  ${fields?.type === 'table' && 'flex '}`}
                  >
                    <HemaLabel
                      type={fields.type}
                      text={fields.label}
                      Icon={fields.Icon}
                      required={fields.required}
                      className={`${
                        fields.type === 'table' ? 'table' : 'mb-[10px]'
                      } ${fields.className}`}
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
                        {fields.showTotal && (
                          <HemaValue
                            className="whitespace-nowrap"
                            text={`/ ${
                              uisettings.editForm?.quantity ||
                              uisettings.editForm?.availableToBuild ||
                              0
                            }`}
                          />
                        )}
                      </div>
                    )}

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
                  </div>
                );
              })}

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
              <Button
                type="submit"
                text={okBtnText || 'Save'}
                bg="bg-primary1"
                color="text-white"
                Icon={okBtnIcon || <Confirm />}
              />
            </div>
          </form>
        </>
      )}
    </Formik>
  );
};

export default FormikForm;
