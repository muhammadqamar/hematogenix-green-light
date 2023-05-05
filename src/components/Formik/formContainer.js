import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Transition, CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import { setForm } from '../../Store/reducers/uiSettings';
import { Back, Add } from '../../HemeIconLibrary';
import HemaForm from '../../components/Formik';
import { FormTitle, Button } from '../../utils';
const duration = 300;

// const defaultStyle = {
//   transition: `opacity ${duration}ms ease-in-out`,
//   minWidth: '600px',
// };

// const transitionStyles = {
//   entering: { minWidth: '600px' },
//   entered: { minWidth: '600px' },
//   exiting: { minWidth: '0px' },
//   exited: { minWidth: '0px' },
// };
export const FormContainer = (props) => {
  const dispatch = useDispatch();
  const { cta, formType, formName, Icon, formValidation, in: inProp } = props;
  const { uisettings } = useSelector((state) => state);
  const nodeRef = useRef(null);
  const [formTransition, setformTransition] = useState(false);
  useEffect(() => {
    if (!formTransition) {
      setformTransition(true);
    }
  }, [props]);
  return (
    <div className="h-full z-10 bg-[#000000c4] border-[#DEE2E6] fixed top-0 left-0 w-full flex justify-end  ">
      <div className={`bg-white screen-height transition-all ${formTransition ? 'w-[600px]' : 'w-0'}`}>
        <div className=" px-4 py-2 h-[70px] flex items-center bg-primary1  border-b">
          <div
            className="cursor-pointer"
            onClick={() => {
              if (props.onFormClose) {
                props.onFormClose();
              }
              dispatch(setForm(false));
            }}
          >
            <Back />
          </div>
        </div>
        <div className="h-[calc(100%-75px)] px-4 py-8 overflow-auto ">
                {uisettings?.formName === 'addInventory1stStep' ?
            <div className="flex justify-between pb-[25px]">
                    <FormTitle Icon={Icon} text={formName} />
                    <Button
                      text="Create New Item"
                      Icon={<Add color="white" />}
                      color="text-white"
                      bg="bg-primary1"
                      cta={() => {
                        props.callCreateNewItem();
                      }}
                    />
                  </div> : <div className="pb-[25px]">
              <FormTitle Icon={Icon} text={formName} />
            </div>}

          <HemaForm data={formType} cta={cta} formValidation={formValidation} formName={formName} {...props} />
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
