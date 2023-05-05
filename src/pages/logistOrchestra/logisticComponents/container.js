import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';

import {
  protocolDetailIdAction,
  regionDetailIdAction,
  addKitTemplateAssemblyCopyAction,
  getKitTemplateAssemblyCopyAction,
  deleteKitAction,
  deleteKitAssemblyAction,
  getAllCountryForRegionDetailAction,
  getAllSitesForCountryDetailAction,
} from '../../../Actions/logistic';
import TableData from './tableData';
import ShippingRules from './shippingRules';
import KitConfiguration from './kitConfiguration';
import NonActiveLogistic from './nonActiveLogistic';
import Heading from '../logisticComponents/heading';
import { Edit, Protocol, Assign, Add, AddInKit, Apply, CountryInfo, ExpiryAlertPurple, CreateItemPurple, CreateSite, EyeIcon } from '../../../HemeIconLibrary';

import { setForm, editFormReducer, setFormLoaderReducer, showSuccessReducer, setFormCloseReducer } from '../../../Store/reducers/uiSettings';

import { HemaLabel, HemaValue, Button, Alert } from '../../../utils';

const Container = (props) => {
  const {
    active,
    setCTA,
    setformName,
    setFormIcon,
    //  setFormValidation,
    setUpdatedData,
    activeDetail,
    activeState,
    setAllItemsInTemplate,
    allItemsInTemplate,
    activeRegion,
    activeCountry,
    loader,
  } = props;

  const dispatch = useDispatch();
  const { logistic, common, uisettings } = useSelector((state) => state);

  // CTA Item verison
  const copyAssebblyCTA = (itemsfromKit, kit) => {
    setCTA(() => async (data, items) => {
      console.log(kit);
      console.log('ewrewr', items);
      dispatch(setFormLoaderReducer(true));
      const copyAssemblyReturn = await addKitTemplateAssemblyCopyAction({
        logisticBuilderKitId: kit?.id,
        name: data?.name + ' copy',
        inboundShippingConditionId: data?.inboundShippingConditionId,
        testingLabId: data?.testingLabId,
        items: items?.map((item) => {
          return {
            ...item,

            itemId: item.itemId || item.id || item.item?.id,
            quantity: item.qty || item.qty,
          };
        }),
      });
      if (copyAssemblyReturn?.status === 200) {
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`${copyAssemblyReturn.data.name} assembly added.`));
      }
      dispatch(setFormLoaderReducer(false));
    });
  };

  const deleteKitConfig = () => {
    setCTA(() => async (data) => {
      dispatch(setFormLoaderReducer(true));
      const delteKitConfig = await deleteKitAction(data?.kitId, data?.chanereason);
      if (delteKitConfig?.status === 200) {
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(` kit configuration deleted.`));
      }
      dispatch(setFormLoaderReducer(false));
    });
  };

  const deleteKitAssemblyConfig = (kit) => {
    setCTA(() => async (data) => {
      console.log(data, kit);
      dispatch(setFormLoaderReducer(true));
      const delteKitConfig = await deleteKitAssemblyAction(data?.kitId, kit?.id);
      if (delteKitConfig?.status === 200) {
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(` kit configuration deleted.`));
      }
      dispatch(setFormLoaderReducer(false));
    });
  };
  if (!active) {
    return (
      <div className="w-full pl-[36px] pt-[13px] pr-[16px] pb-[32px]">
        <div className="h-full">
          <div className="w-full flex items-center justify-center text-center  mx-auto mt-[211px]">
            <p className="text-lg leading-[22px] font-semibold text-textColor2  w-[350px]">You haven’t selected a study from the menu.</p>
          </div>
        </div>
      </div>
    );
  }

  if (active?.id === 0) {
    return (
      <div className="w-full pl-[36px] pt-[13px] pr-[16px] pb-[32px]">
        <div className="h-full">
          <div className="w-full flex items-center justify-center text-center  mx-auto mt-[211px]">
            <NonActiveLogistic />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pl-[36px] pt-[13px] pr-[16px] pb-[32px] overflow-auto">
      <div className="h-full">
        {loader ? (
          <div className="">
            <Skeleton count="4" />
            <br />
            <Skeleton count="4" />
            <br />
            <Skeleton count="4" />
            <br />
          </div>
        ) : activeState === 'study' ? (
          <div className="">
            <div className="flex items-center justify-between">
              <div className="mb-[26px]">
                <div className="flex items-center gap-[5px] py-[5px] ">
                  <Protocol />
                  <h4 className="text-xl font-bold leading-[30px] text-mainheadingColor m-0">Study Information</h4>
                </div>
                <div className="flex items-center">
                  <HemaValue
                    className="min-w-[250px]"
                    text={`You have ${logistic?.selectedProtocolDetail?.unconfiguredSites?.length || 0} site that is not configured yet for this study.`}
                  />
                  <Button
                    border="primary1"
                    className="p-[8px] w-10 h-10 border-none border-0"
                    Icon={<EyeIcon color="#605DAF" />}
                    cta={() => {
                      dispatch(editFormReducer(logistic?.selectedProtocolDetail));
                      setformName(`Unconfigured Sites`);
                      setFormIcon(<CreateSite />);
                      dispatch(
                        setForm({
                          state: true,
                          type: 'un-configured-site',
                        }),
                      );
                    }}
                  />
                </div>
              </div>
              {logistic?.selectedProtocolDetail?.qc?.status?.id !== 2 && (
                <div className="flex items-center gap-2">
                  <Button
                    border="primary1"
                    className="p-[12px] w-10 h-10"
                    Icon={<Edit color="#605DAF" />}
                    cta={() => {
                      dispatch(editFormReducer(logistic?.selectedProtocolDetail));
                      setformName(`Edit Study`);
                      setFormIcon(<ExpiryAlertPurple />);
                      dispatch(
                        setForm({
                          state: true,
                          type: 'assign-shipping-rule',
                        }),
                      );
                    }}
                  />
                </div>
              )}
            </div>
            <Heading heading="Study Details" />
            <div className="mb-[29px]">
              <TableData
                tableHeading={['Sponsor Name', 'Study Name', 'Study Code', 'Study Name Alias', 'Study Code Alias']}
                studyName={activeDetail?.study?.name}
                sponserName={activeDetail?.sponsor?.name}
                studyCode={activeDetail?.studyCode}
                studyNameAlais={activeDetail?.alias}
                studyCodeAlais={activeDetail?.studyCodeAlias}
              />
            </div>

            <Heading
              heading="Shipping Rules"
              buttonData={
                logistic.selectedProtocolDetail?.qc?.status.id !== 2
                  ? [
                      {
                        type: 'primary',
                        text: 'Apply',
                        Icon: <Assign />,
                        cta: () => {
                          // if (logistic.selectedrule?.length > 0) {
                          setformName(`Apply Configuration `);
                          setFormIcon(<Apply />);
                          dispatch(setForm({ state: true, type: 'assign-shipping-study-level' }));
                          // }
                        },
                      },
                    ]
                  : []
              }
            />

            <div className="mb-[29px]">
              <ShippingRules
                //  shipping={common.allShipping}
                shipping={common.allShipping?.map((data) => {
                  return {
                    shippingConditionId:
                      logistic?.selectedProtocolDetail?.shippingRules?.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.shippingCondition || data,
                    inBoundCourierId: logistic?.selectedProtocolDetail?.shippingRules?.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.inBoundCourier,
                    outBoundCourierId: logistic?.selectedProtocolDetail?.shippingRules?.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.outBoundCourier,
                  };
                })}
                assigner
                readOnly
              />
            </div>

            <Heading
              heading="Kit Configuration"
              buttonData={
                logistic.selectedProtocolDetail?.qc?.status.id !== 2
                  ? [
                      {
                        type: 'primary',
                        text: 'Kit Template',
                        Icon: <Add color=" #605DAF" />,
                        cta: () => {
                          setformName(`Add Kit Template(s)`);
                          setFormIcon(<CreateItemPurple />);
                          dispatch(setForm({ state: true, type: 'addKitToLogistic' }));
                        },
                      },
                      {
                        type: 'primary',
                        text: 'Apply',
                        Icon: <Assign />,
                        cta: () => {
                          if (logistic?.selectedProtocolDetail?.logisticBuilderKits?.find((f) => f.checked === true)) {
                            setformName(`Apply Configuration`);
                            setFormIcon(<Apply />);
                            dispatch(setForm({ state: true, type: 'assign-kit-study-level' }));
                          } else {
                            window.scrollTo(0, 0);
                            dispatch(showSuccessReducer(`Please select any kit to Apply..!!`));
                          }
                        },
                      },
                    ]
                  : []
              }
            />
            <div className="mb-[29px]">
              <KitConfiguration
                allKits={logistic.selectedProtocolDetail}
                addAssemblyAction={
                  logistic.selectedProtocolDetail?.qc?.status.id !== 2
                    ? (kit) => {
                        return (
                          <Button
                            type="button"
                            cta={() => {
                              dispatch(editFormReducer(kit));
                              setformName(`Add Assembly`);
                              setFormIcon(<CreateItemPurple />);
                              dispatch(
                                setForm({
                                  state: true,
                                  type: 'addKitToLogisticAssemlyOnly',
                                }),
                              );
                            }}
                            Icon={<AddInKit />}
                            text="Add Assembly"
                            className="p-0 pt-[5px]"
                          />
                        );
                      }
                    : []
                }
                setformName={setformName}
                setFormIcon={setFormIcon}
                dispatch={dispatch}
                setForm={setForm}
                editFormReducer={editFormReducer}
                setUpdatedData={setUpdatedData}
                createAssemblyCTA={(data, kit) => {
                  copyAssebblyCTA(data, kit);
                }}
                setAllItemsInTemplate={setAllItemsInTemplate}
                common={common}
                getKitTemplateAssemblyCopyAction={getKitTemplateAssemblyCopyAction}
                deleteKitConfig={deleteKitConfig}
                deleteKitAssemblyConfig={deleteKitAssemblyConfig}
                assigner
                logistic={logistic}
                level="study"
              />
              <div className="flex "></div>
            </div>

            <Heading
              heading="Initial Request"
              buttonData={
                logistic.selectedProtocolDetail?.qc?.status.id !== 2
                  ? [
                      {
                        type: 'primary',
                        text: 'Apply',
                        Icon: <Assign />,
                        cta: () => {
                          if (logistic?.selectedProtocolDetail?.initialRequestAssembly) {
                            setformName(`Apply Configuration`);
                            setFormIcon(<Apply />);
                            dispatch(setForm({ state: true, type: 'assign-initial-kit-study-level' }));
                          } else {
                            window.scrollTo(0, 0);
                            dispatch(showSuccessReducer(`There is not kit to apply..!!`));
                          }
                        },
                      },
                    ]
                  : []
              }
            />
            <div className="flex gap-[50px]">
              <HemaLabel text="Select Kit Assembly" />
              <HemaValue text={logistic.selectedProtocolDetail?.initialRequestAssembly?.name} />
            </div>
          </div>
        ) : activeState === 'region' ? (
          <div className="">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[5px] py-[5px] mb-[26px]">
                <Protocol />
                <h4 className="text-xl font-bold leading-[30px] text-mainheadingColor m-0">Region Information</h4>
              </div>

              <div className="flex items-center gap-2">
                {logistic.selectedProtocolDetail?.qc?.status.id !== 2 && (
                  <Button
                    border="primary1"
                    className="p-[12px] w-10 h-10"
                    Icon={<Edit color="#605DAF" />}
                    cta={() => {
                      dispatch(editFormReducer(logistic?.selectedRegionDetail));
                      setformName(`Edit Region`);
                      setFormIcon(<ExpiryAlertPurple />);
                      dispatch(
                        setForm({
                          state: true,
                          type: 'edit-region',
                        }),
                      );
                    }}
                  />
                )}
              </div>
            </div>
            <Heading heading="Region Details" />
            <div className="mb-[29px]">
              <TableData tableHeading={['Region', 'Countires']} sponserName={logistic?.selectedRegionDetail?.name} studyName={logistic?.selectedRegionDetail?.countries || []} />
            </div>

            <Heading
              heading="Shipping Rules"
              buttonData={
                logistic.selectedProtocolDetail?.qc?.status.id !== 2
                  ? [
                      {
                        type: 'primary',
                        text: 'Apply',
                        Icon: <Assign />,
                        cta: () => {
                          setformName(`Apply Configuration`);
                          setFormIcon(<Apply />);
                          dispatch(setForm({ state: true, type: 'assign-shipping-region-level' }));
                        },
                      },
                    ]
                  : []
              }
            />

            <div className="mb-[29px]">
              <ShippingRules
                //  shipping={common.allShipping}
                shipping={common.allShipping?.map((data) => {
                  return {
                    shippingConditionId: logistic?.selectedRegionDetail?.shippingRules?.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.shippingCondition || data,
                    inBoundCourierId: logistic?.selectedRegionDetail?.shippingRules?.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.inBoundCourier,
                    outBoundCourierId: logistic?.selectedRegionDetail?.shippingRules?.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.outBoundCourier,
                  };
                })}
                assigner
                readOnly
              />
            </div>

            <Heading
              heading="Kit Configuration"
              buttonData={
                logistic.selectedProtocolDetail?.qc?.status.id !== 2
                  ? [
                      {
                        type: 'primary',
                        text: 'Apply',
                        Icon: <Assign />,
                        cta: () => {
                          if (logistic?.selectedRegionDetail?.logisticBuilderKits?.find((f) => f.checked === true)) {
                            setformName(`Apply Configuration`);
                            setFormIcon(<Apply />);
                            dispatch(setForm({ state: true, type: 'assign-kit-region-level' }));
                          } else {
                            window.scrollTo(0, 0);
                            dispatch(showSuccessReducer(`There is not kit to apply..!!`));
                          }
                        },
                      },
                    ]
                  : []
              }
            />
            <div className="mb-[29px]">
              <KitConfiguration
                allKits={logistic.selectedRegionDetail}
                // addAssemblyAction={(kit) => {
                //   return (
                //     <Button
                //       type="button"
                //       cta={() => {
                //         dispatch(editFormReducer(kit));
                //         setformName(`Add Assembly`);
                //         setFormIcon(<CreateItem />);
                //         dispatch(
                //           setForm({
                //             state: true,
                //             type: 'addKitToLogisticAssemlyOnly',
                //           }),
                //         );
                //       }}
                //       Icon={<AddInKit />}
                //       text="Add Assembly"
                //       className="p-0 pt-[5px]"
                //     />
                //   );
                // }}
                setformName={setformName}
                setFormIcon={setFormIcon}
                dispatch={dispatch}
                setForm={setForm}
                editFormReducer={editFormReducer}
                setUpdatedData={setUpdatedData}
                setAllItemsInTemplate={setAllItemsInTemplate}
                common={common}
                getKitTemplateAssemblyCopyAction={getKitTemplateAssemblyCopyAction}
                assigner
                logistic={logistic}
                level="region"
              />
            </div>

            <Heading
              heading="Initial Request"
              buttonData={
                logistic.selectedProtocolDetail?.qc?.status.id !== 2
                  ? [
                      {
                        type: 'primary',
                        text: 'Assign',
                        Icon: <Assign />,
                        cta: () => {
                          if (logistic?.selectedRegionDetail?.initialRequestAssembly) {
                            setformName(`Apply Configuration`);
                            setFormIcon(<Apply />);
                            dispatch(setForm({ state: true, type: 'assign-initial-kit-region-level' }));
                          } else {
                            window.scrollTo(0, 0);
                            dispatch(showSuccessReducer(`There is not kit to apply..!!`));
                          }
                        },
                      },
                    ]
                  : []
              }
            />
            <div className="flex gap-[50px]">
              <HemaLabel text="Select Kit Assembly" />
              <HemaValue text={logistic.selectedRegionDetail?.initialRequestAssembly?.name || 'N/A'} />
            </div>
          </div>
        ) : activeState === 'country' ? (
          <div className="">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[5px] py-[5px] mb-[26px]">
                <CountryInfo />
                <h4 className="text-xl font-bold leading-[30px] text-mainheadingColor m-0">Country Information</h4>
              </div>
              <div className="flex items-center gap-2">
                {logistic.selectedProtocolDetail?.qc?.status.id !== 2 && (
                  <Button
                    border="primary1"
                    className="p-[12px] w-10 h-10"
                    Icon={<Edit color="#605DAF" />}
                    cta={() => {
                      dispatch(editFormReducer(logistic?.selectedCountryDetail));
                      setformName(`Edit Country`);
                      setFormIcon(<ExpiryAlertPurple />);
                      dispatch(
                        setForm({
                          state: true,
                          type: 'add-new-country',
                        }),
                      );
                    }}
                  />
                )}
              </div>
            </div>
            <Heading heading="Country Details" />
            <div className="mb-[29px]">
              <div className="flex flex-col gap-4">
                <div className="items-center columns-2">
                  {[
                    {
                      label: 'Country',
                      value: logistic?.selectedCountryDetail?.country?.name || 'N/A',
                    },
                    {
                      label: 'Language',
                      value: logistic?.selectedCountryDetail?.language?.name || 'N/A',
                    },
                    {
                      label: 'Outbound HS/HTS Code',
                      value: logistic?.selectedCountryDetail?.outgoingHtsCode || 'N/A',
                    },
                    {
                      label: 'Inbound HS/HTS Code',
                      value: logistic?.selectedCountryDetail?.incomingHtsCode || 'N/A',
                    },
                    {
                      label: 'Ship Through Depot',
                      value: logistic?.selectedCountryDetail?.shippingDepot?.name || 'N/A',
                    },
                  ].map((info) => {
                    return (
                      <div className="mb-[16px] columns-2">
                        <HemaLabel className="w-[150px] whitespace-nowrap" textSize="text-[14px]" text={info.label} />
                        <HemaValue className="min-w-[250px]" text={info.value || 'NA'} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <Heading heading="Communication Plan Detail" />
            <div className="mb-[29px]">
              <div className="flex flex-col gap-4">
                <div className="items-center columns-2">
                  {[
                    {
                      label: 'Broker Contact',
                      value: logistic?.selectedCountryDetail?.broker?.contact || 'N/A',
                    },
                    {
                      label: 'Broker Telephone',
                      value: logistic?.selectedCountryDetail?.broker?.phone || 'N/A',
                    },
                    {
                      label: 'Broker Email',
                      value: logistic?.selectedCountryDetail?.broker?.email || 'N/A',
                    },
                    {
                      label: 'IOR Email',
                      value: logistic?.selectedCountryDetail?.ioR?.email || 'N/A',
                    },
                    {
                      label: 'Post Shipping Contact',
                      value: logistic?.selectedCountryDetail?.postShippingContact?.split(' ')?.join(',') || 'N/A',
                    },
                    {
                      label: 'Green Light Contacts(s)',
                      value: logistic?.selectedCountryDetail?.greenLightContact?.split(' ')?.join(',') || 'N/A',
                    },

                    {
                      label: 'Broker Address:',
                      value: logistic?.selectedCountryDetail?.broker?.address || 'N/A',
                    },
                    {
                      label: 'Broker Fax',
                      value: logistic?.selectedCountryDetail?.broker?.fax || 'N/A',
                    },
                    {
                      label: 'IOR Contact',
                      value: logistic?.selectedCountryDetail?.ioR?.contact?.split(' ')?.join(',') || 'N/A',
                    },
                    {
                      label: 'Post Shipping Required',
                      value: logistic?.selectedCountryDetail?.postShippingRequired || 'false',
                    },
                    {
                      label: 'Green Light Required',
                      value: logistic?.selectedCountryDetail?.greenLightRequiredType?.name || 'N/A',
                    },
                    {
                      label: 'Select Kit Assembly',
                      value: logistic?.selectedCountryDetail?.shippingAssembly?.name || 'N/A',
                    },
                  ].map((info) => {
                    return (
                      <div className="mb-[16px] columns-2">
                        <HemaLabel className="w-[150px] whitespace-nowrap" textSize="text-[14px]" text={info.label} />
                        <HemaValue className="min-w-[250px]" text={info.value || 'NA'} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <Heading
              heading="Shipping Rules"
              buttonData={
                logistic.selectedProtocolDetail?.qc?.status.id !== 2
                  ? [
                      {
                        type: 'primary',
                        text: 'Apply',
                        Icon: <Assign />,
                        cta: () => {
                          setformName(`Apply Configuration`);
                          setFormIcon(<Apply />);
                          dispatch(setForm({ state: true, type: 'assign-shipping-country-level' }));
                        },
                      },
                    ]
                  : []
              }
            />

            <div className="mb-[29px]">
              <ShippingRules
                //  shipping={common.allShipping}
                shipping={common.allShipping?.map((data) => {
                  return {
                    shippingConditionId:
                      logistic?.selectedCountryDetail?.shippingRules?.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.shippingCondition || data,
                    inBoundCourierId: logistic?.selectedCountryDetail?.shippingRules?.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.inBoundCourier,
                    outBoundCourierId: logistic?.selectedCountryDetail?.shippingRules?.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.outBoundCourier,
                  };
                })}
                assigner
                readOnly
              />
            </div>

            <Heading
              heading="Kit Configuration"
              buttonData={
                logistic.selectedProtocolDetail?.qc?.status.id !== 2
                  ? [
                      {
                        type: 'primary',
                        text: 'Apply',
                        Icon: <Assign />,
                        cta: () => {
                          if (logistic?.selectedCountryDetail?.logisticBuilderKits?.find((f) => f.checked === true)) {
                            setformName(`Apply Configuration`);
                            setFormIcon(<Apply />);
                            dispatch(setForm({ state: true, type: 'assign-kit-country-level' }));
                          } else {
                            window.scrollTo(0, 0);
                            dispatch(showSuccessReducer(`There is not kit to apply..!!`));
                          }
                        },
                      },
                    ]
                  : []
              }
            />
            <div className="mb-[29px]">
              <KitConfiguration
                allKits={logistic.selectedCountryDetail}
                logistic={logistic}
                setformName={setformName}
                setFormIcon={setFormIcon}
                dispatch={dispatch}
                setForm={setForm}
                editFormReducer={editFormReducer}
                setUpdatedData={setUpdatedData}
                setAllItemsInTemplate={setAllItemsInTemplate}
                common={common}
                getKitTemplateAssemblyCopyAction={getKitTemplateAssemblyCopyAction}
                assigner
                level="country"
              />
            </div>

            <Heading
              heading="Initial Request"
              buttonData={
                logistic.selectedProtocolDetail?.qc?.status.id !== 2
                  ? [
                      {
                        type: 'primary',
                        text: 'Apply',
                        Icon: <Assign />,
                        cta: () => {
                          if (logistic?.selectedCountryDetail?.initialRequestAssembly) {
                            setformName(`Apply Configuration`);
                            setFormIcon(<Apply />);
                            dispatch(setForm({ state: true, type: 'assign-initial-kit-country-level' }));
                          } else {
                            window.scrollTo(0, 0);
                            dispatch(showSuccessReducer(`There is not kit to apply..!!`));
                          }
                        },
                      },
                    ]
                  : []
              }
            />
            <div className="flex gap-[50px]">
              <HemaLabel text="Select Kit Assembly" />
              <HemaValue text={logistic.selectedCountryDetail?.initialRequestAssembly?.name} />
            </div>
          </div>
        ) : activeState === 'site' ? (
          <div className="">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[5px] py-[5px] mb-[26px]">
                <Protocol />
                <h4 className="text-xl font-bold leading-[30px] text-mainheadingColor m-0">Site Information</h4>
              </div>
              <div className="flex items-center gap-2">
                {logistic.selectedProtocolDetail?.qc?.status.id !== 2 && (
                  <Button
                    border="primary1"
                    className="p-[12px] w-10 h-10"
                    Icon={<Edit color="#605DAF" />}
                    cta={() => {
                      dispatch(editFormReducer(logistic?.selectedSiteDetail));
                      setformName(`Edit Site`);
                      setFormIcon(<ExpiryAlertPurple />);
                      dispatch(
                        setForm({
                          state: true,
                          type: 'add-new-site',
                        }),
                      );
                    }}
                  />
                )}
              </div>
            </div>
            <Heading heading="Site Details" />
            <div className="mb-[29px]">
              <div className="flex flex-col gap-4">
                <div className="items-center columns-2">
                  {[
                    {
                      label: 'Site Name',
                      value: logistic?.selectedSiteDetail?.siteName || 'N/A',
                    },
                    {
                      label: 'Site Code',
                      value: logistic?.selectedSiteDetail?.siteCode?.name || 'N/A',
                    },

                    {
                      label: 'Principal Investigator',
                      value: logistic?.selectedSiteDetail?.principleInvestigator?.name || 'N/A',
                    },
                    {
                      label: 'Site Address',
                      value: logistic?.selectedSiteDetail?.siteAddress?.name || 'N/A',
                    },
                  ].map((info) => {
                    return (
                      <div className="mb-[16px] columns-2">
                        <HemaLabel className="w-[150px] whitespace-nowrap" textSize="text-[14px]" text={info.label} />
                        <HemaValue className="min-w-[250px]" text={info.value || 'NA'} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <Heading heading="Shipping Rules" />

            <div className="mb-[29px]">
              <ShippingRules
                //  shipping={common.allShipping}
                shipping={common.allShipping?.map((data) => {
                  return {
                    shippingConditionId: logistic?.selectedSiteDetail?.shippingRules?.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.shippingCondition || data,
                    inBoundCourierId: logistic?.selectedSiteDetail?.shippingRules?.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.inBoundCourier,
                    outBoundCourierId: logistic?.selectedSiteDetail?.shippingRules?.filter((check) => check?.shippingCondition?.id === data.id)?.[0]?.outBoundCourier,
                  };
                })}
                assigner
                readOnly
              />
            </div>

            <Heading heading="Kit Configuration" />
            <div className="mb-[29px]">
              <KitConfiguration allKits={logistic?.selectedSiteDetail} logistic={logistic} level="site" />
            </div>

            <Heading heading="Initial Request" />
            <div className="flex gap-[50px]">
              <HemaLabel text="Select Kit Assembly" />
              <HemaValue text={logistic.selectedSiteDetail?.initialRequestAssembly?.name} />
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Container;
