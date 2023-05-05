import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useMsal } from "@azure/msal-react";
import queryString from "query-string";
import { HemaHeadingWithSubText, HemaLabel, Button, HemaValue, Alert } from "../../utils";
import { LoginEmail, EyeIcon, CrossIcon, PassLock, HideEye, Microsoft } from "../../HemeIconLibrary";
import { showErrorReducer } from "../../Store/reducers/uiSettings";
import { LoginAction, checkDomainAction, verifyAzureTokenAction } from "../../Actions/auth";
import LoginInput from "../../utils/FormElements/loginInput";

const LoginForm = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [domain, setDomain] = useState(false);
  const [tenantInformation, setTenantInformation] = useState(false);
  const [tenentSuccess, setTenentSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { instance } = useMsal();
  useEffect(() => {
    (async () => {
      const domainName = queryString.parse(window.location.search);
      if (domainName?.domain) {
        const result = await checkDomainAction(domainName?.domain);
        setDomain(true);
        if (result.status === 200) {
          setTenantInformation(result.data);
        }
      } else {
        setDomain(true);
      }
    })();
  }, [window.location.search]);

  const handleLogin = (loginType) => {
    if (loginType === "popup") {
      setTenentSuccess(true);
      instance
        .loginPopup({
          scopes: ["User.Read"],
        })
        .then(async (result) => {
          const verify = await verifyAzureTokenAction(result.accessToken);
          setTenentSuccess(false);
          if (verify?.status === 200) {
            localStorage.setItem("hema-token", verify.data.token.token);

            navigate("/");
          }
        })
        .catch((e) => {
          console.log(e);
          setTenentSuccess(false);
        });
    }
  };

  return (
    <div className="max-w-[450px]">
      <HemaHeadingWithSubText heading="Log In" sub="Lorem ipsum dolor sit amet, consectetur adipiscing" subTextColor="#595959" />
      <div className="mt-[24px]">
        <Alert type="error" />
      </div>
      {domain ? (
        tenantInformation ? (
          <>
            {tenentSuccess ? (
              <Button
                type="button"
                bg="bg-primary1"
                className="w-full mt-[50px] justify-center"
                text={
                  <>
                    <Spinner animation="grow" size="sm" variant="light" />
                    <Spinner animation="grow" size="sm" variant="light" />
                    <Spinner animation="grow" size="sm" variant="light" />
                  </>
                }
              />
            ) : (
              <Button
                type="button"
                bg="bg-primary1"
                className="w-full mt-[50px] justify-center text-white"
                text={"Corporate Login"}
                cta={() => {
                  handleLogin("popup");
                }}
                Icon={<Microsoft />}
              />
            )}
          </>
        ) : (
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
              const result = await LoginAction(values);

              if (result?.status === 200) {
                localStorage.setItem("hema-token", result.data.token.token);
                localStorage.setItem("hema-token-refresh", result.data.token.refreshToken);
                navigate("/inventory-management");
              } else {
                dispatch(showErrorReducer(result?.message));
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
              <>
                <form onSubmit={handleSubmit}>
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
                      {/* <input type="checkbox" id="rememberMe" name="remember-me" value="remember me" className="w-[20px]" />
                      */}
                      {/* <label for="remember-me"> Remember me</label> */}
                      {/* <HemaLabel text=" Remember me" textSize="text-[14px]" /> */}
                    </div>
                  </div>
                  {isSubmitting ? (
                    <Button
                      type="button"
                      bg="bg-primary1"
                      className="w-full mt-[50px] justify-center"
                      text={
                        <>
                          <Spinner animation="grow" size="sm" variant="light" />
                          <Spinner animation="grow" size="sm" variant="light" />
                          <Spinner animation="grow" size="sm" variant="light" />
                        </>
                      }
                    />
                  ) : (
                    <Button text="Log In" type="submit" bg="bg-primary1" border="border-primary1" color="text-white" className="w-full h-[48px] justify-center font-semibold" />
                  )}
                </form>
              </>
            )}
          </Formik>
        )
      ) : (
        <Button
          type="button"
          bg="bg-primary1"
          className="w-full mt-[50px] justify-center"
          text={
            <>
              <Spinner animation="grow" size="sm" variant="light" />
              <Spinner animation="grow" size="sm" variant="light" />
              <Spinner animation="grow" size="sm" variant="light" />
            </>
          }
        />
      )}
    </div>
  );
};

export default LoginForm;
