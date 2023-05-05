import React, { useState } from 'react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  HemaHeadingWithSubText,
  HemaLabel,
  Button,
  HemaValue,
  Alert,
} from '../../utils';
import {
  LoginEmail,
  EyeIcon,
  CrossIcon,
  PassLock,
  HideEye,
} from '../../HemeIconLibrary';
import { showErrorReducer } from '../../Store/reducers/uiSettings';
import { LoginAction } from '../../Actions/auth';
import Select from '../../utils/FormElements/select';
const LoginForm = () => {
  const [showPassword, setshowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="max-w-[450px]">
      <HemaHeadingWithSubText
        heading="Select the Site"
        sub="Please select the site you would like to submit an order for"
        subTextColor="#595959"
      />

      <Formik
        initialValues={{ sponser: '', study: '', site: '' }}
        enableReinitialize
        validate={(values) => {
          const errors = {};
          if (!values.sponser) {
            errors.sponser = 'Required';
          }
          if (!values.study) {
            errors.study = 'Required';
          }
          if (!values.site) {
            errors.site = 'Required';
          }

          return errors;
        }}
        onSubmit={async (values) => {
          //   console.log("val", values);
          //   const result = await LoginAction(values);
          //   console.log("res", result);
          //   if (result?.status === 200) {
          //     localStorage.setItem("hema-token", result.data.token.token);
          //     navigate("/inventory");
          //   } else {
          //     dispatch(showErrorReducer(result?.message));
          //   }
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
          <>
            <form onSubmit={handleSubmit}>
              <div className="mt-[24px]">
                <Alert type="error" />
              </div>

              <div className="flex flex-col  mb-[24px] mt-[24px]">
                <HemaLabel
                  text="Sponser"
                  Icon={<LoginEmail />}
                  textSize="text-[16px]"
                  required={true}
                />
                <Select
                  options={[]}
                  placeholder=""
                  setFieldValue={setFieldValue}
                  name="sponser"

                />

                {errors.sponser && touched.sponser && (
                  <p className="error m-0  text-[#F54C3B]"> {errors.sponser}</p>
                )}
              </div>


              <div className="flex flex-col  mb-[24px] mt-[24px]">
                <HemaLabel
                  text="Study"
                  Icon={<LoginEmail />}
                  textSize="text-[16px]"
                  required={true}
                />
                <Select
                  options={[]}
                  placeholder=""
                  setFieldValue={setFieldValue}
                  name="study"
                  required={true}
                />

                {errors.study && touched.study && (
                  <p className="error m-0  text-[#F54C3B]"> {errors.study}</p>
                )}
              </div>
              <div className="flex flex-col  mb-[24px] mt-[24px]">
                <HemaLabel
                  text="Site"
                  Icon={<LoginEmail />}
                  textSize="text-[16px]"
                  required={true}
                />
                <Select
                  options={[]}
                  placeholder=""
                  setFieldValue={setFieldValue}
                  name="site"
                  required={true}
                />

                {errors.site && touched.site && (
                  <p className="error m-0  text-[#F54C3B]"> {errors.site}</p>
                )}
              </div>


              <Button
                text="Continue"
                type="submit"
                bg="bg-primary1"
                border="border-primary1"
                color="text-white"
                className="w-full h-[48px] justify-center font-semibold"
              />
            </form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
