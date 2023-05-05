import React from 'react';
import { Alert } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';

import { AddBlack, AddRegion, BlackSearch, Cancel, GrayWarning, CreateSite } from '../../../HemeIconLibrary';
import { Button, HemaLabel } from '../../../utils';
import {
  setSelectedProtocol,
  setAllSiteProtocol,
  setAllCountryProtocol,
  setAllRegionProtocols,
  setSelectedCountry,
  setSelectedSite,
  setSelectedRegion,
  resetSelectedRule,
} from '../../../Store/reducers/logistic';
import { setForm, editFormReducer, showErrorReducer } from '../../../Store/reducers/uiSettings';

import './style.scss';

const Allprotocols = ({ data, active, setformName, setFormIcon, setactiveState, searchProtocol }) => {
  const dispatch = useDispatch();
  const { logistic, common, uisettings } = useSelector((state) => state);
  return (
    <>
      <div className="flex ">
        <div className="border-r-2 border-solid border-[#ccc] w-[280px] ">
          <div className="left-sidebar-protocol ">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Studies</Accordion.Header>
                <Accordion.Body>
                  {data?.allProtocols ? (
                    <>
                      <SearchProtocolCom type="study" searchProtocol={searchProtocol} />

                      {data?.allProtocols?.length ? (
                        <div>
                          <div className="max-h-[300px] overflow-y-auto pb-[16px] border-b border-solid border-[#DEE2E6]">
                            {data?.allProtocols?.map((site) => (
                              <div
                                onClick={() => {
                                  if (data.selectedProtocol?.id !== site.id) {
                                    dispatch(setAllRegionProtocols(null));
                                    dispatch(setAllCountryProtocol(null));
                                    dispatch(setAllSiteProtocol(null));
                                    dispatch(setSelectedCountry(null));
                                    dispatch(setSelectedRegion(null));
                                    dispatch(setSelectedSite(null));
                                    dispatch(resetSelectedRule([]));
                                  }
                                  setactiveState('study');
                                  dispatch(setSelectedProtocol(site));
                                }}
                                className={`${
                                  site.studyId === active?.studyId && 'text-[#605DAF] bg-[#E8E7F3]'
                                } w-full text-sm font-medium  cursor-pointer flex items-center justify-between h-[40px] py-[8px] px-[16px]`}
                              >
                                <HemaLabel textSize="text-[14px]" color="#353B4A" text={site.name} />
                                {site.studyId === active?.studyId && <div>{/* <Cancel />*/}</div>}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Alert variant="warning">No Studies Available</Alert>
                      )}
                    </>
                  ) : (
                    <div className="p-[16px]">
                      <Skeleton count="4" />
                      <br />
                      <Skeleton count="4" />
                      <br />
                      <Skeleton count="4" />
                      <br />
                    </div>
                  )}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header
                // onClick={() => {
                //   setactiveState('region');
                // }}
                >
                  Regions
                </Accordion.Header>
                <Accordion.Body>
                  {data?.selectedProtocol ? (
                    <>
                      {active?.id !== 0 && (
                        <>
                          <SearchProtocolCom type="region" searchProtocol={searchProtocol} />
                          <Button
                            text={'New Region'}
                            Icon={<AddBlack />}
                            className="p-[16px] text-[14px] leading-[24px] font-medium pl-[16px]"
                            cta={() => {
                              dispatch(editFormReducer());
                              setformName(`Add New Region`);
                              setFormIcon(<AddRegion />);
                              dispatch(
                                setForm({
                                  state: true,
                                  type: 'add-new-region',
                                }),
                              );
                            }}
                          />
                        </>
                      )}
                      {data?.allRegionsProtocol ? (
                        data?.allRegionsProtocol?.length > 0 ? (
                          <div>
                            <div className="max-h-[300px] overflow-y-auto pb-[16px]  border-b border-solid border-[#DEE2E6]">
                              {data?.allRegionsProtocol?.map((region) => (
                                <div
                                  onClick={() => {
                                    if (data.selectedRegion?.id !== region.id) {
                                      dispatch(setAllCountryProtocol(null));
                                      dispatch(setAllSiteProtocol(null));
                                      dispatch(setSelectedCountry(null));
                                      dispatch(setSelectedSite(null));
                                      dispatch(setSelectedRegion(region));
                                      dispatch(resetSelectedRule([]));
                                    }
                                    setactiveState('region');
                                  }}
                                  className={`${
                                    region?.id === data?.selectedRegion?.id && 'text-[#605DAF] bg-[#E8E7F3]'
                                  } w-full text-sm font-medium  cursor-pointer flex items-center justify-between h-[40px] py-[8px] px-[16px]`}
                                >
                                  <HemaLabel textSize="text-[14px]" color="#353B4A" text={region?.name} />
                                  {region?.id === data?.selectedRegion?.id && <div>{/* <Cancel />*/}</div>}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Alert variant="warning">No Region Found</Alert>
                        )
                      ) : (
                        <div className="p-[16px]">
                          <Skeleton count="4" />
                          <br />
                          <Skeleton count="4" />
                          <br />
                          <Skeleton count="4" />
                          <br />
                        </div>
                      )}
                    </>
                  ) : (
                    <Alert variant="warning">Select Study First</Alert>
                  )}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Countries</Accordion.Header>
                <Accordion.Body>
                  {data.selectedRegion ? (
                    <>
                      <SearchProtocolCom type="country" searchProtocol={searchProtocol} />
                      {/* <Button
                        text={'Add New Country'}
                        Icon={<AddBlack />}
                        className="p-[16px] text-[14px] leading-[24px] font-medium pl-[16px]"
                        cta={() => {
                          dispatch(editFormReducer());
                          setformName(`Add New Country`);
                          setFormIcon(<Country width="24px" height="24px" />);
                          dispatch(
                            setForm({
                              state: true,
                              type: "add-new-country",
                            }),
                          );
                        }}
                      /> */}
                      {data?.allCountriesProtocol ? (
                        data?.allCountriesProtocol?.length ? (
                          <div>
                            <div className="max-h-[300px] overflow-y-auto  pb-[16px]  border-b border-solid border-[#DEE2E6]">
                              {data?.allCountriesProtocol?.map((country) => (
                                <div
                                  onClick={() => {
                                    if (data.selectedCountry?.id !== country.id) {
                                      dispatch(setAllSiteProtocol(null));
                                      dispatch(setSelectedSite(null));
                                      dispatch(setSelectedCountry(country));
                                      dispatch(resetSelectedRule([]));
                                    }
                                    setactiveState('country');
                                  }}
                                  className={`${
                                    country.id === data?.selectedCountry?.id && 'text-[#605DAF] bg-[#E8E7F3]'
                                  } w-full text-sm font-medium  cursor-pointer flex items-center justify-between h-[40px] py-[8px] px-[16px]`}
                                >
                                  <HemaLabel textSize="text-[14px]" color="#353B4A" text={country.name} />
                                  {!country.isConfigured && <Button border="primary1" className="p-[8px] w-10 h-10 border-none border-0" Icon={<GrayWarning />} />}
                                  {country.id === data?.selectedCountry?.id && <div>{/* <Cancel />*/}</div>}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Alert variant="warning">No Countries Available</Alert>
                        )
                      ) : (
                        <div className="p-[16px]">
                          <Skeleton count="4" />
                          <br />
                          <Skeleton count="4" />
                          <br />
                          <Skeleton count="4" />
                          <br />
                        </div>
                      )}
                    </>
                  ) : (
                    <Alert variant="warning">Select Region First</Alert>
                  )}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Sites</Accordion.Header>
                <Accordion.Body>
                  {data?.selectedCountry ? (
                    <>
                      <SearchProtocolCom type="site" searchProtocol={searchProtocol} />
                      <Button
                        text={'New Site'}
                        Icon={<AddBlack />}
                        className="p-[16px] text-[14px] leading-[24px] font-medium pl-[16px]"
                        cta={() => {
                          if (data?.unConfigSite?.length > 0) {
                            dispatch(editFormReducer());
                            setformName(`Add New Site`);
                            setFormIcon(<CreateSite />);
                            dispatch(
                              setForm({
                                state: true,
                                type: 'add-new-site',
                              }),
                            );
                          } else {
                            window.scrollTo(0, 0);
                            dispatch(showErrorReducer(`There is no site to add, for this country. Please add first in site Managment..!!`));
                          }
                        }}
                      />
                      {data?.allSitesProtocol ? (
                        data?.allSitesProtocol?.length ? (
                          <div>
                            <div className="max-h-[300px] overflow-y-auto pb-[16px] border-b border-solid border-[#DEE2E6] ">
                              {data?.allSitesProtocol?.map((site) => (
                                <div
                                  onClick={() => {
                                    setactiveState('site');
                                    dispatch(setSelectedSite(site));
                                  }}
                                  className={`${
                                    site.id === data?.selectedSite?.id && 'text-[#605DAF] bg-[#E8E7F3]'
                                  } w-full text-sm font-medium  cursor-pointer flex items-center justify-between h-[40px] py-[8px] px-[16px]`}
                                >
                                  <HemaLabel textSize="text-[14px]" color="#353B4A" text={site.name || site.siteName} />
                                  {site.id === data?.selectedSite?.id && <div>{/* <Cancel />*/}</div>}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Alert variant="warning">No Sites Available</Alert>
                        )
                      ) : (
                        <div className="p-[16px]">
                          <Skeleton count="4" />
                          <br />
                          <Skeleton count="4" />
                          <br />
                          <Skeleton count="4" />
                          <br />
                        </div>
                      )}
                    </>
                  ) : (
                    <Alert variant="warning">Select Country First</Alert>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

const SearchProtocolCom = ({ searchProtocol, type }) => {
  return (
    <div className="relative mx-[16px] my-2">
      <span className="absolute top-[10px] left-[10px]">
        <BlackSearch />
      </span>
      <input
        type="text"
        name="Search"
        placeholder="Search..."
        className="w-full rounded border-2 border-[#DEE2E6] pr-[5px] pl-[30px] py-[3.5px]"
        onChange={(e) => {
          searchProtocol(e.target.value, type);
        }}
      />
    </div>
  );
};

export default Allprotocols;
