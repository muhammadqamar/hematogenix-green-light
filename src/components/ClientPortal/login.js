import React, { useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HemaHeadingWithSubText, HemaLabel, Button, HemaValue, Alert } from "../../utils";
import { LoginEmail, EyeIcon, CrossIcon, PassLock, HideEye } from "../../HemeIconLibrary";
import { showErrorReducer } from "../../Store/reducers/uiSettings";
import { LoginAction } from "../../Actions/auth";
import LoginInput from "../../utils/FormElements/loginInput";
const LoginForm = ({ setFirstAttemptToSelectDropdown }) => {
  const [showPassword, setshowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="max-w-[450px]">
      <HemaHeadingWithSubText heading="Log In" sub="Lorem ipsum dolor sit amet, consectetur adipiscing" subTextColor="#595959" />

      <Formik
        initialValues={{ email: "", password: "" }}
        enableReinitialize
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Please enter correct email format";
          }

          if (!values.password) {
            errors.password = "Required";
          }
          dispatch(showErrorReducer(""));
          return errors;
        }}
        onSubmit={async (values) => {
          setFirstAttemptToSelectDropdown(true);
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
                <HemaLabel text="Email" Icon={<LoginEmail />} textSize="text-[16px]" />
                <LoginInput
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  crossIcon={values.email ? <CrossIcon /> : ""}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />
                <p className="error m-0  text-[#F54C3B]">{errors.email && touched.email && errors.email}</p>
              </div>

              <div className="flex flex-col mb-[15px]">
                <HemaLabel text="Password" Icon={<PassLock />} textSize="text-[16px]" />
                <LoginInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  inputIcon={!showPassword ? <EyeIcon /> : <HideEye />}
                  crossIcon={values.password ? <CrossIcon /> : ""}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  setshowPassword={setshowPassword}
                  showPassword={showPassword}
                  setFieldValue={setFieldValue}
                />
                <p className="error m-0  text-[#F54C3B] ">{errors.password && touched.password && errors.password}</p>
              </div>

              <div className="flex justify-between items-center mb-[40px]">
                <div className="flex gap-[8px]">
                  <input type="checkbox" id="rememberMe" name="remember-me" value="remember me" className="w-[20px]" />
                  {/* <label for="remember-me"> Remember me</label> */}
                  {/* <HemaLabel text=" Remember me" textSize="text-[14px]" /> */}
                </div>
              </div>
              <Button text="Log In" type="submit" bg="bg-primary1" border="border-primary1" color="text-white" className="w-full h-[48px] justify-center font-semibold" />
            </form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
