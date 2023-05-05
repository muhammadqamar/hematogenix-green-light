import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert as BootstrapAlert } from 'react-bootstrap';
import HemaHeadingWithSubText from '../../utils/HemaHeadingWithSubText';
import AllProtocols from './protocols/allProtocols';
import {
  getAllProtocolsAction,
  getAssemblyInboundConditionAction,
  getAllCuriorsListAction,
  getCountriesLogisticBuilder,
  getAllRegionsProtocolsAction,
  getAllCountryForRegionAction,
  getAllSitesForCountryAction,
  protocolDetailIdAction,
  regionDetailIdAction,
  getAllCountryForRegionDetailAction,
  getAllSitesForCountryDetailAction,
  getAllLogisticLevelNode,
  getShippingDeportAction,
  getGreenLightTypesAction,
  approveForQCAction,
  rejectForQCAction,
  submutForQCAction,
  getAllActiveUsersAction,
} from '../../Actions/logistic';
import { setAllCountryProtocol, setAllSiteProtocol, setAllRegionProtocols, setAllProtocols, unConfigCountrySite, setSelectedProtocolDetail } from '../../Store/reducers/logistic';
import ContainerLogistic from './logisticComponents/container';
import { Alert, Button, HemaLabel } from '../../utils';
import FormContainer from '../../components/Formik/formContainer';
import { getAllAssembliesAction, getTestingLabsAction, getAssembliesTypeAction } from '../../Actions/assembly';
import { getAllItemAction } from '../../Actions/inventory';
import { SubmitQC, Edit, LabelQuantity, FirstName, Apply, Reject, CheckApprove } from '../../HemeIconLibrary';
import { getAllInventoryLanguages } from '../../Actions/common';
import { setForm, setFormLoaderReducer, setFormCloseReducer, showSuccessReducer, showErrorReducer } from '../../Store/reducers/uiSettings';

