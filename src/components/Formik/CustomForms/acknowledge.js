import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { approveAction, rejectAction, createOrderAction } from '../../../Actions/order';
import { HemaLabel, FormSelect, Button, FormTextarea, Alert, SingleSelect, FormTags, FormText } from '../../../utils';
import { StudyAlias, Cancel, FirstName, Confirm, NameKit, Email, LabelName, Format } from '../../../HemeIconLibrary';

import { setForm, showSuccessReducer } from '../../../Store/reducers/uiSettings';

const Acknowledgment = ({ approve }) => {
  const { common, assembly, orders, uisettings } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [to, setTo] = useState(orders.acknowledgedetails?.to || []);
  const [cc, setCc] = useState([]);
  const [bcc, setBcc] = useState([]);

  return (
    <Formik
      initialValues={{
        subject: orders.acknowledgedetails?.subject || '',
        body: orders.acknowledgedetails?.body || '',
        permanentUpdate: true,
        to: to,
        cc: cc,
        bcc: bcc,
        rejectReason: '',
      }}
      enableReinitialize
      validate={(values) => {
        const errors = {};
        if (!values.subject) {
          errors.subject = 'Required';
        }

        if (!values.body) {
          errors.body = 'Required';
        }
        if (!values.rejectReason && !approve) {
          errors.body = 'Required';
        }

        if (values.to?.length === 0) {
          errors.to = 'add atleast one user required';
        }

        return errors;
      }}
      onSubmit={async (values) => {
        console.log(approve);
        if (approve) {
          const approve = await approveAction(orders?.activeOrder?.id || orders.allOrders[0]?.id, values);

          if (approve.status === 200) {
            dispatch(setForm({ state: false, type: '' }));
            dispatch(showSuccessReducer(`Request Acknowledgement successfully sent.`));
          }
        } else {
          const approve = await rejectAction(orders?.activeOrder?.id || orders.allOrders[0]?.id, values);

          if (approve.status === 200) {
            dispatch(setForm({ state: false, type: '' }));
            dispatch(showSuccessReducer(`Request Acknowledgement  rejected.`));
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
          <div>
            <div className={'w-full'}>
              <div className="mb-[30px]">
                <HemaLabel text={'To'} Icon={<FirstName />} required={true} className={`mb-[10px]`} />
                <FormTags
                  placeholder={'Type email'}
                  name="to"
                  setFieldValue={(name, data) => {
                    setTo(
                      data.map((dual) => {
                        return { email: dual };
                      }),
                    );
                  }}
                  value={to.map((data) => data.email)}
                ></FormTags>
              </div>

              {errors.to && touched.to && <div className="error text-[red] text-[12px] pt-[2px]">{errors.to}</div>}
            </div>

            <div className="w-full flex items-start gap-[16px]">
              <div className="mb-[30px]">
                <HemaLabel text={'Cc'} Icon={<NameKit />} className={`mb-[10px]`} />
                <FormTags
                  placeholder={'Type email'}
                  name="cc"
                  setFieldValue={(name, data) => {
                    setCc(
                      data.map((dual) => {
                        return { email: dual };
                      }),
                    );
                  }}
                  value={cc.map((data) => data.email)}
                ></FormTags>
              </div>
              <div className="mb-[30px]">
                <HemaLabel text={'Bcc'} Icon={<Format />} className={`mb-[10px]`} />
                <FormTags
                  placeholder={'Type email'}
                  name="bcc"
                  setFieldValue={(name, data) => {
                    setBcc(
                      data.map((dual) => {
                        return { email: dual };
                      }),
                    );
                  }}
                  value={bcc?.map((data) => data.email)}
                ></FormTags>
              </div>
            </div>
            <div className={'w-full'}>
              <div className="mb-[30px]">
                <HemaLabel text={'Subject'} Icon={<LabelName />} required={true} className={`mb-[10px]`} />
                <FormText placeholder={'Enter Subject'} name="subject" onChange={handleChange} onBlur={handleBlur} value={values.subject}></FormText>

                {errors.subject && touched.subject && <div className="error text-[red] text-[12px] pt-[2px]">{errors.subject}</div>}
              </div>
              <div className="mb-[30px]">
                <HemaLabel text={'Email Body'} Icon={<Email />} required={true} className={`mb-[10px]`} />
                <FormTextarea placeholder={'Email Body'} name="body" onChange={handleChange} onBlur={handleBlur} value={values.body}></FormTextarea>

                {errors.body && touched.body && <div className="error text-[red] text-[12px] pt-[2px]">{errors.body}</div>}
              </div>
            </div>
          </div>
          {!approve && (
            <div className={'w-full'}>
              <div className="mb-[30px]">
                <HemaLabel text={'Reject Reason'} Icon={<StudyAlias color="blue" />} required={true} className={`mb-[10px]`} />
                <FormTextarea placeholder={'Enter reason'} name="rejectReason" onChange={handleChange} onBlur={handleBlur} value={values.rejectReason}></FormTextarea>

                {errors.rejectReason && touched.rejectReason && <div className="error text-[red] text-[12px] pt-[2px]">{errors.rejectReason}</div>}
              </div>
            </div>
          )}
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
        </form>
      )}
    </Formik>
  );
};

export default Acknowledgment;
