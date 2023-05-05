import React, { useRef, useState, forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { RequestAcknowledgment } from '../../components/Formik/AllForms/requestAcknowledgment';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { setForm, setFormLoaderReducer, showSuccessReducer } from '../../Store/reducers/uiSettings';
import { HemaLabel, FormSelect, Button, FormText, Alert, HemaValue, FormSwitch } from '../../utils';
import {
  FirstName,
  Barcode,
  Location,
  Request,
  CrossIcon,
  Email,
  SiteName,
  LabelDate,
  SendIcon,
  LightBulb,
  ActionEye,
  AddInKit,
  DeleteKit,
  FormReject,
  FormApprove,
} from '../../HemeIconLibrary';
import Heading from '../../pages/logistOrchestra/logisticComponents/heading';
import { createOrderAction, getAcknowledgedetailAction, updateOrderAction } from '../../Actions/order';
import DataTable from 'react-data-table-component';

const RequestInformaction = forwardRef((props, ref) => {
  const { setUpdatedData, setformName, setFormIcon, setokBtnIcon, setokBtnText, setShowDashboard } = props;
  const [items, setItems] = useState([]);

  const { uisettings, allItems, sponsers, orders, common } = useSelector((state) => state);

  useEffect(() => {
    if (orders?.activeOrder?.items) {
      setItems(orders?.activeOrder.items);
    }
  }, [orders?.activeOrder]);

  const dispatch = useDispatch();
  const onDragEnd = (result) => {
    // dropped outside the lista
    console.log(result);
    if (!result.destination) {
      return;
    }

    const itemsData = reorder(items, result.source.index, result.destination.index);

    //const sortArray = itemsData.map((data) => data.sort).sort();
    // itemsData[result.source.index].sort = sortArray[result.destination.index];
    // itemsData[result.destination.index].sort = sortArray[result.source.index];
    setItems(itemsData);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const customStyles = {
    rows: {
      style: {
        borderBottom: 'none !important',
      },
    },
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={{
          requestorName: orders?.activeOrder?.requesterName || '',
          requestorEmail: orders?.activeOrder?.requesterEmail || '',
          sponsor: orders?.activeOrder?.sponsor?.id || '',
          study: orders?.activeOrder?.study?.id || '',
          siteCode: orders?.activeOrder?.site?.id || '',
          requestedDate: orders?.activeOrder?.requestedDate?.split('T')?.[0] || '',
          neededByDate: orders?.activeOrder?.neededDate?.split('T')?.[0] || '',
          shipper: orders?.activeOrder?.testingLab?.id || '',
          initialRequest: orders.defaultValues?.initialRequest || orders?.activeOrder?.initialRequest,

          greenLightNeeded: orders.defaultValues?.greenLightRequired || orders?.activeOrder?.greenLightNeeded,
          // ||
          // orders.defaultValues?.greenLightRequired,
          shipToSiteAddress: orders.defaultValues?.shipToSiteAddress || orders?.activeOrder?.shipToSiteAddress,
          // orders.defaultValues?.shipToSiteAddress,
          items: items,
        }}
        innerRef={ref}
        // enableReinitialize
        validate={(values) => {
          const errors = {};

          if (!values.requestorName) {
            errors.requestorName = 'Required';
          }

          if (!values.requestorEmail) {
            errors.requestorEmail = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.requestorEmail)) {
            errors.requestorEmail = 'Invalid email address';
          }

          if (!values.sponsor) {
            errors.sponsor = 'Required';
          }
          if (!values.study) {
            errors.study = 'Required';
          }
          if (!values.siteCode) {
            errors.siteCode = 'Required';
          }
          if (!values.requestedDate) {
            errors.requestedDate = 'Required';
          }
          if (!values.neededByDate) {
            errors.neededByDate = 'Required';
          }
          if (!values.shipper) {
            errors.shipper = 'Required';
          }
          if (items.length === 0) {
            errors.items = 'select atleast one item from dropdown. if there are no options in dropdown, kindly change the site';
          }
          return errors;
        }}
        onSubmit={async (values) => {
          if (orders?.activeOrder?.id) {
          const createOrder = await updateOrderAction(orders?.activeOrder?.id, {
            requesterName: values.requestorName,
            requesterEmail: values.requestorEmail,
            requestedDate: values.requestedDate,
            neededDate: values.neededByDate,
            siteId: values?.siteCode || orders.activesite,
            typeId: orders.type,
            initialRequest: values.initialRequest || orders.defaultValues?.initialRequest,
            testingLabId: values.shipper,
            greenLightNeeded: values.greenLightNeeded || orders.defaultValues?.greenLightRequired,
            shipToSiteAddress: values.shipToSiteAddress || orders.defaultValues?.shipToSiteAddress,
            //addressId: values.requestorName,
            items: items?.map((item) => {
              return {
                itemId: parseInt(item?.item?.id) || parseInt(item.itemId),
                quantity: item.quantity,
              };
            }),
          });


          if (createOrder.status === 200) {
            dispatch(showSuccessReducer('New order created'));
            // setShowDashboard(true)
          }
        } else {
          const createOrder = await createOrderAction({
            requesterName: values.requestorName,
            requesterEmail: values.requestorEmail,
            requestedDate: values.requestedDate,
            neededDate: values.neededByDate,
            siteId: values?.siteCode || orders.activesite,
            typeId: orders.type,
            initialRequest: values.initialRequest || orders.defaultValues?.initialRequest,
            testingLabId: values.shipper,
            greenLightNeeded: values.greenLightNeeded || orders.defaultValues?.greenLightRequired,
            shipToSiteAddress: values.shipToSiteAddress || orders.defaultValues?.shipToSiteAddress,
            //addressId: values.requestorName,
            items: items?.map((item) => {
              return {
                itemId: parseInt(item?.item?.id) || parseInt(item.itemId),
                quantity: item.quantity,
              };
            }),
          });


          if (createOrder.status === 200) {
            dispatch(showSuccessReducer('New order created'));
            // setShowDashboard(true)
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
          validateForm,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col justify-between w-full m-auto overflow-auto ">
            <div className="pr-4">
              <Heading heading="Request Details" />
              <div className="flex items-start gap-[16px] mb-3">
                <div className={`w-full ${orders?.activeOrder?.acknowledgment?.isAccepted && 'flex gap-[20px]'}`}>
                  <HemaLabel
                    text="Request Type"
                    className="mb-[10px]"
                    required={orders?.activeOrder?.acknowledgment?.isAccepted ? false : true}
                    Icon={orders?.activeOrder?.acknowledgment?.isAccepted ? '' : <Request />}
                  />
                  {orders?.activeOrder?.acknowledgment?.isAccepted ? (
                    <HemaValue text={orders?.activeOrder?.header.type?.name} />
                  ) : (
                    <FormText
                      type="text"
                      name="request"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      value={orders.type === 1 ? 'Contolled Request' : 'Uncontolled Request'}
                      disabled
                    />
                  )}
                </div>

                <div className={`w-full ${orders?.activeOrder?.acknowledgment?.isAccepted && 'flex gap-[20px]'}`}>
                  <HemaLabel
                    text="Requestor Name"
                    className="mb-[10px]"
                    required={orders?.activeOrder?.acknowledgment?.isAccepted ? false : true}
                    Icon={orders?.activeOrder?.acknowledgment?.isAccepted ? '' : <FirstName />}
                  />
                  {orders?.activeOrder?.acknowledgment?.isAccepted ? (
                    <HemaValue text={orders?.activeOrder?.requesterName} />
                  ) : (
                    <FormText
                      type="text"
                      name="requestorName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      value={values.requestorName}
                      placeholder={'Type name'}
                      crossIcon={values.requestorName ? <CrossIcon /> : ''}
                      disabled={orders?.activeOrder?.requesterName ? (orders.type === 1 ? true : false) : false}
                    />
                  )}

                  {errors.requestorName && touched.requestorName && <div className="error text-[red] text-[12px] pt-[2px]">{errors.requestorName}</div>}
                </div>
              </div>
              <div className="flex items-start gap-[16px] mb-3">
                <div className={`w-full ${orders?.activeOrder?.acknowledgment?.isAccepted && 'flex gap-[20px]'}`}>
                  <HemaLabel
                    text="Requestor Email"
                    className="mb-[10px]"
                    required={orders?.activeOrder?.acknowledgment?.isAccepted ? false : true}
                    Icon={orders?.activeOrder?.acknowledgment?.isAccepted ? '' : <Email />}
                  />
                  {orders?.activeOrder?.acknowledgment?.isAccepted ? (
                    <HemaValue text={orders?.activeOrder?.requesterEmail} />
                  ) : (
                    <FormText
                      type="email"
                      name="requestorEmail"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      value={values.requestorEmail}
                      placeholder="Type email"
                      crossIcon={values.requestorEmail ? <CrossIcon /> : ''}
                      disabled={orders?.activeOrder?.requesterEmail ? (orders.type === 1 ? true : false) : false}
                    />
                  )}
                  {errors.requestorEmail && touched.requestorEmail && <div className="error text-[red] text-[12px] pt-[2px]">{errors.requestorEmail}</div>}
                </div>

                <div className={`w-full ${orders?.activeOrder?.acknowledgment?.isAccepted && 'flex gap-[20px]'}`}>
                  <HemaLabel
                    text="Sponsor"
                    className="mb-[10px]"
                    required={orders?.activeOrder?.acknowledgment?.isAccepted ? false : true}
                    Icon={orders?.activeOrder?.acknowledgment?.isAccepted ? '' : <FirstName />}
                  />
                  {orders?.activeOrder?.acknowledgment?.isAccepted ? (
                    <HemaValue text={orders?.activeOrder?.sponsor?.name} />
                  ) : (
                    <FormSelect
                      options={sponsers?.allSponsers?.filter((data) => data.isActive) || []}
                      placeholder={orders?.activeOrder?.sponsor?.name || 'Select Sponsor'}
                      setFieldValue={setFieldValue}
                      name={'sponsor'}
                      value={values?.sponsor}
                      crossIcon={values.sponsor ? <CrossIcon /> : ''}
                      dispatch={dispatch}
                      disabled={orders?.activeOrder?.sponsor?.id ? (orders.type === 1 ? true : false) : false}
                    />
                  )}
                  {errors.sponsor && touched.sponsor && <div className="error text-[red] text-[12px] pt-[2px]">{errors.sponsor}</div>}
                </div>
              </div>
              <div className="flex items-start gap-[16px] mb-3">
                <div className={`w-full ${orders?.activeOrder?.acknowledgment?.isAccepted && 'flex gap-[20px]'}`}>
                  <HemaLabel
                    text="Study #"
                    className="mb-[10px]"
                    required={orders?.activeOrder?.acknowledgment?.isAccepted ? false : true}
                    Icon={orders?.activeOrder?.acknowledgment?.isAccepted ? '' : <Barcode />}
                  />
                  {orders?.activeOrder?.acknowledgment?.isAccepted ? (
                    <HemaValue text={orders?.activeOrder?.study?.name} />
                  ) : (
                    <FormSelect
                      options={sponsers?.sponerStudy || []}
                      placeholder={orders?.activeOrder?.study?.name || 'Type name to search and select'}
                      setFieldValue={setFieldValue}
                      name={'study'}
                      value={values?.study}
                      crossIcon={values.study ? <CrossIcon /> : ''}
                      dispatch={dispatch}
                      disabled={orders?.activeOrder?.study?.id ? (orders.type === 1 ? true : false) : false}
                    />
                  )}
                  {errors.study && touched.study && <div className="error text-[red] text-[12px] pt-[2px]">{errors.study}</div>}
                </div>

                <div className={`w-full ${orders?.activeOrder?.acknowledgment?.isAccepted && 'flex gap-[20px]'}`}>
                  <HemaLabel
                    text="Site Code"
                    className="mb-[10px]"
                    required={orders?.activeOrder?.acknowledgment?.isAccepted ? false : true}
                    Icon={orders?.activeOrder?.acknowledgment?.isAccepted ? '' : <SiteName />}
                  />
                  {orders?.activeOrder?.acknowledgment?.isAccepted ? (
                    <HemaValue text={orders?.activeOrder?.site?.name} />
                  ) : (
                    <FormSelect
                      options={sponsers?.allSitesForSponser || []}
                      placeholder={orders?.activeOrder?.site?.name || 'Type name to search and select'}
                      setFieldValue={setFieldValue}
                      name={'siteCode'}
                      value={values?.siteCode}
                      crossIcon={values.siteCode ? <CrossIcon /> : ''}
                      dispatch={dispatch}
                      disabled={orders?.activeOrder?.site?.id ? (orders.type === 1 ? true : false) : false}
                    />
                  )}
                  {errors.siteCode && touched.siteCode && <div className="error text-[red] text-[12px] pt-[2px]">{errors.siteCode}</div>}
                </div>
              </div>

              <div className="flex items-start gap-[16px] mb-3">
                <div className={`w-full ${orders?.activeOrder?.acknowledgment?.isAccepted && 'flex gap-[20px]'}`}>
                  <HemaLabel
                    text="Requested Date"
                    className="mb-[10px]"
                    required={orders?.activeOrder?.acknowledgment?.isAccepted ? false : true}
                    Icon={orders?.activeOrder?.acknowledgment?.isAccepted ? '' : <LabelDate />}
                  />
                  {orders?.activeOrder?.acknowledgment?.isAccepted ? (
                    <HemaValue text={orders?.activeOrder?.requestedDate?.split('T')?.[0]} />
                  ) : (
                    <FormText
                      type="date"
                      name="requestedDate"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      value={values.requestedDate}
                      placeholder={'Select a date'}
                      max={new Date().toISOString().split("T")[0]}

                      crossIcon={values.requestedDate ? <CrossIcon /> : ''}
                    />
                  )}
                  {errors.requestedDate && touched.requestedDate && <div className="error text-[red] text-[12px] pt-[2px]">{errors.requestedDate}</div>}
                </div>
                <div className={`w-full ${orders?.activeOrder?.acknowledgment?.isAccepted && 'flex gap-[20px]'}`}>
                  <HemaLabel
                    text="Needed By Date"
                    className="mb-[10px]"
                    required={orders?.activeOrder?.acknowledgment?.isAccepted ? false : true}
                    Icon={orders?.activeOrder?.acknowledgment?.isAccepted ? '' : <LabelDate />}
                  />
                  {orders?.activeOrder?.acknowledgment?.isAccepted ? (
                    <HemaValue text={orders?.activeOrder?.neededDate?.split('T')?.[0]} />
                  ) : (
                    <FormText
                      type="date"
                      name="neededByDate"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      value={values.neededByDate}
                      placeholder={'Type name to search and select'}
                      min={new Date().toISOString().split("T")[0]}
                      crossIcon={values.neededByDate ? <CrossIcon /> : ''}
                    />
                  )}
                  {errors.neededByDate && touched.neededByDate && <div className="error text-[red] text-[12px] pt-[2px]">{errors.neededByDate}</div>}
                </div>
              </div>
              <div className="flex items-start gap-[16px] mb-[30px]">
                <div className={`w-full ${orders?.activeOrder?.acknowledgment?.isAccepted && 'flex gap-[20px]'}`}>
                  <HemaLabel
                    text="Testing Lab"
                    className="mb-[10px]"
                    required={orders?.activeOrder?.acknowledgment?.isAccepted ? false : true}
                    Icon={orders?.activeOrder?.acknowledgment?.isAccepted ? '' : <Barcode />}
                  />
                  {orders?.activeOrder?.acknowledgment?.isAccepted ? (
                    <HemaValue text={orders?.activeOrder?.shipperAddress?.name} />
                  ) : (
                    <FormSelect
                      options={common.allTestingLabs}
                      placeholder={values?.shipper?.testingLab?.name || 'Type name to search and select'}
                      setFieldValue={setFieldValue}
                      name={'shipper'}
                      value={values?.shipper}
                      crossIcon={values.shipper ? <CrossIcon /> : ''}
                    />
                  )}
                  {errors.shipper && touched.shipper && <div className="error text-[red] text-[12px] pt-[2px]">{errors.shipper}</div>}
                </div>
              </div>

              <Heading heading="Order Details" />
              {orders?.activeOrder?.acknowledgment?.isAccepted ? (
                <div>
                  <div className="">
                    <DataTable
                      customStyles={customStyles}
                      data={orders?.activeOrder.items || []}
                      columns={[
                        {
                          name: <HemaValue text={'Name'} className="font-normal text-[#000000]" />,
                          cell: (row) => {
                            return <HemaValue text={row.item?.name} className="font-normal text-[#000000]" />;
                          },
                        },
                        {
                          name: <HemaValue text={'Quantity'} className="font-normal text-[#000000]" />,
                          cell: (row) => {
                            return <HemaValue text={row.quantity} className="font-normal text-[#000000]" />;
                          },
                        },
                      ]}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="">
                    <div className="flex items-align py-[11px] border w-full rounded-t pl-[15px] pr-[63px]  justify-between ">
                      <div className="pl-[30px] ">
                        <HemaValue text="Name" />
                      </div>
                      <div className="flex items-center gap-5 ">
                        <div className="w-[172px]">
                          <HemaValue text="Total Quantity " />
                        </div>
                        <HemaValue text="Action " />
                      </div>
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {items.map((item, index) => {
                              return (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                  {(provided, snapshot) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                      <DataTableRowItems
                                        index={index}
                                        item={item}
                                        setItems={setItems}
                                        allItems={allItems}
                                        items={items}
                                        formName={uisettings.formName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        setFieldValue={setFieldValue}
                                        values={values}
                                      />
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                  <NewRow
                    addRow={(data) =>
                      setItems([
                        ...items,
                        {
                          id: String(Date.now()),
                          sort: items.length + 1,
                          itemId: data?.itemName,
                          quantity: 1,
                          name: allItems.allItems?.filter((itm) => String(itm.id) === data?.itemName)?.[0]?.name,
                        },
                      ])
                    }
                  />
                </div>
              )}
              {errors.items && touched.items && <div className="error text-[red] text-[12px] pt-[2px]">{errors.items}</div>}
              <div className="mt-[26px]">
                <Heading heading="Request Options" />
              </div>
              <div className="max-w-[70%] flex items-center justify-between">
                {orders?.activeOrder?.acknowledgment?.isAccepted ? (
                  <div>
                    <div
                      className={`w-full  flex gap-[20px]
                  }`}
                    >
                      <HemaLabel text="Initial Request" className="mb-[10px]" />

                      <HemaValue text={orders?.activeOrder?.initialRequest ? 'Yes' : 'No'} />
                    </div>
                    <div
                      className={`w-full flex gap-[20px]
                  }`}
                    >
                      <HemaLabel text="Green Light Required" className="mb-[10px]" />

                      <HemaValue text={orders?.activeOrder?.greenLightNeeded ? 'Yes' : 'No'} />
                    </div>
                    <div
                      className={`w-full  flex gap-[20px]
                  }`}
                    >
                      <HemaLabel text="Ship to Site Address" className="mb-[10px]" />

                      <HemaValue text={orders?.activeOrder?.shipToSiteAddress ? 'Yes' : 'No'} />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-between">
                    <div className="flex items-center gap-[10px]">
                      <HemaLabel text="Initial Request" className="mb-0" Icon={<Request />} />

                      <FormSwitch
                        name={'initialRequest'}
                        setFieldValue={setFieldValue}
                        initialValue={orders.defaultValues?.initialRequest || values.initialRequest}
                        disabled={orders.type === 1 ? true : false}
                      />
                    </div>
                    <div className="flex items-center gap-[10px]">
                      <HemaLabel text="green Light Needed" className="mb-0" Icon={<LightBulb />} />

                      <FormSwitch
                        name={'greenLightNeeded'}
                        setFieldValue={setFieldValue}
                        initialValue={
                          orders.defaultValues?.shipToSiteAddress || values?.greenLightNeeded
                          //  orders.defaultValues?.greenLightRequired ? true : false
                        }
                        disabled={orders.type === 1 ? true : false}
                      />
                    </div>
                    <div className="flex items-center gap-[10px]">
                      <HemaLabel text="Ship to Site Address" className="mb-0" Icon={<Location />} />

                      <FormSwitch
                        name={'shipToSiteAddress'}
                        setFieldValue={setFieldValue}
                        initialValue={orders.defaultValues?.shipToSiteAddress || values.shipToSiteAddress}
                        disabled={orders.type === 1 ? true : false}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-[30px]">
                <Heading heading="Request Acknowledgment" />
              </div>
              {orders?.activeOrder?.acknowledgment?.isAccepted ? (
                <div className="flex items-center gap-[15px]">
                  <Button type="button" text="View Acknowledgment" bg="bg-primary1" color="text-white" Icon={<SendIcon />} />
                  Request Acknowledgment was sent by {orders?.activeOrder?.requesterName} on Wednesday, November 2nd, 2022 at 9:25 AM.
                </div>
              ) : (
                <div className="flex items-center gap-[15px]">
                  <div className="flex items-center gap-[10px] py-[14px] pr-4">
                    <HemaLabel text="Approve" className="mb-0" Icon={<FormApprove />} />

                    <Button
                      type="button"
                      text="Send Acknowledgment"
                      bg="bg-primary1"
                      color="text-white"
                      Icon={<SendIcon />}
                      cta={async () => {
                        const checkFormValid = await validateForm();

                        if (Object.keys(checkFormValid)?.length && !orders?.activeOrder?.acknowledgment?.isAccepted) {
                          alert('complete all fields');
                          return;
                        }

                        setformName('Request Acknowledgment');
                        setFormIcon(<FormApprove />);
                        setokBtnText('Send');
                        setUpdatedData(RequestAcknowledgment);
                        if (orders?.activeOrder?.id) {
                          const createOrder = await updateOrderAction(orders?.activeOrder?.id, {
                            requesterName: values.requestorName,
                            requesterEmail: values.requestorEmail,
                            requestedDate: values.requestedDate,
                            neededDate: values.neededByDate,
                            siteId: values?.siteCode || orders.activesite,
                            typeId: orders.type,
                            initialRequest: values.initialRequest || orders.defaultValues?.initialRequest,
                            testingLabId: values.shipper,
                            greenLightNeeded: values.greenLightNeeded || orders.defaultValues?.greenLightRequired,
                            shipToSiteAddress: values.shipToSiteAddress || orders.defaultValues?.shipToSiteAddress,
                            //addressId: values.requestorName,
                            items: items?.map((item) => {
                              return {
                                itemId: parseInt(item?.item?.id) || parseInt(item.itemId),
                                quantity: item.quantity,
                              };
                            }),
                          });
                          if (createOrder.status === 200) {
                            await getAcknowledgedetailAction(createOrder?.data?.id);
                            dispatch(
                              setForm({
                                state: true,
                                type: 'approve-acknowledge',
                              }),
                            );
                          }
                        } else {
                          const createOrder = await createOrderAction({
                            requesterName: values.requestorName,
                            requesterEmail: values.requestorEmail,
                            requestedDate: values.requestedDate,
                            neededDate: values.neededByDate,
                            siteId: values?.siteCode || orders.activesite,
                            typeId: orders.type,
                            initialRequest: values.initialRequest || orders.defaultValues?.initialRequest,
                            testingLabId: values.shipper,
                            greenLightNeeded: values.greenLightNeeded || orders.defaultValues?.greenLightRequired,
                            shipToSiteAddress: values.shipToSiteAddress || orders.defaultValues?.shipToSiteAddress,
                            //addressId: values.requestorName,
                            items: items?.map((item) => {
                              return {
                                itemId: parseInt(item?.item?.id) || parseInt(item.itemId),
                                quantity: item.quantity,
                              };
                            }),
                          });
                          if (createOrder.status === 200) {
                            await getAcknowledgedetailAction(createOrder?.data?.id);
                            dispatch(
                              setForm({
                                state: true,
                                type: 'approve-acknowledge',
                              }),
                            );
                          }
                        }
                      }}
                    />
                  </div>
                  {orders?.activeOrder?.id && (
                    <div className="flex items-center gap-[10px] py-[14px] pr-4">
                      <HemaLabel text="Reject" className="mb-0" Icon={<FormReject />} />
                      <div
                        onClick={async () => {
                          setformName('Request Acknowledgment');
                          setFormIcon(<FormApprove />);
                          setokBtnText('Reject');

                          await getAcknowledgedetailAction(orders?.activeOrder?.id);
                          dispatch(
                            setForm({
                              state: true,
                              type: 'reject-acknowledge',
                            }),
                          );
                        }}
                      >
                        <Button type="button" text="Request more information" bg="bg-primary1" color="text-white" Icon={<Request color="white" />} />{' '}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
});

export default RequestInformaction;

export const NewRow = ({ addRow, dropDownItemList }) => {
  const selectRef = useRef();

  const { allItems, orders } = useSelector((state) => state);
  return (
    <Formik
      initialValues={{ sort: '', itemName: '' }}
      enableReinitialize
      validate={(values) => {
        const errors = {};
        if (!values.itemName) {
          errors.itemName = 'Required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        addRow(values);
        resetForm({ values: '' });
        selectRef.current.clearSelect();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-[6px] border border-1 p-[10px] pr-[35px] w-full">
            <div className="flex">
              <Button type="button" cta={() => handleSubmit()} Icon={<AddInKit />} />
            </div>
            <div className="mr-[16px] grow-[2]">
              <FormSelect
                ref={selectRef}
                placeholder="Item name"
                setFieldValue={setFieldValue}
                onChange={(event) => {
                  handleChange(event);
                  console.log('ev', event);
                  // setTimeout(() => handleSubmit());
                }}
                onBlur={handleBlur}
                value={values.itemName}
                name="itemName"
                options={allItems.allItems}
                crossIcon={values.itemName ? <CrossIcon /> : ''}
                notRefresh
              />
              {errors.itemName && touched.itemName && <div className="error text-[red] text-[12px] pt-[2px]">{errors.itemName}</div>}
            </div>
            <div className="w-[293px]">
              <div className=" w-[140px] border border-[#DEE2E6] rounded-[5px] px-[10px] py-[3px]">
                <HemaValue text="Type quantity" />
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export const DataTableRowItems = ({ index, item, setItems, allItems, items, hideSort, formName = '', onChange, values, onBlur, setFieldValue }) => {
  return (
    <div className="flex items-center gap-[30px] border border-1 p-[10px] justify-between">
      {/*{!hideSort && (
        <div className="flex">
          <Button type="button" Icon={<DragDrop />} />
          <div className="self-center">
            <div>
              <HemaValue text={++index} />
            </div>
          </div>
        </div>
      )}*/}
      <div className="grow-[2] ml-10 mr-[16px]">
        <FormSelect
          placeholder={item.name || item?.item?.name}
          value={item.itemName || item?.item?.id}
          options={allItems.allItems}
          setFieldValue={(name, data) => {
            setItems(
              items.map((up) => {
                if (up.id === item.id) {
                  return { ...up, itemId: data };
                } else {
                  return up;
                }
              }),
            );
          }}
          name="item-name-kil-builder"
          crossIcon={item.name || item?.item?.name ? <CrossIcon /> : ''}
        />
      </div>
      <div className="w-[293px] flex items-center justify-between pr-[18px]">
        <div className="w-[140px]">
          <FormText
            type="number"
            name="quantity"
            value={item.quantity}
            placeholder={'Type quantity'}
            crossIcon={'' ? <CrossIcon /> : ''}
            onBlur={onBlur}
            onChange={(e) => {
              console.log(e.target.value);
              setItems(
                items.map((up) => {
                  if (up.id === item.id) {
                    return { ...up, quantity: e.target.value };
                  } else {
                    return up;
                  }
                }),
              );
            }}
          />
        </div>

        <div className="flex items-start gap-4">
          <Button type="button" className="p-1 w-7 h-7 " bg="bg-[#F1F5F7]" Icon={<ActionEye />} cta={() => {}} />
          <Button
            type="button"
            className="w-7 h-7 p-[6px]"
            bg="bg-[#F1F5F7]"
            Icon={<DeleteKit />}
            cta={() => {
              setItems(items.filter((up) => up.id !== item.id));
            }}
          />
        </div>
      </div>
    </div>
  );
};
