import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Transition, CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { approveAction, rejectAction, getAllOrderAction } from "../../Action/order";

import { Back, Add, Cancel, Confirm, CreateItem, LockFile, CheckApprove, CrossIcon, DeletePurple, ChangeReason, FormReject, Reject } from "../../HemeIconLibrary";
import { Formik } from "formik";
import { FormTitle, Button, Alert, HemaLabel, FormTextarea } from "../../utils";
//import { showSuccessReducer } from '../../commonStore/reducers/uiSettings';

export const FormContainer = (props) => {
  const dispatch = useDispatch();
  const { setgreenLightAction, approve, setShowDetial } = props;
  const { uisettings, orders } = useSelector((state) => state);
  const nodeRef = useRef(null);
  const [formTransition, setformTransition] = useState(false);
  useEffect(() => {
    if (!formTransition) {
      setformTransition(true);
    }
  }, [props]);
  return (
    <div className="h-full z-10 bg-[#000000c4] border-[#DEE2E6] fixed top-0 left-0 w-full flex justify-end  ">
      <div className={`bg-white screen-height transition-all ${formTransition ? "w-[600px]" : "w-0"}`}>
        <div className=" px-4 py-2 h-[70px] flex items-center bg-primary1  border-b">
          <div
            className="cursor-pointer"
            onClick={() => {
              setgreenLightAction(false);
            }}
          >
            <Back />
          </div>
        </div>
        <div className="h-[calc(100%-75px)] px-4 py-8 overflow-auto ">
          <div className="pb-[25px]">
            <FormTitle Icon={approve ? <CheckApprove /> : <Reject />} text={approve ? "Approve" : "Reject"} />
          </div>
          <Formik
            initialValues={{
              note: "",
            }}
            enableReinitialize
            validate={(values) => {
              const errors = {};
              if (!values.note) {
                errors.note = "Required";
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              if (approve) {
                const result = await approveAction(orders?.activeOrder.id, values);
                if (result.status === 200) {
                  await getAllOrderAction();
                  setSubmitting(false);

                  //  dispatch(showSuccessReducer('Green Light Approved'))
                  setgreenLightAction(false);
                  setShowDetial(false);
                }
              } else {
                const result = await rejectAction(orders?.activeOrder.id, values);
                if (result.status === 200) {
                  await getAllOrderAction();
                  setSubmitting(false);
                  // dispatch(showSuccessReducer('Green Light rejected'))
                  setgreenLightAction(false);
                  setShowDetial(false);
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
                  <div className={"w-full"}>
                    <div className="mb-[30px]">
                      <HemaLabel text={"Comments"} Icon={<ChangeReason purple />} required={true} className={`mb-[10px]`} />
                      <FormTextarea name={"note"} placeholder="Enter detail" onChange={handleChange} onBlur={handleBlur} value={values.note} />
                    </div>

                    {errors.note && touched.note && <div className="error text-[red] text-[12px] pt-[2px]">{errors.note}</div>}
                  </div>
                </div>

                <Alert type="error" />
                <div className="flex gap-[8px] justify-end my-[20px]">
                  <Button
                    cta={() => {
                      setgreenLightAction(false);
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
                    <Button type="submit" text="Submit" bg="bg-primary1" color="text-white" Icon={<Confirm />} />
                  )}
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
