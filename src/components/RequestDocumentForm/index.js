import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import { approveAction, rejectAction, createOrderAction } from "../../Actions/order";
import { HemaLabel, FormSelect, Button, FormTextarea, Alert, SingleSelect, FormTags, FormText, ImageUpload } from "../../utils";
import { StudyAlias, Cancel, Confirm, ChangeReason, Upload, SelectUpload } from "../../HemeIconLibrary";
import HemaHeadingWithSubText from "../../utils/HemaHeadingWithSubText";
import { setForm, showSuccessReducer } from "../../Store/reducers/uiSettings";
import DocumentEditorDialog from "../documentEditor";

const RequestDocumentForm = (props) => {
  const { common, assembly, orders, uisettings } = useSelector((state) => state);
  const { formName, approve } = props;
  const dispatch = useDispatch();
  const [to, setTo] = useState(orders.acknowledgedetails?.to || []);
  const [cc, setCc] = useState([]);
  const [bcc, setBcc] = useState([]);

  return (
    <Formik
      initialValues={{
        subject: "",
        body: "",
        permanentUpdate: true,
        to: to,
        cc: cc,
        bcc: bcc,
        rejectReason: "",
      }}
      enableReinitialize
      validate={(values) => {
        const errors = {};
        if (!values.subject) {
          errors.subject = "Required";
        }

        if (!values.body) {
          errors.body = "Required";
        }
        if (!values.rejectReason && !approve) {
          errors.body = "Required";
        }

        if (values.to?.length === 0) {
          errors.to = "add atleast one user required";
        }

        return errors;
      }}
      onSubmit={async (values) => {
        // console.log(approve);
        // if (approve) {
        //   const approve = await approveAction(uisettings?.editForm?.id || orders.allOrders[0]?.id, values);
        //   if (approve.status === 200) {
        //     dispatch(setForm({ state: false, type: '' }));
        //     dispatch(showSuccessReducer(`Request Acknowledgement successfully sent.`));
        //   }
        // } else {
        //   const approve = await rejectAction(uisettings?.editForm?.id || orders.allOrders[0]?.id, values);
        //   if (approve.status === 200) {
        //     dispatch(setForm({ state: false, type: '' }));
        //     dispatch(showSuccessReducer(`Request Acknowledgement  rejected.`));
        //   }
        // }
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
        <form onSubmit={handleSubmit} className="max-w-[1280px] gap-7 m-auto flex  justify-between h-[calc(100%-100px)]">
          <div className="flex flex-col overflow-auto ">
            <HemaHeadingWithSubText HeadingFontSize="30px" HeadingLineHeight="38px" heading={formName} />
            <HemaHeadingWithSubText sub="Kit Request 2278 / Screening Kit" />

            <div>
              <DocumentEditorDialog />
            </div>
          </div>
          <div>
            <div className={"w-full"}>
              <div className="mb-[30px]">
                <HemaLabel text={"Subject"} Icon={<StudyAlias color="blue" />} required={true} className={`mb-[10px]`} />
                <FormText placeholder={"Enter Subject"} name="subject" onChange={handleChange} onBlur={handleBlur} value={values.subject}></FormText>

                {errors.subject && touched.subject && <div className="error text-[red] text-[12px] pt-[2px]">{errors.subject}</div>}
              </div>
              <div className="mb-[30px]">
                <HemaLabel text={"Email Body"} Icon={<StudyAlias color="blue" />} required={true} className={`mb-[10px]`} />
                <FormTextarea placeholder={"Email Body"} name="body" onChange={handleChange} onBlur={handleBlur} value={values.body}></FormTextarea>

                {errors.body && touched.body && <div className="error text-[red] text-[12px] pt-[2px]">{errors.body}</div>}
              </div>
            </div>

            <Alert type="error" />
            <div className="flex gap-[8px] justify-end my-[20px]">
              <Button
                cta={() => {
                  dispatch(setForm({ state: false, type: "" }));
                }}
                type="button"
                text="Cancel"
                bg="bg-white"
                border="border-primary1"
                color="text-primary1"
                Icon={<Cancel />}
              />
              <Button
                cta={() => {
                  dispatch(setForm({ state: false, type: "" }));
                }}
                type="button"
                text="Upload"
                bg="bg-white"
                border="border-primary1"
                color="text-primary1"
                Icon={<SelectUpload />}
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

export default RequestDocumentForm;