const Logistic = () => {
  const { logistic, uisettings } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [CTA, setCTA] = useState();
  const [formName, setformName] = useState();
  const [formIcon, setFormIcon] = useState();
  const [formValidation, setFormValidation] = useState();
  const [okBtnText, setokBtnText] = useState();
  const [okBtnIcon, setokBtnIcon] = useState();
  const [cancelBtnText, setCancelBtnText] = useState();
  const [cancelBtnIcon, setSancelBtnIcon] = useState();
  const [updatedData, setUpdatedData] = useState();
  const [activeState, setactiveState] = useState('study');
  const [allItemsInTemplate, setAllItemsInTemplate] = useState();
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    getAllProtocolsAction();
    getAllAssembliesAction();
    getAssemblyInboundConditionAction();
    getCountriesLogisticBuilder();
    getAllCuriorsListAction();
    getAllItemAction();
    getTestingLabsAction();
    getAssembliesTypeAction();
    getAllInventoryLanguages();
    getShippingDeportAction();
    getAllActiveUsersAction();
    getGreenLightTypesAction();
  }, []);

  useEffect(() => {
    (async () => {
      if (logistic?.selectedProtocol?.id || logistic?.selectedProtocol?.id === 0) {
        setLoader(true);
        getAllRegionsProtocolsAction(logistic?.selectedProtocol?.id);
        await protocolDetailIdAction(logistic?.selectedProtocol?.id);
        getAllLogisticLevelNode(logistic?.selectedProtocol?.id);
        setShow(true);
        setLoader(false);
      }
    })();
  }, [logistic.selectedProtocol]);

  useEffect(() => {
    (async () => {
      if (logistic?.selectedRegion?.id) {
        setLoader(true);
        getAllCountryForRegionAction(logistic?.selectedRegion?.id);
        await regionDetailIdAction(logistic?.selectedRegion?.id);
        setLoader(false);
      }
    })();
  }, [logistic.selectedRegion]);

  useEffect(() => {
    (async () => {
      if (logistic?.selectedCountry?.id) {
        setLoader(true);
        getAllSitesForCountryAction(logistic?.selectedCountry?.id);
        await getAllCountryForRegionDetailAction(logistic?.selectedCountry?.id);
        setLoader(false);
        getAllLogisticLevelNode(logistic?.selectedProtocol?.id);
        dispatch(unConfigCountrySite());
      }
    })();
  }, [logistic.selectedCountry]);

  useEffect(() => {
    (async () => {
      if (logistic?.selectedSite?.id) {
        setLoader(true);
        await getAllSitesForCountryDetailAction(logistic?.selectedSite?.id);
        setLoader(false);
      }
    })();
  }, [logistic.selectedSite]);

  const searchProtocol = (value, type) => {
    if (type === 'study') {
      if (!!value) {
        dispatch(setAllProtocols(logistic.allProtocols?.filter((study) => study.name?.toLowerCase()?.includes(value.toLowerCase()))));
      } else {
        getAllProtocolsAction();
      }
    } else if (type === 'region') {
      if (!!value) {
        dispatch(setAllRegionProtocols(logistic.allRegionsProtocol?.filter((reg) => reg.name?.toLowerCase()?.includes(value.toLowerCase()))));
      } else {
        getAllRegionsProtocolsAction(logistic?.selectedProtocol?.id);
      }
    } else if (type === 'country') {
      if (!!value) {
        dispatch(setAllCountryProtocol(logistic.allCountriesProtocol?.filter((country) => country.name?.toLowerCase()?.includes(value.toLowerCase()))));
      } else {
        getAllCountryForRegionAction(logistic?.selectedRegion?.id);
      }
    } else if (type === 'site') {
      if (!!value) {
        dispatch(setAllSiteProtocol(logistic.allSitesProtocol?.filter((site) => site.name?.toLowerCase()?.includes(value.toLowerCase()))));
      } else {
        getAllSitesForCountryAction(logistic?.selectedCountry?.id);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-[27px]">
        <div className="flex items-start gap-[10px] ">
          <HemaHeadingWithSubText heading="Logistics Orchestrator" sub="Manage the logistics of your protocols here." />
          {logistic.selectedProtocolDetail?.qc?.status && (
            <div
              className={`w-fit rounded-full px-3 py-1  mt-3 flex items-center justify-center gap-1 ${
                logistic.selectedProtocolDetail?.qc?.status?.name === 'Draft'
                  ? 'bg-[#E4DFF7]'
                  : logistic.selectedProtocolDetail?.qc?.status?.name === 'Active'
                  ? 'bg-[#F6FEF9]'
                  : 'bg-[#FDDAE8]'
              } `}
            >
              <div
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  logistic.selectedProtocolDetail?.qc?.status?.name === 'Draft'
                    ? 'bg-[#775FD5]'
                    : logistic.selectedProtocolDetail?.qc?.status?.name === 'Active'
                    ? 'bg-[#38C280]'
                    : 'bg-[#F5488F]'
                } `}
              />
              <HemaLabel
                color={
                  logistic.selectedProtocolDetail?.qc?.status?.name === 'Draft' ? '#775FD5' : logistic.selectedProtocolDetail?.qc?.status?.name === 'Active' ? '#38C280' : '#F5488F'
                }
                className=""
                text={logistic.selectedProtocolDetail?.qc?.status?.name}
              />
            </div>
          )}
        </div>

        {logistic.selectedProtocolDetail && (
          <Button
            text="Submit for QC"
            bg="bg-primary1"
            className=" h-10 text-white pl-[16px] pr-[16px] pt-2 pb-2"
            Icon={<SubmitQC />}
            disabled={logistic.selectedProtocolDetail?.qc?.isReadyForQC && !logistic?.allCountriesProtocol?.find((f) => f.isConfigured === false) ? false : true}
            cta={() => {
              setformName(`Submit for QC`);
              setFormIcon(<Apply />);
              setokBtnText('Submit');
              setUpdatedData([
                {
                  label: 'QC Detail',
                  Icon: '',

                  type: 'heading-bar',
                  fluid: true,
                  className: 'QC-border',
                },
                {
                  label: 'Username',
                  Icon: <FirstName />,
                  type: 'select',
                  initialValue: '',
                  placeholder: 'Select username',
                  required: true,
                  name: 'approverId',
                  options:
                    logistic?.users
                      ?.filter((active) => active.isActive)
                      ?.map((user) => {
                        return {
                          id: user.id,
                          name: user.email,
                        };
                      }) || [],
                  fluid: true,
                },
              ]);
              setCTA(() => async (data) => {
                dispatch(setFormLoaderReducer(true));

                const QC = await submutForQCAction(logistic.selectedProtocol?.id, data);

                if (QC?.status === 200) {
                  dispatch(setFormCloseReducer());
                  dispatch(showSuccessReducer(`${logistic.selectedProtocolDetail?.alias}  Submitted for QC.`));
                  console.log('qc', QC);
                  dispatch(setSelectedProtocolDetail(QC?.data));
                }
                dispatch(setFormLoaderReducer(false));
              });
              dispatch(
                setForm({
                  state: true,
                  type: 'submitForQC',
                }),
              );
            }}
          />
        )}
        {logistic.selectedProtocolDetail?.qc?.askForApprove && (
          <div className="flex gap-[20px]">
            <Button
              text="Reject"
              className=" h-10 text-white pl-[16px] pr-[16px] pt-2 pb-2 bg-[#F54C3B]"
              Icon={<SubmitQC />}
              cta={() => {
                setformName(`Reject`);
                setFormIcon(<Reject />);
                setokBtnText('Ok');
                setUpdatedData([
                  {
                    label: 'Detail',
                    Icon: '',
                    type: 'heading-bar',
                    fluid: true,
                    className: 'QC-border',
                  },
                  {
                    label: 'Comment',
                    Icon: <LabelQuantity />,
                    type: 'textarea',
                    initialValue: '',
                    placeholder: 'Type Comment',
                    required: true,
                    name: 'note',

                    fluid: true,
                  },
                ]);
                setCTA(() => async (data) => {
                  dispatch(setFormLoaderReducer(true));

                  const QC = await rejectForQCAction(logistic.selectedProtocol?.id, data);

                  if (QC?.status === 200) {
                    dispatch(setFormCloseReducer());
                    dispatch(showSuccessReducer(`${logistic.selectedProtocolDetail?.alias}  is rejected for QC.`));
                    await protocolDetailIdAction(logistic?.selectedProtocol?.id);
                  }
                  dispatch(setFormLoaderReducer(false));
                });
                dispatch(
                  setForm({
                    state: true,
                    type: 'submitForQC',
                  }),
                );
              }}
            />
            <Button
              text="Approve"
              bg="bg-primary1"
              className=" h-10 text-white pl-[16px] pr-[16px] pt-2 pb-2"
              Icon={<SubmitQC />}
              cta={() => {
                setformName(`Approve`);
                setFormIcon(<CheckApprove />);
                setokBtnText('Ok');
                setUpdatedData([
                  {
                    label: 'Detail',
                    Icon: '',
                    type: 'heading-bar',
                    fluid: true,
                    className: 'QC-border',
                  },
                  {
                    label: 'Comment',
                    Icon: <LabelQuantity />,
                    type: 'textarea',
                    initialValue: '',
                    placeholder: 'Type Comment',
                    required: true,
                    name: 'note',

                    fluid: true,
                  },
                ]);
                setCTA(() => async (data) => {
                  dispatch(setFormLoaderReducer(true));

                  const QC = await approveForQCAction(logistic.selectedProtocol?.id, data);

                  if (QC?.status === 200) {
                    dispatch(setFormCloseReducer());
                    dispatch(showSuccessReducer(`${logistic.selectedProtocolDetail?.alias} is approved for QC.`));
                    await protocolDetailIdAction(logistic?.selectedProtocol?.id);
                  }
                  dispatch(setFormLoaderReducer(false));
                });
                dispatch(
                  setForm({
                    state: true,
                    type: 'submitForQC',
                  }),
                );
              }}
            />
          </div>
        )}
      </div>
      <Alert type="error" />
      {logistic?.selectedProtocolDetail?.qc?.isRejected && show && (
        <BootstrapAlert variant="danger" onClose={() => setShow(false)} dismissible>
          <BootstrapAlert.Heading>Rejected by QC!</BootstrapAlert.Heading>
          <p className="mb-0">
            <b>Comment:</b> {logistic?.selectedProtocolDetail?.qc?.note || 'No comment Added yet'}
          </p>
        </BootstrapAlert>
      )}
      <div className=" flex bg-white rounded-[5px]  pb-[15px]   mb-[13px] inventory-tabs ">
        <AllProtocols
          data={logistic}
          active={logistic.selectedProtocol}
          setformName={setformName}
          setFormIcon={setFormIcon}
          setactiveState={setactiveState}
          searchProtocol={searchProtocol}
        />
        <ContainerLogistic
          active={logistic.selectedProtocol}
          activeRegion={logistic.activeRegion}
          activeCountry={logistic.activeCountry}
          setCTA={setCTA}
          setformName={setformName}
          setFormIcon={setFormIcon}
          setFormValidation={setFormValidation}
          setUpdatedData={setUpdatedData}
          activeDetail={logistic.selectedProtocolDetail}
          activeState={activeState}
          setAllItemsInTemplate={setAllItemsInTemplate}
          allItemsInTemplate={allItemsInTemplate}
          loader={loader}
        />
      </div>
      {uisettings?.openform && (
        <FormContainer
          allItemsInTemplate={allItemsInTemplate}
          cta={CTA}
          formType={updatedData}
          formName={formName}
          Icon={formIcon}
          formValidation={formValidation}
          setUpdatedData={setUpdatedData}
          setCTA={setCTA}
          cancelBtnIcon={cancelBtnIcon}
          cancelBtnText={cancelBtnText}
          okBtnIcon={okBtnIcon}
          okBtnText={okBtnText}
          setokBtnIcon={setokBtnIcon}
          setokBtnText={setokBtnText}
        />
      )}
    </>
  );
};

export default Logistic;
