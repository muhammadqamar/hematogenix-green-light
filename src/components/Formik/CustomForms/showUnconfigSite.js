import React, { useState } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

import { HemaLabel, Button, Alert, FormMultiSelect, HemaValue } from '../../../utils';
import { WhiteCross } from '../../../HemeIconLibrary';
import Heading from '../../../pages/logistOrchestra/logisticComponents/heading';
import KitRules from '../../../pages/logistOrchestra/logisticComponents/kitRules';
import { setForm, showSuccessReducer } from '../../../Store/reducers/uiSettings';
import { addBulkKitTemplateAction, addKitTemplateAssemblyAction } from '../../../Actions/logistic';

const UnconfiSite = ({ assemblyOnly }) => {
  const [ViewDetail, setViewDetail] = useState(false);
  const { logistic } = useSelector((state) => state);
  const dispatch = useDispatch();

  // table style

  const customStyles = {
    rows: {
      style: {
        minHeight: '40px',
      },
    },
    headCells: {
      style: {
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '18px',
        color: '#000000',
      },
    },
    cells: {
      style: {
        fontFamily: 'Inter',
        fontWeight: 500,
        fontSize: '12px',
        lineHeight: '18px',
        color: '#595959',
      },
    },
  };

  return (
    <Formik
      initialValues={{}}
      enableReinitialize
      validate={(values) => {
        const errors = {};

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {}}
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
        <form onSubmit={handleSubmit} className="max-w-[600px]  overflow-auto m-auto flex flex-col h-[calc(100%-100px)]">
          <div className="mt-[22px]">
            <Heading heading="Site Information" />
          </div>

          <div className="w-full h-auto rounded-2 border border-solid border-[#DEE2E6] overflow-hidden mb-[26px]">
            <DataTable
              customStyles={customStyles}
              data={logistic?.selectedProtocolDetail?.unconfiguredSites || []}
              columns={[
                {
                  name: 'Site Name',
                  selector: (row) => {
                    return (
                      <div className="flex-shrink-0 flex items-center gap-[10px] cursor-pointer">
                        <HemaLabel text={row?.name} />
                      </div>
                    );
                  },
                },
                {
                  name: 'Site Code',
                  cell: (row) => {
                    return (
                      <div className="block items-center gap-[10px] w-full cursor-pointer">
                        <HemaLabel text={row?.siteCode} />
                      </div>
                    );
                  },
                },
                {
                  name: 'Country',
                  cell: (row) => {
                    return (
                      <div className="block items-center gap-[10px] w-full cursor-pointer">
                        <HemaLabel text={row?.country?.name} />
                      </div>
                    );
                  },
                },
              ]}
            />
          </div>

          <Alert type="error" />
          <div className="flex gap-[8px] justify-end my-[20px]">
            <Button
              type="submit"
              text={'Close'}
              bg="bg-primary1"
              color="text-white"
              Icon={<WhiteCross />}
              cta={() => {
                dispatch(setForm({ state: false, type: '' }));
              }}
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default UnconfiSite;
