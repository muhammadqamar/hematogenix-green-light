import React, { useEffect, useRef } from 'react';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import { FormSelect, Button } from '../../../utils/';
import { buildKitItemDetailAction } from '../../../Actions/kitBuilder';
import Skeleton from 'react-loading-skeleton';
import { Cancel, Add, Print, CreateItem } from '../../../HemeIconLibrary';
import { useDispatch } from 'react-redux';
import { setForm } from '../../../Store/reducers/uiSettings';
import { updateBuildKit } from '../../../Store/reducers/kitBuilder';
import { ConfirmKitBuilder } from '../AllForms/confirmKitBuilder';
import { Spinner } from 'react-bootstrap';

import { useReactToPrint } from 'react-to-print';

const EditKitBuilder = ({
  setUpdatedData,
  setformName,
  setFormIcon,
  cta,
  setokBtnText,
}) => {
  const { uisettings, builder } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    buildKitItemDetailAction(
      uisettings.editForm?.id,
      uisettings.editForm?.selectedQuantity
    );
  }, [uisettings.editForm]);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="">
      {builder.buildKit ? (
        <div ref={componentRef}>
          <DataTable
            data={builder.buildKit?.items}
            columns={[
              {
                name: 'Name',
                selector: (row) => row.name,
              },
              {
                name: 'Qty Per Kit',
                selector: (row) => row.qtyPerKit,
              },
              {
                name: 'Total Qty',
                selector: (row) => row.totalQty,
              },
              {
                name: 'Lot Number',
                selector: (row) => row.year,

                cell: (row, index) => {
                  return (
                    <div className="w-[80px]">
                      <FormSelect
                        placeholder={row.lots?.[0]?.lotNumber}
                        options={row.lots}
                        setFieldValue={(name, data) => {
                          dispatch(
                            updateBuildKit({
                              items: builder.buildKit?.items?.map((item) => {
                                const SelectedIndex = item.lots?.filter(
                                  (lot) => lot.id === data
                                );
                                return {
                                  ...item,
                                  lots: [
                                    ...SelectedIndex,
                                    ...item.lots?.filter(
                                      (lot) => lot.id !== data
                                    ),
                                  ],
                                };
                              }),
                            })
                          );
                        }}
                      />
                    </div>
                  );
                },
              },
              {
                name: 'Expiration Date',
                selector: (row) => row.lots?.[0]?.expirationDate,
              },
              {
                name: 'Storage Location',
                selector: (row) => row.lots?.[0]?.storageLocation?.name,
              },
            ]}
            customStyles={{
              responsiveWrapper: {
                style: { overflow: 'visible !important' },
              },
            }}
          />
        </div>
      ) : (
        <Skeleton count="4" />
      )}

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
        <Button
          type="button"
          cta={() => {
            handlePrint();
          }}
          text="Print"
          color="text-white"
          bg="bg-primary1"
          Icon={<Print color="white" />}
        />
        {uisettings.formLoader ? (
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
          <Button
            cta={() => {
              cta();
            }}
            type="button"
            text="Build"
            bg="bg-primary1"
            color="text-white"
            Icon={<Add color="white" />}
          />
        )}
      </div>
    </div>
  );
};
export default EditKitBuilder;
